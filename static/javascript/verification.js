// verification.js

document.addEventListener('DOMContentLoaded', () => {
    const emailDisplay = document.querySelector('.container p b');
    const activateButton = document.querySelector('.primary-btn');
    
    // --- 1. Get User Email from the URL ---
    // After sign-up, you should redirect like this: 
    // verification.html?email=myname@gmail.com
    const urlParams = new URLSearchParams(window.location.search);
    let userEmail = urlParams.get('email') || 'myname@gmail.com'; 
    // Fallback if no email in URL (replace with a generic message if needed)
    
    // Update the displayed email on the page
    emailDisplay.textContent = `'${userEmail}'`;

    // 2. Handle the 'Activate Now' button click (Resend Email)
    activateButton.addEventListener('click', async () => {
        
        // Safety check
        if (!userEmail || userEmail === 'myname@gmail.com') {
            alert("Error: Could not determine email address for resend.");
            return;
        }

        // Disable button and show loading state
        activateButton.disabled = true;
        activateButton.textContent = 'Sending...';
        
        // --- MOCK API CALL FOR RESEND ---
        // Replace with your actual backend endpoint when ready
        const RESEND_ENDPOINT = 'https://smartstart-backend-2.onrender.com/api/resend-verification-email';

        try {
            console.log(`MOCK: Attempting to resend verification email to ${userEmail}...`);
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // MOCK Success logic
            console.log('MOCK: Success response received.');
            activateButton.textContent = 'Email Re-sent!';
            
        } catch (error) {
            // This would catch a real network failure or a backend error response
            console.error('MOCK Failure:', error);
            activateButton.textContent = 'Resend Failed. Try Again.';
            alert('Failed to resend email. Please ensure your email is correct and try again.');
        } finally {
            // Re-enable button after 5 seconds to prevent spamming the server
            setTimeout(() => {
                activateButton.disabled = false;
                activateButton.textContent = 'Activate Now';
            }, 5000); 
        }
    });
});