// script.js

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const passwordCharMocks = document.querySelectorAll('.password-char-mock');

    // Function to update the mock characters
    function updatePasswordMocks() {
        const passwordValue = passwordInput.value;
        const charsToDisplay = ['P', 'I', 'D']; // Characters from the image
        
        passwordCharMocks.forEach((mock, index) => {
            if (index < charsToDisplay.length) {
                // Display specific characters for the first few
                mock.textContent = charsToDisplay[index];
            } else if (index < passwordValue.length - (charsToDisplay.length - 1)) {
                // For subsequent characters, show a dot (empty content with :after pseudo-element in CSS)
                mock.textContent = ''; 
            } else {
                // Clear any remaining mock characters if the input is shorter
                mock.textContent = '';
            }

            // Visually hide/show mocks based on input length
            if (index < passwordValue.length) {
                mock.style.display = 'inline-flex';
            } else {
                mock.style.display = 'none';
            }
        });
    }

    // Initial update on page load
    updatePasswordMocks();

    // Update on input change
    passwordInput.addEventListener('input', updatePasswordMocks);
});