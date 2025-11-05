document.addEventListener("DOMContentLoaded", () => {

    /* ---------------- PAGE-SPECIFIC CALLS ---------------- */
    const page = document.body.id;

    if (page === "dashboard-page") loadDashboardData();
    if (page === "checklist-page") loadChecklistData();
    if (page === "events-page") loadEventsData();
    if (page === "documents-page") loadDocumentsData();


    /* ---------------- GLOBAL FEATURES ---------------- */

    // 1. Sidebar Active State
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 2. Search Bar Glow
    const searchInput = document.querySelector('.search-input');
    const searchArea = document.querySelector('.search-area');

    if (searchInput && searchArea) {
        searchInput.addEventListener('focus', () => searchArea.style.borderColor = '#007bff');
        searchInput.addEventListener('blur', () => searchArea.style.borderColor = '#ccc');
    }

    // 3. File Upload Handler (Checklist/Docs page)
    const fileInput = document.getElementById('file-upload');
    const dropzoneText = document.querySelector('.dropzone-text');

    if (fileInput && dropzoneText) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const fileNames = Array.from(fileInput.files).map(f => f.name).join(', ');
                dropzoneText.textContent = `Selected files: ${fileNames}. Click 'Choose file' again to change.`;
            } else {
                dropzoneText.textContent = 'Upload a scan or photo of your documents';
            }
        });
    }

    // 4. Table Action Icons
    const actionIcons = document.querySelectorAll('.actions-cell i');
    actionIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const fileNameCell = e.target.closest('tr').querySelector('[data-label="File Name"]');
            const fileName = fileNameCell ? fileNameCell.textContent.trim() : 'Unknown file';

            if (icon.classList.contains('fa-eye')) {
                console.log(`Viewing: ${fileName}`);
            } else if (icon.classList.contains('fa-download')) {
                console.log(`Downloading: ${fileName}`);
            }
        });
    });

    // 5. Profile Page Click Items
    const clickableItems = document.querySelectorAll('.info-item.clickable');
    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            console.log("Navigate to:", section);
        });
    });

    // 6. Back Arrow
    const backArrow = document.querySelector('.back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', () => window.history.back());
    }

    // 7. Logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert('Logging out...');
        });
    }

});
