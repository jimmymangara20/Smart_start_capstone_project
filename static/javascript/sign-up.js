// sign-up.js

document.getElementById('signupForm').addEventListener('submit', function(event) {
    // 1. Prevent default form submission (stops the page from reloading)
    event.preventDefault();

    // 2. Get form elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // 3. Client-Side Validation
    if (password !== confirmPassword) {
        alert('Error: Passwords do not match!');
        passwordInput.focus();
        return; // Stop the function if validation fails
    }

    if (!email || !password || !confirmPassword) {
        alert('Error: All fields are required!');
        return;
    }

    // **********************************************
    // 4. Data Collection (This data is ready to send)
    // **********************************************
    const formData = {
        email: email,
        password: password,
        // NOTE: Do NOT send confirmPassword to the backend
    };

    console.log('Form data collected:', formData);

    // **********************************************
    // 5. Proceed to backend API call (Next step)
    // **********************************************
    submitRegistration(formData);
});

// A function to handle the API call
async function submitRegistration(formData) {
    // We'll fill this in the next section!
    console.log("Pretending to submit to API...", formData);
}



//// sign-up.js (continued)

async function submitRegistration(formData) {
    // Replace with your actual backend registration endpoint URL
    const API_ENDPOINT = 'YOUR_BACKEND_API_URL/api/register'; 

    // Get the sign-up button to disable it during submission
    const submitButton = document.querySelector('.signup-btn');
    submitButton.disabled = true;
    submitButton.textContent = 'Signing Up...';

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST', // Use POST for registration
            headers: {
                'Content-Type': 'application/json', // Tell the server you are sending JSON
            },
            body: JSON.stringify(formData), // Convert JavaScript object to JSON string
        });

        // Check if the server response was successful (status 200-299)
        if (response.ok) {
            const result = await response.json();
            alert('Success! Account created.');
            // Redirect user or update UI
            window.location.href = '/dashboard'; 
        } else {
            // Handle HTTP errors (e.g., 400 Bad Request, 409 Conflict)
            const errorData = await response.json();
            alert(`Registration failed: ${errorData.message || 'Server error'}`);
        }
    } catch (error) {
        // Handle network errors (e.g., server offline)
        console.error('Network or fetch error:', error);
        alert('An unexpected error occurred. Please try again.');
    } finally {
        // Re-enable the button regardless of success or failure
        submitButton.disabled = false;
        submitButton.textContent = 'Sign Up';
    }
}