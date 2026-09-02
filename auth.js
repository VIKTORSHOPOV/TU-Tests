// Authentication System for Exam Access
// Implements secure password authentication with server-side verification

// Global variables
let currentExam = null;
let currentExamId = null;

// DOM Elements
const domElements = {};

// API base URL - uses relative path for Netlify Functions
const API_BASE = '/.netlify/functions';

// Initialize authentication system
document.addEventListener('DOMContentLoaded', () => {
    initializeAuthSystem();
});

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

// Initialize the authentication system
async function initializeAuthSystem() {
    try {
        // Get exam ID from URL parameters or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        currentExamId = urlParams.get('exam') || localStorage.getItem('selectedExamId');
        
        if (!currentExamId) {
            // Redirect to index if no exam selected
            window.location.href = 'index.html';
            return;
        }
        
        // Fetch exam data from API
        currentExam = await fetchExam(currentExamId);
        
        if (!currentExam) {
            // Redirect to index if exam not found
            window.location.href = 'index.html';
            return;
        }
        
        // Cache DOM elements
        cacheAuthDomElements();
        
        // Add event listeners
        addAuthEventListeners();
        
        // Check if exam requires authentication
        if (!currentExam.passwordHash) {
            // If no password required, redirect to exam directly
            redirectToExam();
            return;
        }
        
        // Update UI with exam information
        updateAuthUI();
        
    } catch (error) {
        console.error("Грешка при инициализиране на удостоверяването:", error);
        showAuthError("Грешка при инициализиране на системата за удостоверяване. Моля, опитайте отново.");
    }
}

// Cache DOM elements for better performance
function cacheAuthDomElements() {
    domElements.authForm = document.getElementById('auth-form');
    domElements.passwordInput = document.getElementById('exam-password');
    domElements.togglePasswordBtn = document.getElementById('toggle-password');
    domElements.passwordError = document.getElementById('password-error');
    domElements.passwordStrength = document.getElementById('password-strength');
    domElements.submitBtn = document.getElementById('submit-auth');
    domElements.buttonText = domElements.submitBtn.querySelector('.button-text');
    domElements.loadingSpinner = domElements.submitBtn.querySelector('.loading-spinner');
    domElements.authMessage = document.getElementById('auth-message');
}

// Add event listeners for authentication
function addAuthEventListeners() {
    // Form submission
    domElements.authForm.addEventListener('submit', handleAuthSubmit);
    
    // Password toggle visibility
    domElements.togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    
    // Password input validation
    domElements.passwordInput.addEventListener('input', validatePassword);
    domElements.passwordInput.addEventListener('blur', validatePassword);
    
    // Prevent form submission on Enter key (for better UX)
    domElements.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAuthSubmit(e);
        }
    });
}

