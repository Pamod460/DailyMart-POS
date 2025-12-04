const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('txtPassword');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
}

const loginForm = document.getElementById('loginForm');
const alertMessage = document.getElementById('alertMessage');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('txtUsername').value.trim();
    const password = document.getElementById('txtPassword').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    if (!username || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    const success = login(username, password);

    if (!success) {
        showAlert('Invalid username or password', 'danger');
    }
});

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
