// Netlify Function to verify exam password server-side
// This keeps password hashes secure

const { verifyPassword } = require('./data/exams');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { examId, passwordHash } = body;

    if (!examId || !passwordHash) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: examId and passwordHash' })
      };
    }

    // Verify password using shared function
    const result = verifyPassword(examId, passwordHash);

    if (!result.found) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Exam not found' })
      };
    }

    // If no password required
    if (result.noPassword) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          verified: true,
          message: 'No password required for this exam'
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        verified: result.verified,
        message: result.verified ? 'Password verified successfully' : 'Invalid password'
      })
    };

  } catch (error) {
    console.error('Error in verify-password function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
