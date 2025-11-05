function loadDocumentsData() {
    console.log("Documents Page Loaded");

    // 1. File Upload Interaction
    const fileInput = document.getElementById('file-upload');
    const dropzoneText = document.querySelector('.dropzone-text');

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const fileNames = Array.from(fileInput.files)
                    .map(f => f.name)
                    .join(', ');
                dropzoneText.textContent = `Selected files: ${fileNames}. Click 'Choose file' to change.`;
            } else {
                dropzoneText.textContent = 'Upload a scan or photo of your documents';
            }
        });
    }

    // 2. Table Action Handlers (View/Download)
    const actionIcons = document.querySelectorAll('.actions-cell i');

    actionIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const fileNameCell = row.querySelector('[data-label="File Name"]');
            const fileName = fileNameCell ? fileNameCell.textContent.trim() : 'Unknown file';

            if (icon.classList.contains('fa-eye')) {
                console.log(`Action: Viewing "${fileName}"`);
            } else if (icon.classList.contains('fa-download')) {
                console.log(`Action: Downloading "${fileName}"`);
            }
        });
    });

    // 3. Search Bar Focus Effect
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
}
