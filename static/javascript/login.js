// login.js

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const passwordCharMocks = document.querySelectorAll('.password-char-mock');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const loginForm = document.getElementById('loginForm');
    
    // Function to update the password mock characters
    function updatePasswordMocks() {
        const passwordValue = passwordInput.value;
        const charsToDisplay = ['P', 'I', 'D']; // Characters from the mock image

        passwordCharMocks.forEach((mock, index) => {
            if (index < charsToDisplay.length) {
                mock.textContent = charsToDisplay[index];
            } else if (index < passwordValue.length - (charsToDisplay.length - 1)) {
                mock.textContent = ''; // Show dots via CSS :after pseudo
            } else {
                mock.textContent = '';
            }

            mock.style.display = index < passwordValue.length ? 'inline-flex' : 'none';
        });
    }

    // Initial update
    updatePasswordMocks();

    // Update on input
    passwordInput.addEventListener('input', updatePasswordMocks);

    // ----- Forgot Password routing -----
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/forgot-password.html'; // Update to your actual forgot password page path
        });
    }

    // ----- Handle login submission -----
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert('Please enter your email and password');
                return;
            }

            try {
                const response = await fetch('https://your-backend-api.com/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const userData = await response.json();
                    // Save user data in local storage for session
                    localStorage.setItem('smartstartUser', JSON.stringify(userData));

                    // Redirect based on role
                    if (userData.role === 'Admin') {
                        window.location.href = '/admin-profile.html';
                    } else if (userData.role === 'Employee') {
                        window.location.href = '/employee-profile.html';
                    } else {
                        window.location.href = '/user-landing.html';
                    }
                } else {
                    const error = await response.json();
                    alert(error.message || 'Login failed. Please try again.');
                }
            } catch (err) {
                console.error('Login error:', err);
                alert('Unable to connect to server. Try again later.');
            }
        });
    }
});
