// Global variables
let currentExam = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let examTimer = null;
let timeRemaining = 0;
let examsData = []; // Will be populated from API

// DOM Elements
const domElements = {};

// API base URL - uses relative path for Netlify Functions
const API_BASE = '/.netlify/functions';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the index page or exam page
    if (document.querySelector('#exam-list')) {
        initializeIndexPage();
    } else if (document.querySelector('.exam-page')) {
        initializeExamPage();
    }
    
    // Initialize dark mode toggle
    initializeDarkModeToggle();
});

// Initialize dark mode toggle functionality
function initializeDarkModeToggle() {
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.innerHTML = '<span class="toggle-icon">🌙</span>';
    
    // Append to body
    document.body.appendChild(toggleButton);
    
    // Check for saved preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleButton.innerHTML = '<span class="toggle-icon">☀️</span>';
    }
    
    // Add click event listener
    toggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        toggleButton.innerHTML = newTheme === 'dark' ? '<span class="toggle-icon">☀️</span>' : '<span class="toggle-icon">🌙</span>';
    });
}

// Fetch exams list from API
async function fetchExams() {
    try {
        const response = await fetch(`${API_BASE}/get-exam`);
        if (!response.ok) {
            throw new Error('Failed to fetch exams');
        }
        const data = await response.json();
        return data.exams || [];
    } catch (error) {
        console.error('Error fetching exams:', error);
        throw error;
    }
}

