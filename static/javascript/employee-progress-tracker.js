document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamically append the date below the milestone title
    const milestoneItems = document.querySelectorAll('.milestone-item');
    
    milestoneItems.forEach(item => {
        const dateString = item.getAttribute('data-date');
        const content = item.querySelector('.milestone-content');
        
        if (dateString && content) {
            const dateElement = document.createElement('p');
            dateElement.classList.add('date');
            dateElement.textContent = dateString;
            content.appendChild(dateElement);
        }
    });

    // 2. Handle click on the Next Up card
    const nextUpCard = document.querySelector('.next-up-card');
    
    if (nextUpCard) {
        nextUpCard.addEventListener('click', () => {
            console.log("Next Up task initiated: Complete Tax Forms. Future: Route user to the forms.");
        });
    }

    // 3. Search Bar Focus Effect (For the header search bar)
    const searchInput = document.querySelector('.search-input');
    const searchArea = document.querySelector('.search-area');

    if (searchInput && searchArea) {
        searchInput.addEventListener('focus', () => {
            searchArea.style.borderColor = '#007bff';
        });
        searchInput.addEventListener('blur', () => {
            searchArea.style.borderColor = '#ccc';
        });
    }
});