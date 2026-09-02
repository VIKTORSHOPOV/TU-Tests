const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!GEMINI_API_KEY) {
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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 512
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to get AI explanation' })
      };
    }

    const data = await response.json();
    const explanation =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'Неуспешно генериране на обяснение.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ explanation })
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
