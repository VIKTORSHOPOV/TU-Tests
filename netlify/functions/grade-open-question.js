const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash'
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

  const { questionText, userAnswer, correctAnswer, scoring } = body;

  if (!questionText || !correctAnswer) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Missing required fields: questionText and correctAnswer' })
    };
  }

  const isCode = scoring?.type === 'code';

  const gradingPrompt = isCode
    ? `Ти си академичен асистент, специализиран в оценяване на студентски код. Оцени дали student's_code е правилно спрямо expected_code.

Student's code:
${userAnswer || '(празен отговор)'}

Expected code:
${correctAnswer}

Формат на отговор (ЗАДЪЛЖИТЕЛНО):
### Оценка
САМО една от следните думи: ВЕРНО или ГРЕШНО

### Коментар
Кратко обяснение (1-2 изречения) защо е вярно или грешно.

### Точки
CAUTION: Трябва ДА изчислиш точките! Върни число между 0 и maxPoints.
При грешен отговор - 0 точки.
При верен отговор - пълните точки.
maxPoints: ${scoring?.points || 1}`
    : `Ти си академичен асистент, специализиран в оценяване на студентски отговори на въпроси. Оцени student's_answer спрямо expected_answer.

Student's answer:
${userAnswer || '(празен отговор)'}

Expected answer:
${correctAnswer}

Формат на отговор (ЗАДЪЛЖИТЕЛНО):
### Оценка
САМО една от следните думи: ВЕРНО или ГРЕШНО

### Коментар
Кратко обяснение (1-2 изречения) защо е вярно или грешно.

### Точки
CAUTION: Трябва ДА изчислиш точките! Върни число между 0 и maxPoints.
При грешен отговор - 0 точки.
При верен отговор - пълните точки.
maxPoints: ${scoring?.points || 1}`;

  const callModelWithTimeout = (modelName) => {
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('MODEL_TIMEOUT')), 5500);

      try {
        const config = { maxOutputTokens: 2048 };
        if (modelName.includes('3.5') || modelName.includes('3.6')) {
          config.thinkingConfig = { thinkingLevel: 'MINIMAL' };
        }

        const response = await ai.models.generateContent({
          model: modelName,
          contents: gradingPrompt,
          config
        });

        clearTimeout(timer);
        resolve(response.text);
      } catch (err) {
        clearTimeout(timer);
        reject(err);
      }
    });
  };

  for (const modelName of MODELS) {
    try {
      const result = await callModelWithTimeout(modelName);
      if (result) {
        const parsed = parseGradingResult(result, scoring?.points || 1);
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
    if (trimmed.startsWith('### Оценка') || trimmed.startsWith('### Оценка')) {
      currentSection = ' оценка';
    } else if (trimmed.startsWith('### Коментар') || trimmed.startsWith('### Коментар')) {
      currentSection = ' коментар';
    } else if (trimmed.startsWith('### Точки') || trimmed.startsWith('### Точки')) {
      currentSection = ' точки';
    } else if (currentSection === 'оценка' && (trimmed === 'ВЕРНО' || trimmed === 'ВЕРНО')) {
      result.isCorrect = true;
      result.points = maxPoints;
    } else if (currentSection === 'оценка' && (trimmed === 'ГРЕШНО' || trimmed === 'ГРЕШНО')) {
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