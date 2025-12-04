const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('txtPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('txtConfirmPassword');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
}

if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
}

passwordInput.addEventListener('input', function () {
    const password = this.value;
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    strengthContainer.className = 'password-strength';

    if (password.length === 0) {
        strengthText.textContent = '-';
    } else if (strength <= 2) {
        strengthContainer.classList.add('strength-weak');
        strengthText.textContent = 'Weak';
    } else if (strength <= 4) {
        strengthContainer.classList.add('strength-medium');
        strengthText.textContent = 'Medium';
    } else {
        strengthContainer.classList.add('strength-strong');
        strengthText.textContent = 'Strong';
    }
});

const signupForm = document.getElementById('signupForm');
const alertMessage = document.getElementById('alertMessage');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearValidation();

    let isValid = true;

    const fullName = document.getElementById('txtFullName').value.trim();
    const username = document.getElementById('txtUsername').value.trim();
    const email = document.getElementById('txtEmail').value.trim();
    const password = document.getElementById('txtPassword').value;
    const confirmPassword = document.getElementById('txtConfirmPassword').value;

    if (!fullName || fullName.length < 2) {
        setInvalid('txtFullName', 'Full name must be at least 2 characters');
        isValid = false;
    }
    if (!username || username.length < 3) {
        setInvalid('txtUsername', 'Username must be at least 3 characters');
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        setInvalid('txtEmail', 'Please enter a valid email address');
        isValid = false;
    }

    if (!password || password.length < 8) {
        setInvalid('txtPassword', 'Password must be at least 8 characters');
        isValid = false;
    }
    if (password !== confirmPassword) {
        setInvalid('txtConfirmPassword', 'Passwords do not match');
        isValid = false;
    }

    if (!isValid) {
        showAlert('Please fix the errors in the form', 'danger');
        return;
    }

    handleSignUp();
});

function setInvalid(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId.replace('txt', '').toLowerCase() + 'Error');

    if (field) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    }

    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearValidation() {
    const fields = ['txtFullName', 'txtUsername', 'txtEmail', 'txtPassword', 'txtConfirmPassword'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId.replace('txt', '').toLowerCase() + 'Error');

        if (field) {
            field.classList.remove('is-invalid', 'is-valid');
        }

        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    });
}

function showAlert(message, type) {
    alertMessage.textContent = message;
    alertMessage.className = `alert alert-${type}`;
    alertMessage.style.display = 'block';

    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 5000);
}

const inputs = document.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() && !this.classList.contains('is-invalid')) {
            this.classList.add('is-valid');
        }
    });
});
