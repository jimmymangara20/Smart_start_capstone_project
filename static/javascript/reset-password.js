
document.addEventListener('DOMContentLoaded', () => {
    // 1. Select the form element using its ID
    const form = document.getElementById('reset-form');
    
    // Check if the form exists before adding the listener
    if (form) {
        form.addEventListener('submit', handleResetPassword);
    }
});

function handleResetPassword(event) {
    // Stop the browser from submitting the form (which would cause a reload)
    event.preventDefault(); 
    
    // Select the input fields
    const oldPasswordInput = document.getElementById('old-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Get the values
    const oldPassword = oldPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    // Clear any previous error states
    clearErrors([oldPasswordInput, newPasswordInput, confirmPasswordInput]);

    let isValid = true;
    
    // --- Validation Checks ---

    // Check for empty old password (Required)
    if (!oldPassword) {
        displayError(oldPasswordInput, "Please enter your current password.");
        isValid = false;
    }

    // Check for new password strength
    // This is a robust regex: Min 8 chars, at least one number, one lowercase, one uppercase, one symbol
    const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    
    if (!strengthRegex.test(newPassword)) {
        displayError(newPasswordInput, "New password must be 8+ characters, with Upper, Lower, Number, and Symbol.");
        isValid = false;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
        displayError(confirmPasswordInput, "New passwords do not match.");
        isValid = false;
    }
    
    // Check if new password is different from old password (Crucial security step)
    if (newPassword && newPassword === oldPassword) {
         displayError(newPasswordInput, "New password must be different from the old password.");
         isValid = false;
    }

    // --- Final Submission ---
    if (isValid) {
        console.log("Validation successful! Submitting new password...");
        // This is where you would integrate with your *backend* API to reset the password.
        
        // If this were a simple front-end-only project, you might route the user:
        // window.location.href = 'success.html'; 
    }
}

// --- Helper Functions (For showing and clearing errors) ---

function displayError(inputElement, message) {
    // Set a visible error border (requires CSS)
    inputElement.classList.add('input-error');

    // Create and insert the error message below the input
    let errorEl = document.createElement('p');
    errorEl.className = 'error-text';
    errorEl.textContent = message;
    
    // Insert the error message after the input field
    inputElement.parentNode.insertBefore(errorEl, inputElement.nextSibling);
}

function clearErrors(inputs) {
    // Remove the error class from all inputs
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
    
    // Remove all dynamically added error message paragraphs
    document.querySelectorAll('.error-text').forEach(el => el.remove());
}