// Function to update the progress bar visually
function updateProgress(percentage) {
    const progressCircle = document.querySelector('.progress-circle');
    const percentageNum = document.querySelector('.percentage-num');
    
    // Safety check to ensure percentage is between 0 and 100
    const normalizedPercent = Math.max(0, Math.min(100, percentage));
    
    // 1. Update the CSS Variable which controls the conic-gradient
    progressCircle.style.setProperty('--progress-percent', normalizedPercent);
    
    // 2. Update the text value
    percentageNum.textContent = `${normalizedPercent}%`;
}

// Example usage: You can test this in your browser's console
// updateProgress(75); // Should make the bar 75% blue
// updateProgress(0); // Back to 0%

// A single object to hold all the necessary DOM elements (good practice!)
const DOM = {
    // Header & Welcome
    userName: document.querySelector('.user-name'),
    welcomeHeader: document.querySelector('.welcome-banner h2'),
    profilePic: document.querySelector('.profile-pic'),
    
    // Progress Widget
    progressCircle: document.querySelector('.progress-circle'),
    percentageNum: document.querySelector('.percentage-num'),
    progressDetailH3: document.querySelector('.progress-details h3'),
    
    // Quick Information
    employeeId: document.querySelector('.detail-row .value:nth-child(1)'),
    email: document.querySelector('.detail-row .value:nth-child(2)'),
    phone: document.querySelector('.detail-row .value:nth-child(3)'),
    department: document.querySelector('.detail-row .value:nth-child(4)'),
    startDate: document.querySelector('.detail-row .value:nth-child(5)'),
    
    // Sessions Container (for dynamic rendering)
    sessionsContainer: document.querySelector('.upcoming-sessions-container')
};

// const API_BASE = 'http://your-backend-api.com'; // Replace with your actual base URL

/**
 * Updates the circular progress bar based on the percentage fetched.
 * @param {number} percentage - The completion percentage (0-100).
 */
function updateProgressBar(percentage) {
    const normalizedPercent = Math.max(0, Math.min(100, percentage));
    
    // Update the CSS Variable, which drives the conic-gradient fill
    DOM.progressCircle.style.setProperty('--progress-percent', normalizedPercent);
    DOM.percentageNum.textContent = `${normalizedPercent}%`;
    DOM.progressDetailH3.textContent = `Onboarding Progress: ${normalizedPercent}% Complete`;
}


/**
 * The main function to fetch and render all dashboard data.
 */
async function loadDashboardData() {
    try {
        // --- 1. Fetch User Data ---
        const userResponse = await fetch(`${API_BASE}/api/user/aisha`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data.");
        const userData = await userResponse.json();
        
        // --- Render User Details ---
        const fullName = userData.firstName + ' ' + userData.lastName;
        
        DOM.userName.textContent = fullName;
        DOM.welcomeHeader.textContent = `Welcome ${userData.firstName}!`;
        DOM.profilePic.src = userData.profileImageUrl || 'default.jpg';
        
        // Quick Information
        DOM.employeeId.textContent = userData.employeeId;
        // (You would continue populating all the other detail fields here...)
        
        // Progress
        updateProgressBar(userData.onboardingProgress);

        // --- 2. Fetch Upcoming Sessions ---
        const sessionsResponse = await fetch(`${API_BASE}/api/sessions`);
        if (!sessionsResponse.ok) throw new Error("Failed to fetch sessions.");
        const sessions = await sessionsResponse.json();
        
        // --- Render Sessions ---
        renderSessions(sessions);
        
    } catch (error) {
        console.error("Dashboard failed to load:", error);
        // Display a user-friendly error message on the screen
        // document.querySelector('.dashboard-container').innerHTML = '<h2>Failed to load data. Please try again later.</h2>';
    }
}

/**
 * Takes an array of session objects and renders them into the sessions container.
 */
function renderSessions(sessions) {
    const sessionsHTML = sessions.map(session => `
        <div class="session-card">
            <p class="session-date">${session.date} - ${session.time}</p>
            <p class="session-title">${session.title}</p>
        </div>
    `).join('');
    
    // Replace the static cards with the dynamically generated HTML
    DOM.sessionsContainer.innerHTML = sessionsHTML; 
}


// --- Execute when the page is fully loaded ---
document.addEventListener('DOMContentLoaded', loadDashboardData);

// Note: You would also need logic to handle data for the Support Team and Manager, 
// likely by mapping through an array in the userData object.