// Fetch specific exam from API
async function fetchExam(examId) {
    try {
        const response = await fetch(`${API_BASE}/get-exam?id=${encodeURIComponent(examId)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch exam');
        }
        const data = await response.json();
        return data.exam;
    } catch (error) {
        console.error('Error fetching exam:', error);
        throw error;
    }
}

// Initialize the index page with exam selection
async function initializeIndexPage() {
    const examListContainer = document.getElementById('exam-list');
    
    try {
        // Fetch exams from API
        examsData = await fetchExams();
        
        // Clear loading message
        examListContainer.innerHTML = '';
        
        if (examsData.length === 0) {
            examListContainer.innerHTML = '<div class="error-message">Няма налични изпити.</div>';
            return;
        }
        
        // Group exams by category
        const categories = {};
        examsData.forEach(exam => {
            const category = exam.category || 'Без категория';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(exam);
        });
        
        // Add collapse/expand controls in utility bar
        const utilityBar = document.createElement('div');
        utilityBar.className = 'utility-bar';
        const utilityControls = document.createElement('div');
        utilityControls.className = 'utility-controls';
        utilityControls.innerHTML = `
            <button id="collapse-all">Скрий всички</button>
            <button id="expand-all">Покажи всички</button>
        `;
        utilityBar.appendChild(utilityControls);
        examListContainer.appendChild(utilityBar);

        // Create course columns wrapper
        const courseColumns = document.createElement('div');
        courseColumns.className = 'course-columns';

        // Create collapsible category sections
        Object.keys(categories).sort().forEach(category => {
            const courseColumn = document.createElement('div');
            courseColumn.className = 'course-column';
            
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header collapsed';
            const count = categories[category].length;
            categoryHeader.innerHTML = `
                <div class="category-title-group">
                    <h3>${category}</h3>
                </div>
                <div class="category-right-group">
                    <span class="category-count">${count}</span>
                    <span class="category-toggle" aria-hidden="true"></span>
                </div>
            `;
            categoryHeader.addEventListener('click', () => {
                const isCollapsed = categoryHeader.classList.contains('collapsed');
                if (isCollapsed) {
                    categoryHeader.classList.remove('collapsed');
                    categoryContentWrapper.classList.add('expanded');
                } else {
                    categoryHeader.classList.add('collapsed');
                    categoryContentWrapper.classList.remove('expanded');
                }
            });
            
            const categoryContentWrapper = document.createElement('div');
            categoryContentWrapper.className = 'category-content-wrapper';
            
            const categoryContent = document.createElement('div');
            categoryContent.className = 'category-content';
            
            // Create exam cards for this category
            categories[category].forEach(exam => {
                const examCard = document.createElement('div');
                examCard.className = 'exam-card';
                examCard.innerHTML = `
                    <h2>${exam.title}</h2>
                    <p>${exam.description}</p>
                    <button class="start-btn" data-exam-id="${exam.id}">Започни изпит</button>
                `;
                categoryContent.appendChild(examCard);
            });
            
            categoryContentWrapper.appendChild(categoryContent);
            categorySection.appendChild(categoryHeader);
            categorySection.appendChild(categoryContentWrapper);
            courseColumn.appendChild(categorySection);
            courseColumns.appendChild(courseColumn);
        });
        
        examListContainer.appendChild(courseColumns);
        
        // Collapse/expand all buttons
        document.getElementById('collapse-all').addEventListener('click', () => {
            document.querySelectorAll('.category-header').forEach(header => {
                header.classList.add('collapsed');
            });
            document.querySelectorAll('.category-content-wrapper').forEach(wrapper => {
                wrapper.classList.remove('expanded');
            });
        });
        
        document.getElementById('expand-all').addEventListener('click', () => {
            document.querySelectorAll('.category-header').forEach(header => {
                header.classList.remove('collapsed');
            });
            document.querySelectorAll('.category-content-wrapper').forEach(wrapper => {
                wrapper.classList.add('expanded');
            });
        });
        
        // Add event listeners to start buttons
        document.querySelectorAll('.start-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const examId = e.target.getAttribute('data-exam-id');
                // Store selected exam ID in localStorage
                localStorage.setItem('selectedExamId', examId);
                // Navigate to authentication page instead of exam page
                window.location.href = 'auth.html';
            });
        });
    } catch (error) {
        console.error('Error initializing index page:', error);
        examListContainer.innerHTML = `
            <div class="error-message">
                <p>Възникна грешка при зареждане на изпитите. Моля, опитайте отново по-късно.</p>
            </div>
        `;
    }
}

// Initialize the exam page
async function initializeExamPage() {
    try {
        // Get selected exam ID from localStorage
        const selectedExamId = localStorage.getItem('selectedExamId');
        
        if (!selectedExamId) {
            // If no exam selected, redirect to index page
            window.location.href = 'index.html';
            return;
        }
        
        // Fetch exam data from API (without correct answers)
        currentExam = await fetchExam(selectedExamId);
        
        if (!currentExam) {
            // If exam not found, redirect to index page
            window.location.href = 'index.html';
            return;
        }
        
        // Check if exam requires authentication
        if (currentExam.passwordHash) {
            // Check if user is authenticated for this exam
            const authToken = sessionStorage.getItem(`auth_${selectedExamId}`);
            if (!authToken) {
                // If not authenticated, redirect to authentication page
                window.location.href = 'auth.html';
                return;
            }
        }
        
        // Cache DOM elements
        cacheDomElements();
        
        // Load exam data
        loadExam();
        
        // Add event listeners
        addExamEventListeners();
        
        // Check for saved progress
        checkForSavedProgress();
    } catch (error) {
        console.error("Грешка при инициализиране на изпита:", error);
        // Show error message to user
        document.body.innerHTML = `
            <div class="error-container">
                <h2>Грешка при зареждане на изпита</h2>
                <p>Извиняваме се, възникна проблем при зареждането на изпита. Моля, опитайте отново.</p>
                <a href="index.html" class="back-btn">Назад към изпитите</a>
            </div>
        `;
    }
}

// Cache DOM elements for better performance
function cacheDomElements() {
    domElements.examTitle = document.getElementById('exam-title');
    domElements.questionCounter = document.getElementById('question-counter');
    domElements.timer = document.getElementById('timer');
    domElements.timeValue = document.getElementById('time-value');
    domElements.questionButtons = document.getElementById('question-buttons');
    domElements.questionContent = document.getElementById('question-content');
    domElements.prevBtn = document.getElementById('prev-btn');
    domElements.nextBtn = document.getElementById('next-btn');
    domElements.submitExam = document.getElementById('submit-exam');
    domElements.resultsSection = document.getElementById('results-section');
    domElements.rawScore = document.getElementById('raw-score');
    domElements.percentageScore = document.getElementById('percentage-score');
    domElements.passFail = document.getElementById('pass-fail');
    domElements.questionBreakdown = document.getElementById('question-breakdown');
    domElements.reviewAnswers = document.getElementById('review-answers');
    domElements.retakeExam = document.getElementById('retake-exam');
}

// Load exam data
function loadExam() {
    try {
        // Set exam title
        domElements.examTitle.textContent = currentExam.title;
        
        // Shuffle questions if needed
        let questions = [...currentExam.questions];
        if (currentExam.settings.shuffleQuestions) {
            questions = shuffleArray(questions);
        }
        currentExam.questions = questions;
        
        // Create question navigation buttons
        createQuestionButtons();
        
        // Initialize timer if needed
        initializeTimer();
        
        // Load first question
        loadQuestion(0);
        
        // Update question counter
        updateQuestionCounter();
    } catch (error) {
        console.error("Грешка при зареждане на данните за изпита:", error);
        // Show error message in the question content area
        domElements.questionContent.innerHTML = `
            <div class="error-message">
                <p>Възникна проблем при зареждането на този изпит. Моля, опитайте да презаредите страницата.</p>
            </div>
        `;
    }
}

// Create question navigation buttons
function createQuestionButtons() {
    domElements.questionButtons.innerHTML = '';
    
    currentExam.questions.forEach((question, index) => {
        const button = document.createElement('button');
        button.className = 'q-btn';
        button.textContent = index + 1;
        button.setAttribute('aria-label', `Отиди на въпрос ${index + 1}`);
        button.addEventListener('click', () => {
            saveCurrentAnswer();
            loadQuestion(index);
        });
        
        domElements.questionButtons.appendChild(button);
    });
    
    // Highlight first question button
    updateQuestionButtons();
}

// Initialize timer if exam has time limit
function initializeTimer() {
    if (currentExam.settings.timeLimitSeconds) {
        timeRemaining = currentExam.settings.timeLimitSeconds;
        domElements.timer.classList.remove('hidden');
        updateTimerDisplay();
        
        examTimer = setInterval(() => {
            timeRemaining--;
            updateTimerDisplay();
            
            if (timeRemaining <= 0) {
                clearInterval(examTimer);
                submitExam();
            }
        }, 1000);
    }
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    domElements.timeValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Reset and add warning classes
    domElements.timer.classList.remove('danger', 'warning');
    if (timeRemaining < 60) {
        domElements.timer.classList.add('danger');
    } else if (timeRemaining < 180) {
        domElements.timer.classList.add('warning');
    }
}

// Load a specific question
function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = currentExam.questions[index];
    
    // Update question counter
    updateQuestionCounter();
    
    // Update navigation buttons
    updateQuestionButtons();
    updateNavigationButtons();
    
    // Create question content
    let questionHTML = `
        <div class="question-prompt">${question.prompt}</div>
    `;
    
    // Create different input types based on question type
    if (question.type === 'single') {
        questionHTML += createSingleChoiceHTML(question, index);
    } else if (question.type === 'multiple') {
        questionHTML += createMultipleChoiceHTML(question, index);
    } else if (question.type === 'open') {
        questionHTML += createOpenEndedHTML(question, index);
    }
    
    domElements.questionContent.innerHTML = questionHTML;

    const askAiBtn = document.createElement('button');
    askAiBtn.className = 'btn-ask-ai';
    askAiBtn.textContent = '✨ Попитай AI';
    const options = question.choices ? question.choices.map(c => c.text) : [];
    askAiBtn.addEventListener('click', () => askAI(askAiBtn, question.prompt, options));
    domElements.questionContent.appendChild(askAiBtn);

    // Make entire choice items clickable
    document.querySelectorAll('.choice-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent double-triggering if clicking on input or label
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') return;

            const input = item.querySelector('input');
            if (input.type === 'radio') {
                input.checked = true;
            } else if (input.type === 'checkbox') {
                input.checked = !input.checked;
            }
        });
    });

    // Restore user's previous answer if available
    restoreUserAnswer(index);
}

// Create HTML for single choice questions
function createSingleChoiceHTML(question, questionIndex) {
    let choices = [...question.choices];
    
    // Shuffle choices if needed
    if (currentExam.settings.shuffleChoices) {
        choices = shuffleArray(choices);
    }
    
    let html = `<ul class="choices-list" role="radiogroup" aria-labelledby="question-${questionIndex}-prompt">`;
    
    choices.forEach((choice, idx) => {
        const choiceId = `q${questionIndex}-choice-${choice.id}`;
        html += `
            <li class="choice-item">
                <input type="radio" id="${choiceId}" name="q${questionIndex}" value="${choice.id}">
                <label for="${choiceId}">${choice.text}</label>
            </li>
        `;
    });
    
    html += '</ul>';
    return html;
}

// Create HTML for multiple choice questions
function createMultipleChoiceHTML(question, questionIndex) {
    let choices = [...question.choices];
    
    // Shuffle choices if needed
    if (currentExam.settings.shuffleChoices) {
        choices = shuffleArray(choices);
    }
    
    let html = `<ul class="choices-list" role="group" aria-labelledby="question-${questionIndex}-prompt">`;
    
    choices.forEach(choice => {
        const choiceId = `q${questionIndex}-choice-${choice.id}`;
        html += `
            <li class="choice-item">
                <input type="checkbox" id="${choiceId}" name="q${questionIndex}" value="${choice.id}">
                <label for="${choiceId}">${choice.text}</label>
            </li>
        `;
    });
    
    html += '</ul>';
    return html;
}

// Create HTML for open-ended questions
function createOpenEndedHTML(question, questionIndex) {
    const textareaId = `q${questionIndex}-textarea`;
    return `
        <div class="open-answer">
            <label for="${textareaId}" class="sr-only">Вашият отговор на въпрос ${questionIndex + 1}</label>
            <textarea id="${textareaId}" name="q${questionIndex}" rows="6" placeholder="Въведете вашия отговор тук..."></textarea>
            <div class="char-counter" aria-live="polite">0 символа</div>
        </div>
    `;
}

// Update question counter
function updateQuestionCounter() {
    domElements.questionCounter.textContent = `Въпрос ${currentQuestionIndex + 1} от ${currentExam.questions.length}`;
}

// Update question navigation buttons
function updateQuestionButtons() {
    const buttons = domElements.questionButtons.querySelectorAll('.q-btn');
    
    buttons.forEach((button, index) => {
        // Remove all classes first
        button.classList.remove('current', 'answered');
        
        // Add appropriate classes
        if (index === currentQuestionIndex) {
            button.classList.add('current');
        }
        
        if (userAnswers[index] !== undefined) {
            button.classList.add('answered');
        }
    });
}

// Update navigation buttons (prev/next)
function updateNavigationButtons() {
    // Disable/enable previous button
    domElements.prevBtn.disabled = currentQuestionIndex === 0;
    
    // Disable/enable next button
    domElements.nextBtn.disabled = currentQuestionIndex === currentExam.questions.length - 1;
    
    // Show/hide submit button
    if (currentQuestionIndex === currentExam.questions.length - 1) {
        domElements.submitExam.style.display = 'block';
    } else {
        domElements.submitExam.style.display = 'none';
    }
}

// Save current answer
function saveCurrentAnswer() {
    const question = currentExam.questions[currentQuestionIndex];
    
    if (question.type === 'single') {
        const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
        userAnswers[currentQuestionIndex] = selectedOption ? selectedOption.value : null;
    } else if (question.type === 'multiple') {
        const selectedOptions = Array.from(document.querySelectorAll(`input[name="q${currentQuestionIndex}"]:checked`))
            .map(option => option.value);
        userAnswers[currentQuestionIndex] = selectedOptions.length > 0 ? selectedOptions : null;
    } else if (question.type === 'open') {
        const textAnswer = document.querySelector(`textarea[name="q${currentQuestionIndex}"]`).value.trim();
        userAnswers[currentQuestionIndex] = textAnswer !== '' ? textAnswer : null;
    }
    
    // Save progress to localStorage
    saveProgress();
}

// Restore user's previous answer
function restoreUserAnswer(index) {
    const savedAnswer = userAnswers[index];
    
    if (savedAnswer === undefined || savedAnswer === null) {
        return;
    }
    
    const question = currentExam.questions[index];
    
    if (question.type === 'single') {
        const option = document.querySelector(`input[name="q${index}"][value="${savedAnswer}"]`);
        if (option) {
            option.checked = true;
        }
    } else if (question.type === 'multiple') {
        savedAnswer.forEach(value => {
            const option = document.querySelector(`input[name="q${index}"][value="${value}"]`);
            if (option) {
                option.checked = true;
            }
        });
    } else if (question.type === 'open') {
        const textarea = document.querySelector(`textarea[name="q${index}"]`);
        if (textarea) {
            textarea.value = savedAnswer;
            // Update character counter
            const charCounter = document.querySelector('.char-counter');
            if (charCounter) {
                const length = savedAnswer.length;
                charCounter.textContent = `${length} символ${length !== 1 ? 'а' : ''}`;
            }
        }
    }
}

// Add event listeners for the exam page
function addExamEventListeners() {
    // Back to exams button
    document.getElementById('back-to-exams').addEventListener('click', () => {
        // Confirm before leaving if answers have been provided
        if (Object.keys(userAnswers).length > 0) {
            const confirmed = confirm('Сигурни ли сте, че искате да се върнете към списъка с изпити? Вашият напредък ще бъде запазен, но ще излезете от текущия изпит.');
            if (!confirmed) return;
        }
        
        // Save current progress before navigating away
        saveProgress();
        
        // Navigate back to index page
        window.location.href = 'index.html';
    });
    
    // Previous button
    domElements.prevBtn.addEventListener('click', () => {
        saveCurrentAnswer();
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    });
    
    // Next button
    domElements.nextBtn.addEventListener('click', () => {
        saveCurrentAnswer();
        if (currentQuestionIndex < currentExam.questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        }
    });
    
    // Submit button
    domElements.submitExam.addEventListener('click', () => {
        saveCurrentAnswer();
        
        // Confirm submission
        const confirmed = confirm('Сигурни ли сте, че искате да предадете изпита? Не можете да променяте отговорите си след предаване.');
        
        if (confirmed) {
            submitExam();
        }
    });
    
    // Character counter for open-ended questions
    domElements.questionContent.addEventListener('input', (e) => {
        if (e.target.tagName === 'TEXTAREA') {
            const charCounter = e.target.closest('.open-answer').querySelector('.char-counter');
            if (charCounter) {
                const length = e.target.value.trim().length;
                charCounter.textContent = `${length} символ${length !== 1 ? 'а' : ''}`;
            }
        }
    });
    
    // Review answers button
    domElements.reviewAnswers.addEventListener('click', () => {
        domElements.resultsSection.classList.add('hidden');
        loadQuestion(0);
    });
    
    // Retake exam button
    domElements.retakeExam.addEventListener('click', () => {
        // Reset user answers
        userAnswers = {};
        
        // Clear localStorage for this exam
        localStorage.removeItem(`exam_${currentExam.id}_progress`);
        
        // Reload exam
        domElements.resultsSection.classList.add('hidden');
        loadExam();
    });
}

// Submit the exam and calculate score via API
async function submitExam() {
    // Stop timer if running
    if (examTimer) {
        clearInterval(examTimer);
    }
    
    try {
        // Show loading state
        domElements.questionContent.innerHTML = '<div class="loading">Изпращане на отговорите...</div>';
        
        // Submit answers to server for validation
        const response = await fetch(`${API_BASE}/submit-exam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                examId: currentExam.id,
                answers: userAnswers,
                timeRemaining: timeRemaining
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit exam');
        }
        
        const result = await response.json();
        
        // Display results
        displayResults(result);
        
        // Clear saved progress
        localStorage.removeItem(`exam_${currentExam.id}_progress`);
        
    } catch (error) {
        console.error('Error submitting exam:', error);
        domElements.questionContent.innerHTML = `
            <div class="error-message">
                <p>Възникна грешка при изпращане на изпита. Моля, опитайте отново.</p>
                <button onclick="location.reload()" class="retry-btn">Опитай отново</button>
            </div>
        `;
    }
}

