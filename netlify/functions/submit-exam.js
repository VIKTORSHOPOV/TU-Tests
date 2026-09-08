// Netlify Function to submit and validate exam answers server-side
// This keeps correct answers hidden from the client

const { getExamById } = require('./data/exams');

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
    const { examId, answers, timeRemaining } = body;

    if (!examId || !answers || typeof answers !== 'object') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: examId and answers' })
      };
    }

    // Find the exam
    const exam = getExamById(examId);

    if (!exam) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Exam not found' })
      };
    }

    // Calculate score server-side
    const result = calculateScore(exam, answers);

    // Return results
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        examId: exam.id,
        title: exam.title,
        rawScore: result.rawScore,
        maxScore: result.maxScore,
        percentage: result.percentage,
        passed: result.percentage >= (exam.settings.passingScorePercent || 0),
        passingScorePercent: exam.settings.passingScorePercent || 0,
        questionResults: result.questionResults,
        timeRemaining: timeRemaining || 0
      })
    };

  } catch (error) {
    console.error('Error in submit-exam function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Calculate the exam score server-side
function calculateScore(exam, userAnswers) {
  let rawScore = 0;
  let maxScore = 0;
  const questionResults = [];

  exam.questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const points = question.points;
    maxScore += points;

    let isCorrect = false;
    let earnedPoints = 0;

    if (userAnswer === null || userAnswer === undefined) {
      // No answer provided
      isCorrect = false;
    } else if (question.type === 'single') {
      // Single choice question
      isCorrect = userAnswer === question.correctAnswer;
      earnedPoints = isCorrect ? points : 0;
    } else if (question.type === 'multiple') {
      // Multiple choice question
      const correctAnswers = question.correctAnswer;

      if (!Array.isArray(userAnswer) || userAnswer.length === 0) {
        // No answer provided or invalid format
        isCorrect = false;
        earnedPoints = 0;
      } else if (question.scoring && question.scoring.strategy === 'proportional') {
        // Proportional scoring
        const correctSelections = userAnswer.filter(answer => correctAnswers.includes(answer));
        const incorrectSelections = userAnswer.filter(answer => !correctAnswers.includes(answer));

        // Calculate proportional score
        const correctRatio = correctSelections.length / correctAnswers.length;
        const penaltyRatio = incorrectSelections.length / (question.choices.length - correctAnswers.length);

        earnedPoints = Math.max(0, points * (correctRatio - penaltyRatio));
        isCorrect = earnedPoints > 0;
      } else {
        // All-or-nothing scoring (default)
        const allCorrectSelected = correctAnswers.every(answer => userAnswer.includes(answer));
        const noIncorrectSelected = userAnswer.every(answer => correctAnswers.includes(answer));

        isCorrect = allCorrectSelected && noIncorrectSelected;
        earnedPoints = isCorrect ? points : 0;
      }
    } else if (question.type === 'open') {
      // Open-ended question
      const scoring = question.scoring || { type: 'fuzzy', tolerance: 0.2 };

      if (userAnswer === null || userAnswer === undefined) {
        // No answer provided
        isCorrect = false;
        earnedPoints = 0;
      } else if (scoring.type === 'code') {
        // Code question - normalize whitespace and compare
        const normalizedUser = normalizeCode(userAnswer);
        const normalizedCorrect = normalizeCode(question.correctAnswer);

        isCorrect = normalizedUser === normalizedCorrect;
        earnedPoints = isCorrect ? points : 0;
      } else if (scoring.type === 'exact') {
        // Exact match
        const correctAnswers = scoring.acceptableValues || [question.correctAnswer];
        const caseSensitive = scoring.caseSensitive || false;

        let userAnswerNormalized = userAnswer;
        let correctAnswersNormalized = correctAnswers;

        if (!caseSensitive) {
          userAnswerNormalized = String(userAnswer).toLowerCase();
          correctAnswersNormalized = correctAnswers.map(a => String(a).toLowerCase());
        }

        isCorrect = correctAnswersNormalized.includes(userAnswerNormalized);
        earnedPoints = isCorrect ? points : 0;
      } else if (scoring.type === 'regex') {
        // Regex match
        const regexPatterns = scoring.acceptableRegex || [];

        isCorrect = regexPatterns.some(pattern => {
          const regex = new RegExp(pattern, scoring.caseSensitive ? '' : 'i');
          return regex.test(String(userAnswer));
        });

        earnedPoints = isCorrect ? points : 0;
      } else if (scoring.type === 'text' || scoring.type === 'fuzzy') {
        // Text/fuzzy match - use similarity
        const correctAnswers = scoring.acceptableValues || [question.correctAnswer];
        const tolerance = scoring.tolerance || 0.2;

        isCorrect = correctAnswers.some(answer => {
          const similarity = calculateSimilarity(String(userAnswer), String(answer));
          return similarity >= tolerance;
        });

        earnedPoints = isCorrect ? points : 0;
      }
    }

    rawScore += earnedPoints;

    // Normalize correctAnswer to ensure it's properly formatted for the client
    let normalizedCorrectAnswer = question.correctAnswer;
    if (question.type === 'multiple' && !Array.isArray(normalizedCorrectAnswer)) {
      // If multiple choice but not array, convert to array
      normalizedCorrectAnswer = [normalizedCorrectAnswer];
    }

    // Normalize userAnswer to ensure it's an array for multiple choice questions
    let normalizedUserAnswer = userAnswer;
    if (question.type === 'multiple') {
      if (userAnswer === null || userAnswer === undefined) {
        normalizedUserAnswer = [];
      } else if (!Array.isArray(userAnswer)) {
        // If userAnswer is a string (e.g., comma-separated), split it into an array
        if (typeof userAnswer === 'string') {
          normalizedUserAnswer = userAnswer.split(',').map(s => s.trim()).filter(s => s);
        } else {
          // For other non-array types, wrap in an array
          normalizedUserAnswer = [userAnswer];
        }
      }
    }

    questionResults.push({
      questionIndex: index,
      questionId: question.id,
      isCorrect,
      earnedPoints,
      maxPoints: points,
      userAnswer: normalizedUserAnswer,
      correctAnswer: normalizedCorrectAnswer
    });
  });

  const percentage = (rawScore / maxScore) * 100;

  return {
    rawScore,
    maxScore,
    percentage,
    questionResults
  };
}

// Utility function to normalize code for comparison
function normalizeCode(code) {
  if (code === null || code === undefined) {
    return '';
  }

  if (typeof code !== 'string') {
    return String(code).trim().replace(/\s+/g, ' ');
  }

  return code.trim().replace(/\s+/g, ' ');
}

// Utility function to calculate similarity between two strings
function calculateSimilarity(str1, str2) {
  const s1 = String(str1);
  const s2 = String(str2);

  if (s1 === s2) return 1.0;

  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0 || len2 === 0) return 0.0;

  // Simple Levenshtein distance implementation
  const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);

  return 1.0 - (distance / maxLen);
}
