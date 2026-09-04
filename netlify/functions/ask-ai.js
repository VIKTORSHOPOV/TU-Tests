const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash'
];

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

    for (const modelName of MODELS) {
      const maxRetries = 2;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
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
          const isRateLimited = err.status === 429 || err.message?.includes('429');

          console.error(`Gemini SDK error [${modelName}] (attempt ${attempt + 1}/${maxRetries + 1}):`, err.message || err);

          // Exponential backoff for temporary spikes
          if ((isOverloaded || isRateLimited) && attempt < maxRetries) {
            const jitter = Math.random() * 1000;
            const delayMs = Math.pow(2, attempt) * 2000 + jitter;
            await new Promise(resolve => setTimeout(resolve, delayMs));
            continue;
          }

          // Fallback to secondary model if primary remains overloaded
          if (isOverloaded) {
            console.warn(`Model ${modelName} overloaded. Switching to fallback model...`);
            break;
          }

          return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to get AI explanation' })
          };
        }
      }
    }

    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'AI services experiencing high demand. Please try again shortly.' })
    };
  } catch (error) {
    console.error('ask-ai error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};