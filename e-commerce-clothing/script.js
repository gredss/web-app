// Constants
const ALLOWED_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
const MINIMUM_AGE = 17;

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) return false;
    
    const domain = email.split('@')[1].toLowerCase();
    return ALLOWED_EMAIL_DOMAINS.includes(domain);
}

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Form Handlers
function handleNewsletterSubmission(email, inputElement) {
    if (!email) {
        showAlert('Please enter your email address');
        return false;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address from supported providers: ' + 
                 ALLOWED_EMAIL_DOMAINS.join(', '));
        return false;
    }

    showAlert('Thank you for subscribing!');
    inputElement.value = '';
    return true;
}

function handleModelFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate age
    const birthDate = new Date(data.birthDate);
    if (calculateAge(birthDate) < MINIMUM_AGE) {
        showAlert(`You must be at least ${MINIMUM_AGE} years old to apply`);
        return false;
    }

    // Validate terms
    if (!data.agreeTerms) {
        showAlert('You must accept the terms and conditions');
        return false;
    }

    // Submit to server would go here
    showAlert('Thank you for your application! We will review your information shortly.');
    form.reset();
    return true;
}

// UI Helpers
function showAlert(message, type = 'info') {
    // Could be enhanced to show styled notifications instead of alerts
    alert(message);
}

function scrollToFirstError(form) {
    const firstError = form.querySelector('.error:not([style*="none"])');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
    }
}

// Event Listeners
function setupNewsletterForms() {
    // Handle both possible newsletter form structures
    document.querySelectorAll('.newsletter form, .subscribe-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            handleNewsletterSubmission(emailInput.value.trim(), emailInput);
        });
    });

    // Fallback for button-only newsletter
    const newsletterBtn = document.querySelector('.newsletter button:not(form button)');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const emailInput = this.closest('.newsletter').querySelector('input[type="email"]');
            handleNewsletterSubmission(emailInput.value.trim(), emailInput);
        });
    }
}

function setupModelForm() {
    const form = document.getElementById('modelForm');
    if (!form) return;

    // Real-time validation
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', validateField);
        input.addEventListener('blur', validateField);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            handleModelFormSubmission(this);
        } else {
            scrollToFirstError(this);
        }
    });
}

function validateField(e) {
    const field = e.target;
    const errorId = `${field.name || field.id}Error`;
    const errorElement = document.getElementById(errorId);
    
    // Reset error state
    if (errorElement) {
        errorElement.style.display = 'none';
        field.classList.remove('error-field');
    }

    let isValid = true;
    const value = field.value.trim();

    // Required field validation
    if (field.required && !value) {
        isValid = false;
    }

    // Type-specific validation
    if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
    }

    if (field.id === 'birthDate' && value) {
        const age = calculateAge(new Date(value));
        if (age < MINIMUM_AGE) isValid = false;
    }

    if (field.name === 'gender' && !form.querySelector('input[name="gender"]:checked')) {
        isValid = false;
    }

    if (field.type === 'checkbox' && field.required && !field.checked) {
        isValid = false;
    }

    // Show error if invalid
    if (!isValid && errorElement) {
        errorElement.style.display = 'block';
        field.classList.add('error-field');
    }

    return isValid;
}

function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('input').forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    return isValid;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Optional: Keep any other initial setup you use
    setupNewsletterForms();
    setupModelForm();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

document.getElementById("menuToggle").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.toggle("active");
});

function switchImage(thumb) {
  const mainImg = document.getElementById('mainProductImage');
  mainImg.src = thumb.src;
}