// Ask AI for question explanation
async function askAI(buttonElement, questionText, optionsArray) {
    const originalText = buttonElement.textContent;
    buttonElement.disabled = true;
    buttonElement.textContent = '⏳ AI мисли...';

    let explanationContainer = buttonElement.nextElementSibling;
    if (!explanationContainer || !explanationContainer.classList.contains('ai-explanation')) {
        explanationContainer = document.createElement('div');
        explanationContainer.className = 'ai-explanation';
        buttonElement.insertAdjacentElement('afterend', explanationContainer);
    }
    explanationContainer.innerHTML = '<div class="ai-loading">⏳ AI обяснява...</div>';
    explanationContainer.classList.remove('hidden');

    try {
        const response = await fetch('/.netlify/functions/ask-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionText, options: Array.isArray(optionsArray) ? optionsArray : [] })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Грешка при зареждане на обяснение');
        }

        explanationContainer.innerHTML = data.explanation.replace(/\n/g, '<br>');
    } catch (error) {
        console.error('Ask AI error:', error);
        explanationContainer.innerHTML = `<div class="ai-error">❌ ${error.message}</div>`;
    } finally {
        buttonElement.disabled = false;
        buttonElement.textContent = originalText;
    }
}

// Display exam results from server response
function displayResults(result) {
    // Display raw score
    domElements.rawScore.textContent = `Резултат: ${result.rawScore.toFixed(1)} / ${result.maxScore.toFixed(1)}`;
    
    // Display percentage
    domElements.percentageScore.textContent = `Процент: ${result.percentage.toFixed(1)}%`;
    
    // Display pass/fail status
    domElements.passFail.textContent = result.passed ? 'ДА' : 'НЕ';
    domElements.passFail.className = result.passed ? 'pass' : 'fail';
    
    // Display question breakdown
    domElements.questionBreakdown.innerHTML = '';
    
    result.questionResults.forEach(resultItem => {
        const question = currentExam.questions[resultItem.questionIndex];
        
        const resultElement = document.createElement('div');
        resultElement.className = `question-result ${resultItem.isCorrect ? 'correct' : 'incorrect'}`;
        
        const resultHTML = `
            <div class="result-question">
                <div class="result-question-header">
                    <h3>Въпрос ${resultItem.questionIndex + 1}</h3>
                    <span class="result-status ${resultItem.isCorrect ? 'correct' : 'incorrect'}">
                        ${resultItem.isCorrect ? 'Верен' : 'Грешен'}
                    </span>
                </div>
                <div class="result-question-content">
                    <p><strong>Въпрос:</strong> ${question.prompt}</p>
                    <p><strong>Вашият отговор:</strong> ${formatUserAnswer(question, resultItem.userAnswer)}</p>
                    <p><strong>Правилен отговор:</strong> ${formatCorrectAnswer(question, resultItem.correctAnswer)}</p>
                </div>
            </div>
        `;
        
        resultElement.innerHTML = resultHTML;

        const askAiBtn = document.createElement('button');
        askAiBtn.className = 'btn-ask-ai';
        askAiBtn.textContent = '✨ Попитай AI';
        const options = question.choices ? question.choices.map(c => c.text) : [];
        askAiBtn.addEventListener('click', () => askAI(askAiBtn, question.prompt, options));
        resultElement.querySelector('.result-question').appendChild(askAiBtn);

        domElements.questionBreakdown.appendChild(resultElement);
    });
    
    // Show results section
    domElements.resultsSection.classList.remove('hidden');
}

