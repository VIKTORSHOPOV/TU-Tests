const { GoogleGenAI } = require('@google/genai');
const { Groq } = require('groq-sdk');
const { getExamById } = require('./data/exams');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { questionText, userAnswer, correctAnswer, scoring, examId, questionIndex } = body;

  // Try to look up the exam and question server-side so the client
  // never needs to send (or even know) the correctAnswer.
  let resolvedCorrectAnswer = correctAnswer;
  let resolvedScoring = scoring;

  if (examId && questionIndex !== undefined && questionIndex !== null) {
    const exam = getExamById(examId);
    const question = exam?.questions?.[questionIndex];
    if (question) {
      resolvedCorrectAnswer = question.correctAnswer;
      resolvedScoring = {
        ...(resolvedScoring || {}),
        ...question.scoring,
        points: question.points
      };
    }
  }

  if (!questionText || !resolvedCorrectAnswer) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Missing required fields: questionText and correctAnswer' })
    };
  }

  const isCode = resolvedScoring?.type === 'code';

  const gradingPrompt = isCode
    ? `Ти си академичен асистент, специализиран в оценяване на студентски код. Оцени дали student's_code е правилно спрямо expected_code.

Student's code:
${userAnswer || '(празен отговор)'}

Expected code:
${resolvedCorrectAnswer}

Формат на отговор (ЗАДЪЛЖИТЕЛНО):
### Оценка
САМО една от следните думи: ВЕРНО или ГРЕШНО

### Коментар
Кратко обяснение (1-2 изречения) защо е вярно или грешно.

### Точки
CAUTION: Трябва ДА изчислиш точките! Върни число между 0 и maxPoints.
При грешен отговор - 0 точки.
При верен отговор - пълните точки.
maxPoints: ${resolvedScoring?.points || 1}`
    : `Ти си академичен асистент, специализиран в оценяване на студентски отговори на въпроси. Оцени student's_answer спрямо expected_answer.

Student's answer:
${userAnswer || '(празен отговор)'}

Expected answer:
${resolvedCorrectAnswer}

Формат на отговор (ЗАДЪЛЖИТЕЛНО):
### Оценка
САМО една от следните думи: ВЕРНО или ГРЕШНО

### Коментар
Кратко обяснение (1-2 изречения) защо е вярно или грешно.

### Точки
CAUTION: Трябва ДА изчислиш точките! Върни число между 0 и maxPoints.
При грешен отговор - 0 точки.
При верен отговор - пълните точки.
maxPoints: ${resolvedScoring?.points || 1}`;

  const callModelWithTimeout = async (modelName) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('MODEL_TIMEOUT')), 2000)
    );

    const config = { maxOutputTokens: 2048 };
    if (modelName.includes('3.5') || modelName.includes('3.1')) {
      config.thinkingConfig = { thinkingLevel: 'low' };
    } else if (modelName.includes('2.5') && !modelName.includes('lite')) {
      config.thinkingConfig = { thinkingBudget: 0 };
    }

    const callPromise = ai.models.generateContent({
      model: modelName,
      contents: gradingPrompt,
      config
    }).then(response => response.text);

    return Promise.race([callPromise, timeoutPromise]);
  };

  for (const modelName of MODELS) {
    try {
      const result = await callModelWithTimeout(modelName);
      if (result) {
        const parsed = parseGradingResult(result, resolvedScoring?.points || 1);
        return {
          statusCode: 200,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            ...parsed,
            modelUsed: modelName
          })
        };
      }
    } catch (err) {
      console.warn(`Model ${modelName} failed/timed out:`, err.message || err);
      continue;
    }
  }

  // Peak-hours fallback: try Groq when all Gemini models are overwhelmed.
  // NOTE: Groq periodically moves models to Enterprise-only ("Contact Sales").
  // If this starts failing with a 404 "model_not_found" error, check
  // https://console.groq.com/docs/models for the current free-tier/pay-as-you-go lineup
  // and update GROQ_FALLBACK_MODEL below accordingly.
  const GROQ_FALLBACK_MODEL = 'openai/gpt-oss-120b';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const groqResponse = await groq.chat.completions.create(
      {
        model: GROQ_FALLBACK_MODEL,
        messages: [{ role: 'user', content: gradingPrompt }],
        max_tokens: 2048
      },
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    const rawText = groqResponse.choices?.[0]?.message?.content;
    if (rawText) {
      const parsed = parseGradingResult(rawText, resolvedScoring?.points || 1);
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          ...parsed,
          modelUsed: 'Groq GPT-OSS 120B'
        })
      };
    }
  } catch (err) {
    console.warn('Groq fallback failed/timed out:', err.message || err);
  }

  return {
    statusCode: 504,
    headers: CORS_HEADERS,
    body: JSON.stringify({ error: 'Услугата забави отговора си. Моля, опитайте отново.' })
  };
};

function parseGradingResult(text, maxPoints) {
  const result = {
    isCorrect: false,
    points: 0,
    comment: '',
    rawText: text
  };

  const lines = text.split('\n');
  let currentSection = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('### Оценка')) {
      currentSection = 'оценка';
    } else if (trimmed.startsWith('### Коментар')) {
      currentSection = 'коментар';
    } else if (trimmed.startsWith('### Точки')) {
      currentSection = 'точки';
    } else if (currentSection === 'оценка' && trimmed === 'ВЕРНО') {
      result.isCorrect = true;
      result.points = maxPoints;
    } else if (currentSection === 'оценка' && trimmed === 'ГРЕШНО') {
      result.isCorrect = false;
      result.points = 0;
    } else if (currentSection === 'коментар' && trimmed) {
      result.comment = trimmed;
    } else if (currentSection === 'точки') {
      const match = trimmed.match(/(\d+)/);
      if (match) {
        const pts = parseInt(match[1], 10);
        if (pts >= 0 && pts <= maxPoints) {
          result.points = pts;
          result.isCorrect = pts === maxPoints;
        }
      }
    }
  }

  return result;
}
