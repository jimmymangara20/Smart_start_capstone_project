document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Tab Switching
    const tabButtons = document.querySelectorAll('.tabs-container .tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log(`Switched to tab: ${button.textContent}. Future: Render different content based on tab.`);
        });
    });

    // 2. Back Arrow Functionality
    const backArrow = document.querySelector('.create-checklist-header .back-arrow');
    backArrow.addEventListener('click', () => {
        console.log("Back button clicked. Future: Navigate back to main Checklist management view.");
        // In a router: window.history.back(); or navigateTo('checklist-overview');
    });

    // 3. Card Action Icons (Edit/Link)
    const cardActionIcons = document.querySelectorAll('.card-actions .action-icon');
    cardActionIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const action = icon.getAttribute('data-action');
            console.log(`Action triggered: ${action}. Future: Open modal or enable inline editing.`);
        });
    });

    // 4. Add Task Button
    const addTaskButton = document.querySelector('.add-task-btn');
    addTaskButton.addEventListener('click', () => {
        const taskInput = document.querySelector('.task-input');
        const uploadRequired = document.getElementById('upload-required').checked;
        
        console.log(`Adding new task: "${taskInput.value}", Upload Required: ${uploadRequired}. Future: Dynamically add a new task card.`);
        taskInput.value = ''; // Clear input
        document.getElementById('upload-required').checked = false; // Reset checkbox
    });

    // 5. Checklist Card hover effect for consistency
    const checklistCards = document.querySelectorAll('.checklist-card');
    checklistCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)');
        card.addEventListener('mouseleave', () => card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)');
    });
});