// Format user answer for display
function formatUserAnswer(question, userAnswer) {
    if (userAnswer === null || userAnswer === undefined) {
        return '<em>Няма предоставен отговор</em>';
    }
    
    if (question.type === 'single') {
        const choice = question.choices.find(c => c.id === userAnswer);
        return choice ? choice.text : userAnswer;
    } else if (question.type === 'multiple') {
        if (userAnswer.length === 0) {
            return '<em>Няма избрани опции</em>';
        }
        
        return userAnswer.map(answerId => {
            const choice = question.choices.find(c => c.id === answerId);
            return choice ? choice.text : answerId;
        }).join(', ');
    } else if (question.type === 'open') {
        if (userAnswer.trim() === '') {
            return '<em>Празен отговор</em>';
        }
        return userAnswer.replace(/\n/g, '<br>'); // Convert newlines to <br> tags for display
    }
}

// Format correct answer for display
function formatCorrectAnswer(question, correctAnswer) {
    if (question.type === 'single') {
        const choice = question.choices.find(c => c.id === correctAnswer);
        return choice ? choice.text : correctAnswer;
    } else if (question.type === 'multiple') {
        return correctAnswer.map(answerId => {
            const choice = question.choices.find(c => c.id === answerId);
            return choice ? choice.text : answerId;
        }).join(', ');
    } else {
        if (Array.isArray(correctAnswer)) {
            return correctAnswer.join(' или ');
        } else {
            return correctAnswer;
        }
    }
}

