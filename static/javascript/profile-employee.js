document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle the "Back" arrow
    const backArrow = document.querySelector('.back-arrow');
    backArrow.addEventListener('click', () => {
        // In a real application, this would typically navigate back to the previous view (e.g., the main Profile page).
        console.log("Back button clicked. Future: Implementing history navigation or switching view to 'Profile' root.");
        // Example if using simple routing: navigateTo('profile');
    });

    // 2. Handle clicks on the list items
    const clickableItems = document.querySelectorAll('.info-item.clickable');
    
    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            console.log(`Clicked to view/edit: ${section}. Future: Loading a form or a detailed modal.`);
            // This is where you'd execute routing/rendering logic for the next screen.
        });
    });
    
    // 3. Handle Delete Account button
    const deleteButton = document.querySelector('.danger-action-btn');
    
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Use a custom modal for confirmation instead of alert/confirm
        console.log("Delete account button pressed. Future: Displaying a custom confirmation modal.");
        // If a real confirmation were forced:
        // if (confirm("Warning: Deleting your account is permanent. Proceed?")) { 
        //     console.log("Account deletion confirmed."); 
        // }
    });
});