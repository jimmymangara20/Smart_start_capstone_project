document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Table Action Handlers (Admin View/Download)
    const actionIcons = document.querySelectorAll('.actions-cell i');
    
    actionIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const employeeName = e.target.closest('tr').querySelector('.employee-name').textContent.trim();
            
            if (icon.classList.contains('fa-eye')) {
                console.log(`ADMIN ACTION: Opening document preview for ${employeeName}. Future: API call to fetch document image/PDF.`);
            } else if (icon.classList.contains('fa-download')) {
                console.log(`ADMIN ACTION: Triggering download for document submitted by ${employeeName}.`);
            }
        });
    });

    // 2. Status Card Hover Effect (Visual polish)
    const statusCards = document.querySelectorAll('.status-card');

    statusCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.card-icon-status').style.opacity = '0.3';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-icon-status').style.opacity = '0.1'; // Back to very subtle
        });
    });

    // 3. Filter Dropdown Mock Interaction
    const filterDropdown = document.querySelector('.filter-dropdown');
    filterDropdown.addEventListener('click', () => {
        console.log('Filter dropdown clicked. Future: Displaying a modal/list of filtering options (e.g., filter by Approved, Pending).');
    });

});