// Handle authentication form submission
async function handleAuthSubmit(event) {
    event.preventDefault();
    
    try {
        // Validate password
        if (!validatePassword()) {
            return;
        }
        
        // Get password value
        const password = domElements.passwordInput.value.trim();
        
        if (!password) {
            showPasswordError("Моля, въведете парола.");
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Hash the password using SHA-256
        const hashedPassword = hashPassword(password);
        
        // Verify password server-side
        const response = await fetch(`${API_BASE}/verify-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                examId: currentExamId,
                passwordHash: hashedPassword
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.verified) {
            // Authentication successful
            handleAuthSuccess();
        } else {
            // Authentication failed
            handleAuthFailure();
        }
        
    } catch (error) {
        console.error("Грешка при изпращане на удостоверяването:", error);
        showAuthError("Грешка при обработка на удостоверяването. Моля, опитайте отново.");
    } finally {
        setLoadingState(false);
    }
}

// Hash password using SHA-256
function hashPassword(password) {
    try {
        // Use CryptoJS for SHA-256 hashing
        const hash = CryptoJS.SHA256(password).toString();
        return hash;
    } catch (error) {
        console.error("Грешка при хеширане на паролата:", error);
        throw new Error("Грешка при хеширане на паролата");
    }
}

// Validate password input
function validatePassword() {
    const password = domElements.passwordInput.value;
    const minLength = parseInt(domElements.passwordInput.getAttribute('minlength')) || 4;
    const maxLength = parseInt(domElements.passwordInput.getAttribute('maxlength')) || 50;
    
    // Clear previous errors
    clearPasswordError();
    
    // Check minimum length
    if (password.length > 0 && password.length < minLength) {
        showPasswordError(`Паролата трябва да е дълга поне ${minLength} знака.`);
        updatePasswordStrength('слаба');
        return false;
    }
    
    // Check maximum length
    if (password.length > maxLength) {
        showPasswordError(`Паролата не трябва да надвишава ${maxLength} знака.`);
        updatePasswordStrength('слаба');
        return false;
    }
    
    // Update password strength indicator
    if (password.length >= minLength) {
        if (password.length >= minLength + 4) {
            updatePasswordStrength('силна');
        } else if (password.length >= minLength + 2) {
            updatePasswordStrength('средна');
        } else {
            updatePasswordStrength('слаба');
        }
    } else {
        updatePasswordStrength('');
    }
    
    return true;
}

// Toggle password visibility
function togglePasswordVisibility() {
    const input = domElements.passwordInput;
    const toggleBtn = domElements.togglePasswordBtn;
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.innerHTML = '<span class="toggle-icon">🙈</span>';
        toggleBtn.setAttribute('aria-label', 'Скрий паролата');
    } else {
        input.type = 'password';
        toggleBtn.innerHTML = '<span class="toggle-icon">👁️</span>';
        toggleBtn.setAttribute('aria-label', 'Покажи паролата');
    }
    
    // Focus back on input
    input.focus();
}

// Update password strength indicator
function updatePasswordStrength(strength) {
    const indicator = domElements.passwordStrength;
    indicator.className = 'password-strength-indicator';
    
    if (strength) {
        indicator.classList.add(strength);
    }
}

// Show password error
function showPasswordError(message) {
    domElements.passwordError.textContent = message;
    domElements.passwordInput.classList.add('error');
}

// Clear password error
function clearPasswordError() {
    domElements.passwordError.textContent = '';
    domElements.passwordInput.classList.remove('error');
}

// Set loading state
function setLoadingState(loading) {
    if (loading) {
        domElements.submitBtn.disabled = true;
        domElements.buttonText.textContent = 'Authenticating...';
        domElements.loadingSpinner.classList.remove('hidden');
        domElements.passwordInput.disabled = true;
    } else {
        domElements.submitBtn.disabled = false;
        domElements.buttonText.textContent = 'Access Exam';
        domElements.loadingSpinner.classList.add('hidden');
        domElements.passwordInput.disabled = false;
    }
}

// Show authentication error
function showAuthError(message) {
    domElements.authMessage.textContent = message;
    domElements.authMessage.className = 'auth-message error';
    domElements.authMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideAuthMessage();
    }, 5000);
}

// Hide authentication message
function hideAuthMessage() {
    domElements.authMessage.classList.add('hidden');
}

// Handle authentication success
function handleAuthSuccess() {
    try {
        // Store authentication token in sessionStorage (more secure than localStorage)
        const authToken = generateAuthToken();
        sessionStorage.setItem(`auth_${currentExamId}`, authToken);
        
        // Show success message
        domElements.authMessage.textContent = 'Authentication successful! Redirecting to exam...';
        domElements.authMessage.className = 'auth-message success';
        domElements.authMessage.classList.remove('hidden');
        
        // Redirect to exam after short delay
        setTimeout(() => {
            redirectToExam();
        }, 1500);
        
    } catch (error) {
        console.error("Auth success handling error:", error);
        showAuthError("Failed to complete authentication. Please try again.");
    }
}

// Handle authentication failure
function handleAuthFailure() {
    showAuthError("Invalid password. Please check your password and try again.");
    
    // Clear password field for security
    domElements.passwordInput.value = '';
    updatePasswordStrength('');
    
    // Focus on password input
    domElements.passwordInput.focus();
}

// Generate authentication token
function generateAuthToken() {
    const timestamp = Date.now();
    const randomData = Math.random().toString(36).substring(2, 15);
    const data = `${currentExamId}_${timestamp}_${randomData}`;
    return CryptoJS.SHA256(data).toString();
}

// Update authentication UI
function updateAuthUI() {
    if (currentExam) {
        // Update page title
        document.title = `Authentication Required - ${currentExam.title}`;
        
        // Update header
        const header = document.querySelector('header h1');
        if (header) {
            header.textContent = `Authentication Required`;
        }
        
        // Update description
        const description = document.querySelector('.auth-description');
        if (description) {
            description.textContent = `Please enter the password to access "${currentExam.title}". This exam requires authentication for security purposes.`;
        }
    }
}

// Redirect to exam page
function redirectToExam() {
    // Store exam ID in localStorage for the exam page
    localStorage.setItem('selectedExamId', currentExamId);
    
    // Navigate to exam page
    window.location.href = 'exam.html';
}

// Utility function to clear sensitive data
function clearSensitiveData() {
    // Clear password field
    if (domElements.passwordInput) {
        domElements.passwordInput.value = '';
    }
    
    // Clear any stored sensitive data
    sessionStorage.removeItem('temp_auth_data');
}

// Handle page unload (cleanup)
window.addEventListener('beforeunload', () => {
    clearSensitiveData();
});

// Handle browser back button
window.addEventListener('popstate', () => {
    clearSensitiveData();
});
