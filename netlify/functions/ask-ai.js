const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash'
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

  const callModelWithTimeout = (modelName) => {
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('MODEL_TIMEOUT')), 5000);

      try {
        const config = { maxOutputTokens: 2048 };
        if (modelName.includes('3.5') || modelName.includes('3.6')) {
          config.thinkingConfig = { thinkingLevel: 'MINIMAL' };
        }

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
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

  return {
    statusCode: 504,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Услугата забави отговора си. Моля, опитайте отново.' })
  };
};
