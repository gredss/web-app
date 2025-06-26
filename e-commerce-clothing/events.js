document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('modelForm');
    const inputs = form.querySelectorAll('input, select, textarea');

    const allowedEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (inputElement) {
            inputElement.classList.add('error-input');
        }
    }

    function hideError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        if (inputElement) {
            inputElement.classList.remove('error-input');
        }
    }

    function validateFullName(name) {
        if (!name.trim()) {
            return 'Full name is required';
        }
        if (name.trim().length < 2) {
            return 'Full name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            return 'Full name can only contain letters and spaces';
        }
        return '';
    }
    document.getElementById("menuToggle").addEventListener("click", function () {
        document.getElementById("mobileMenu").classList.toggle("active");
    });
    function validateEmail(email) {
        if (!email.trim()) {
            return 'Email address is required';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        
        const domain = email.split('@')[1];
        if (!allowedEmailDomains.includes(domain)) {
            return `Email must be from supported providers: ${allowedEmailDomains.join(', ')}`;
        }
        
        return '';
    }

    function validatePhone(phone) {
        if (!phone.trim()) {
            return 'Phone number is required';
        }
        
        const cleanPhone = phone.replace(/\D/g, '');
        
        if (cleanPhone.length < 8 || cleanPhone.length > 13) {
            return 'Phone number must be 8-13 digits';
        }
        
        if (cleanPhone.startsWith('62')) {
            if (cleanPhone.length < 10 || cleanPhone.length > 13) {
                return 'Phone number with +62 must be 10-13 digits';
            }
        } else if (cleanPhone.startsWith('0')) {
            if (cleanPhone.length < 10 || cleanPhone.length > 12) {
                return 'Phone number starting with 0 must be 10-12 digits';
            }
        } else if (cleanPhone.startsWith('8')) {
            if (cleanPhone.length < 9 || cleanPhone.length > 11) {
                return 'Phone number must be 9-11 digits';
            }
        } else {
            return 'Invalid phone format. Use: 08xx, +628xx, or 8xx';
        }
        
        return '';
    }

    function validateBirthDate(date) {
        if (!date) {
            return 'Date of birth is required';
        }
        
        const birthDate = new Date(date);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 17) {
            return 'You must be at least 17 years old';
        }
        
        if (birthDate > today) {
            return 'Date of birth cannot be in the future';
        }
        
        return '';
    }

    function validateHeight(height) {
        if (!height) {
            return 'Height is required';
        }
        
        const heightNum = parseInt(height);
        if (isNaN(heightNum) || heightNum < 150 || heightNum > 220) {
            return 'Height must be between 150-220 cm';
        }
        
        return '';
    }

    function validateLocation(location) {
        if (!location.trim()) {
            return 'Location is required';
        }
        if (location.trim().length < 2) {
            return 'Location must be at least 2 characters';
        }
        return '';
    }

    function validateGender() {
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const isSelected = Array.from(genderInputs).some(input => input.checked);
        
        if (!isSelected) {
            return 'Please select your gender';
        }
        return '';
    }

    function validatePortfolio(url) {
        if (!url.trim()) {
            return '';
        }
        
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(url)) {
            return 'Portfolio link must start with http:// or https://';
        }
        
        const allowedDomains = [
            'drive.google.com',
            'dropbox.com',
            'behance.net',
            'instagram.com',
            'linkedin.com',
            'portfolio.com',
            'wix.com',
            'squarespace.com',
            'github.io',
            'netlify.app',
            'vercel.app'
        ];
        
        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname.replace('www.', '');
            
            const isAllowedDomain = allowedDomains.some(allowedDomain => 
                domain === allowedDomain || domain.endsWith('.' + allowedDomain)
            );
            
            if (!isAllowedDomain) {
                return `Portfolio link must be from: ${allowedDomains.join(', ')}`;
            }
        } catch (e) {
            return 'Invalid URL format';
        }
        
        return '';
    }

    function validateTerms() {
        const termsCheckbox = document.getElementById('agreeTerms');
        if (!termsCheckbox.checked) {
            return 'You must accept the terms and conditions';
        }
        return '';
    }

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this.id || this.name);
        });

        input.addEventListener('input', function() {
            if (this.id) {
                hideError(this.id);
            }
        });
    });

    function validateField(fieldId) {
        const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        if (!field) return true;

        let errorMessage = '';

        switch (fieldId) {
            case 'fullName':
                errorMessage = validateFullName(field.value);
                break;
            case 'email':
                errorMessage = validateEmail(field.value);
                break;
            case 'phone':
                errorMessage = validatePhone(field.value);
                break;
            case 'birthDate':
                errorMessage = validateBirthDate(field.value);
                break;
            case 'height':
                errorMessage = validateHeight(field.value);
                break;
            case 'location':
                errorMessage = validateLocation(field.value);
                break;
            case 'gender':
                errorMessage = validateGender();
                break;
            case 'portfolio':
                errorMessage = validatePortfolio(field.value);
                break;
            case 'agreeTerms':
                errorMessage = validateTerms();
                break;
        }

        if (errorMessage) {
            showError(fieldId, errorMessage);
            return false;
        } else {
            hideError(fieldId);
            return true;
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const errorElements = form.querySelectorAll('.error');
        errorElements.forEach(error => error.style.display = 'none');

        const inputElements = form.querySelectorAll('.error-input');
        inputElements.forEach(input => input.classList.remove('error-input'));

        let isValid = true;
        const fieldsToValidate = ['fullName', 'email', 'phone', 'birthDate', 'height', 'location', 'gender', 'portfolio', 'agreeTerms'];

        fieldsToValidate.forEach(fieldId => {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Application submitted successfully! We will contact you within 2-3 weeks.');
        } else {
            const firstError = form.querySelector('.error-input');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    document.getElementById('phone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('62')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            
        } else if (value.length > 0 && !value.startsWith('8')) {
            value = '0' + value;
        }
        
        e.target.value = value;
    });

    document.getElementById('instagram').addEventListener('input', function(e) {
        let value = e.target.value;
        
        if (value && !value.startsWith('@')) {
            value = '@' + value;
        }
        
        value = value.replace(/[^@a-zA-Z0-9_.]/g, '');
        
        e.target.value = value;
    });
});