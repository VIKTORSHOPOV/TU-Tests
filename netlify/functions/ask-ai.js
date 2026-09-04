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

    const maxRetries = 3;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              maxOutputTokens: 2048, // Increased to allow space for thinking + answer output
              thinkingConfig: {
                thinkingLevel: 'MINIMAL' // Fixed uppercase string enum value
              }
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Extract answer text while skipping internal thought parts
        const parts = data.candidates?.[0]?.content?.parts || [];
        const answerPart = parts.find(p => p.text && !p.thought) || parts[parts.length - 1];
        const explanation = answerPart?.text || 'Неуспешно генериране на обяснение.';

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ explanation })
        };
      }

      const status = response.status;
      const errorText = await response.text();
      console.error(`Gemini API error (attempt ${attempt + 1}/${maxRetries + 1}):`, status, errorText);

      if ((status === 503 || status === 429) && attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }

      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to get AI explanation' })
      };
    }
  } catch (error) {
    console.error('ask-ai error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};