// Check for saved progress
function checkForSavedProgress() {
    try {
        const savedProgress = localStorage.getItem(`exam_${currentExam.id}_progress`);
        
        if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            const { answers, timeLeft, timestamp } = parsed;
            
            // Check if saved progress is recent (within 24 hours)
            const isRecent = !timestamp || (Date.now() - timestamp < 24 * 60 * 60 * 1000);
            
            if (isRecent) {
                // Restore answers
                userAnswers = answers || {};
                
                // Restore timer if applicable
                if (currentExam.settings.timeLimitSeconds && timeLeft) {
                    timeRemaining = timeLeft;
                }
                
                // Update question buttons to show answered questions
                updateQuestionButtons();
            } else {
                // Clear outdated progress
                localStorage.removeItem(`exam_${currentExam.id}_progress`);
            }
        }
    } catch (error) {
        console.error("Failed to load saved progress:", error);
        // Reset to default state
        userAnswers = {};
    }
}

// Save progress to localStorage
function saveProgress() {
    try {
        const progress = {
            answers: userAnswers,
            timeLeft: timeRemaining,
            timestamp: Date.now()
        };
        
        localStorage.setItem(`exam_${currentExam.id}_progress`, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress:", error);
        // Optionally show a notification to the user
    }
}

// Utility function to shuffle an array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
