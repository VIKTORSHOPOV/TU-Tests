// Netlify Function to get exam data without correct answers
// This prevents exposing answers in the browser

const { getExamList, getSanitizedExam } = require('./data/exams');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

  try {
    // Get exam ID from query parameters or body
    let examId;
    
    if (event.httpMethod === 'GET') {
      const params = new URLSearchParams(event.queryStringParameters);
      examId = params.get('id');
    } else if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      examId = body.examId;
    }

    // If no exam ID provided, return list of all exams (without questions/answers)
    if (!examId) {
      const examList = getExamList();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ exams: examList })
      };
    }

    // Find the requested exam
    const exam = getSanitizedExam(examId);

    if (!exam) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Exam not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ exam })
    };

  } catch (error) {
    console.error('Error in get-exam function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
