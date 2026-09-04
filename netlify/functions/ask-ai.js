const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
];

const FUNCTION_TIMEOUT_MS = 8500;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured' })
    };
  }

  try {
    const { questionText, options } = JSON.parse(event.body || '{}');

    const promptParts = [
      'Активирай се като академичен асистент за университетски изпити. Давай точни, структурирани и учебни обяснения без приветствия и излишна разговорна реч.',
      '',
      'Формат на отговора:',
      '### Дефиниция / Същност',
      'Кратко, прецизно научно определение.',
      '',
      '### Основни моменти / Приложение',
      '- <момент>',
      '- <момент>',
      '- <кога и защо се прилага>',
      '',
      '### Ключови думи за изпита',
      '- <дума>',
      '- <дума>',
      '- <дума>',
      '',
      `Въпрос: ${questionText}`
    ];

    if (Array.isArray(options) && options.length > 0) {
      promptParts.push('', 'Варианти:');
      options.forEach((opt, i) => {
        promptParts.push(`${String.fromCharCode(65 + i)}. ${opt}`);
      });
    }

    const prompt = promptParts.join('\n');

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('FUNCTION_TIMEOUT')), FUNCTION_TIMEOUT_MS);
    });

    const generationPromise = (async () => {
      for (const modelName of MODELS) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              maxOutputTokens: 2048,
              thinkingConfig: {
                thinkingLevel: 'MINIMAL'
              }
            }
          });

          const explanation = response.text || 'Неуспешно генериране на обяснение.';

          return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ explanation })
          };
        } catch (err) {
          const isOverloaded = err.status === 503 || err.message?.includes('503') || err.message?.includes('UNAVAILABLE');

          console.error(`Gemini SDK error [${modelName}]:`, err.message || err);

          if (isOverloaded) {
            console.warn(`Model ${modelName} overloaded. Switching to fallback model...`);
            continue;
          }

          return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to get AI explanation' })
          };
        }
      }

      return {
        statusCode: 503,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'AI services experiencing high demand. Please try again shortly.' })
      };
    })();

    const result = await Promise.race([generationPromise, timeoutPromise]);

    if (result && result.statusCode === 504) {
      return result;
    }

    return result;
  } catch (error) {
    console.error('ask-ai error:', error);
    if (error.message === 'FUNCTION_TIMEOUT') {
      return {
        statusCode: 504,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Услугата забави отговора си. Моля, опитайте отново.' })
      };
    }
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
