document.addEventListener('DOMContentLoaded', () => {
    
    // 1. File Upload Interaction
    const fileInput = document.getElementById('file-upload');
    const dropzoneText = document.querySelector('.dropzone-text');
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileNames = Array.from(fileInput.files).map(f => f.name).join(', ');
            dropzoneText.textContent = `Selected files: ${fileNames}. Click 'Choose file' again to finalize or change.`;
        } else {
            dropzoneText.textContent = 'Upload a scan or photo of your documents';
        }
        // NOTE: Actual file upload to API would happen when a 'Submit' button is clicked, not here.
    });

    // 2. Table Action Handlers (View/Download)
    const actionIcons = document.querySelectorAll('.actions-cell i');
    
    actionIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            // Traverse up to find the row (tr) and then find the file name cell
            const fileNameCell = e.target.closest('tr').querySelector('[data-label="File Name"]');
            const fileName = fileNameCell ? fileNameCell.textContent.trim() : 'Unknown file';
            
            if (icon.classList.contains('fa-eye')) {
                console.log(`Action: Viewing file ${fileName}.`);
            } else if (icon.classList.contains('fa-download')) {
                console.log(`Action: Downloading file ${fileName}.`);
            }
        });
    });

    // 3. Search Bar Focus Effect (For header search bar)
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