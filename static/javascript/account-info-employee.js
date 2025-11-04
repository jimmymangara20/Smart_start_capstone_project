document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Toggle Switch Functionality
    const biometricToggle = document.getElementById('biometric-toggle');
    
    biometricToggle.addEventListener('change', function() {
        if (this.checked) {
            console.log("Biometric Login Enabled. Ready to update backend state.");
        } else {
            console.log("Biometric Login Disabled. Ready to update backend state.");
        }
        // NOTE: Here is where you would call an API like:
        // fetch('/api/settings/biometric', { method: 'PATCH', body: JSON.stringify({ enabled: this.checked }) });
    });

    // 2. Clickable List Items (Future Routing/Modals)
    const clickableItems = document.querySelectorAll('.list-item.clickable, .profile-card.clickable');
    
    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            if (action) {
                console.log(`Action requested: ${action}. This would trigger routing or open a modal.`);
            } else {
                console.log('Clicked a non-actionable item.');
            }
        });
    });

    // 3. Simple Search Bar Focus Effect (Minor polish)
    const searchInput = document.querySelector('.search-input');
    const searchArea = document.querySelector('.search-area');

    searchInput.addEventListener('focus', () => {
        searchArea.style.borderColor = '#007bff';
    });
    searchInput.addEventListener('blur', () => {
        searchArea.style.borderColor = '#ccc';
    });
});