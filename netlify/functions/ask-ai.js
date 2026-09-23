const { GoogleGenAI } = require('@google/genai');
const { Groq } = require('groq-sdk');
const { getExamById } = require('./data/exams');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured' })
    };
  }

  const { questionText, options, examId, questionId } = JSON.parse(event.body || '{}');

  let correctAnswerText = null;
  if (examId && questionId) {
    const exam = getExamById(examId);
    const question = exam?.questions?.find(q => q.id === questionId);
    if (question && question.correctAnswer !== undefined) {
      const correctAnswer = question.correctAnswer;
      if (question.type === 'single') {
        const choice = question.choices?.find(c => c.id === correctAnswer);
        correctAnswerText = choice ? choice.text : correctAnswer;
      } else if (question.type === 'multiple') {
        if (Array.isArray(correctAnswer)) {
          correctAnswerText = correctAnswer.map(id => {
            const choice = question.choices?.find(c => c.id === id);
            return choice ? choice.text : id;
          }).join(', ');
        } else {
          const choice = question.choices?.find(c => c.id === correctAnswer);
          correctAnswerText = choice ? choice.text : correctAnswer;
        }
      } else {
        correctAnswerText = Array.isArray(correctAnswer) ? correctAnswer.join(' или ') : String(correctAnswer);
      }
    }
  }

  const promptParts = [
    'Активирай се като академичен асистент за университетски изпити. Твоят отговор трябва да бъде изключително кратък, точен и с високо усвояване, оптимизиран за бързо повторение и запомняне за изпит.',
    '',
    'Правила:',
    '- Бъди стриктно кратък и с точкови. Избягвай въведения, излишни думи или ненужни мета-обяснения.',
    '- Отговаряй на български (или на езика на въпроса).',
    '- Максимум около 120 думи общо (без код). Да не се повтаря между разделите. Не обяснявай неща, които кодът самият прави очевидни.',
    '- Базирай обяснението и корекцията върху дадения правилен отговор. Обясни защо той е верен и защо останалите са грешни, без да споменаваш потребителския отговор.',
    '- Следвай тази точно шаблонна структура:',
    '',
    '### Обяснение',
    '1–3 изречения за ключовата концепция или подхода, без повторение на въпроса.',
    '',
    '### Решение',
    'Коден блок само ако въпросът го изисква. Ако въпросът е изцяло теориен, пропусни целия раздел.',
    '',
    `Question: ${questionText}`,
    'Options:'
  ];

  if (Array.isArray(options) && options.length > 0) {
    options.forEach((opt, i) => {
      promptParts.push(`${String.fromCharCode(65 + i)}. ${opt}`);
    });
  }

  if (correctAnswerText) {
    promptParts.push('');
    promptParts.push(`Правилен отговор: ${correctAnswerText}`);
  }

  const prompt = promptParts.join('\n');

  const callModelWithTimeout = async (modelName) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('MODEL_TIMEOUT')), 5500)
    );

    const config = { maxOutputTokens: 4096 };
    if (modelName.includes('3.5') || modelName.includes('3.1')) {
      config.thinkingConfig = { thinkingLevel: 'low' };
    } else if (modelName.includes('2.5') && !modelName.includes('lite')) {
      config.thinkingConfig = { thinkingBudget: 0 };
    }

    const callPromise = ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config
    }).then(response => response.text);

    return Promise.race([callPromise, timeoutPromise]);
  };

  for (const modelName of MODELS) {
    try {
      const explanation = await callModelWithTimeout(modelName);
      if (explanation) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ explanation, modelUsed: modelName })
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
    const timeoutId = setTimeout(() => controller.abort(), 5500);

    const groqResponse = await groq.chat.completions.create(
      {
        model: GROQ_FALLBACK_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096
      },
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    const explanation = groqResponse.choices?.[0]?.message?.content;
    if (explanation) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ explanation, modelUsed: 'Groq GPT-OSS 120B' })
      };
    }
  } catch (err) {
    console.warn('Groq fallback failed/timed out:', err.message || err);
  }

  if (correctAnswerText) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        explanation: `Всички модели временно не са на разположение.\n\nПравилен отговор: ${correctAnswerText}`,
        modelUsed: 'fallback'
      })
    };
  }

  return {
    statusCode: 504,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Услугата забави отговора си. Моля, опитайте отново.' })
  };
};
