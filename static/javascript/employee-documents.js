// employee-documents.js

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-upload");
    const chooseFileBtn = document.querySelector(".choose-file-btn");
    const uploadText = document.querySelector(".dropzone-text");
    const tableBody = document.getElementById("docsTableBody");
    const emptyStateRow = document.getElementById("emptyStateRow");
    const allDocsButton = document.querySelector(".filter-dropdown"); // “All Documents” section

    // Your live API endpoints
    const API_UPLOAD_URL = "https://smartstart-backend-8afq.onrender.com/api/upload";
    const API_GET_ALL_URL = "https://smartstart-backend-8afq.onrender.com/api/documents";

    // Trigger hidden file input
    chooseFileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });

    // Upload files to backend
    fileInput.addEventListener("change", async (event) => {
        const files = event.target.files;
        if (files.length === 0) {
            uploadText.textContent = "No file selected.";
            return;
        }

        // Remove empty message
        if (emptyStateRow) emptyStateRow.remove();
        uploadText.textContent = "Uploading...";

        for (let file of files) {
            const formData = new FormData();
            formData.append("document", file);

            try {
                const response = await fetch(API_UPLOAD_URL, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Upload failed");
                const data = await response.json();

                // Add file to table
                addFileRow({
                    type: data.type || "Uploaded File",
                    name: data.fileName || file.name,
                    size: (file.size / 1024 / 1024).toFixed(2) + " MB",
                    uploaded: "Just now",
                    status: "Pending Review",
                });

                uploadText.textContent = "Upload successful";

            } catch (err) {
                console.error(err);
                uploadText.textContent = "Upload failed ❌. Please try again.";
            }
        }
    });

    // Load all documents when “All Documents” button is clicked
    allDocsButton.addEventListener("click", async () => {
        try {
            // Optional: show loading indicator
            allDocsButton.querySelector("span").textContent = "Loading...";

            const response = await fetch(API_GET_ALL_URL);
            if (!response.ok) throw new Error("Failed to load documents");

            const documents = await response.json();

            // Clear current rows
            tableBody.innerHTML = "";

            if (!documents || documents.length === 0) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td colspan="6" style="text-align: center; color: #888; padding: 20px;">
                        No documents found.
                    </td>
                `;
                tableBody.appendChild(row);
            } else {
                documents.forEach((doc) => {
                    addFileRow({
                        type: doc.type || "N/A",
                        name: doc.fileName,
                        size: formatFileSize(doc.size),
                        uploaded: formatTimeAgo(doc.uploadedAt),
                        status: doc.status || "Pending Review",
                    });
                });
            }

            allDocsButton.querySelector("span").textContent = "All Documents";

        } catch (error) {
            console.error("Error fetching documents:", error);
            allDocsButton.querySelector("span").textContent = "All Documents";
            alert("Failed to fetch documents. Please try again.");
        }
    });

    // Helper: Add new document row
    function addFileRow(fileData) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${fileData.type}</td>
            <td><i class="fas fa-file-pdf pdf-icon"></i> ${fileData.name}</td>
            <td>${fileData.size}</td>
            <td>${fileData.uploaded}</td>
            <td><span class="status-badge ${fileData.status.toLowerCase().replace(" ", "-")}">
                ${fileData.status}
            </span></td>
            <td class="actions-cell">
                <i class="fas fa-eye view-icon"></i>
                <i class="fas fa-download download-icon"></i>
            </td>
        `;
        tableBody.prepend(row);
    }

    // Helper: File size formatting
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
    }

    //Helper: Convert timestamp to "time ago"
    function formatTimeAgo(timestamp) {
        if (!timestamp) return "Unknown";
        const diff = Date.now() - new Date(timestamp).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
});
// LOGOUT HANDLER
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector(".logout-btn");

    // Replace this with your backend logout endpoint if you have one
    const LOGOUT_API_URL = "https://smartstart-backend-8afq.onrender.com/api/logout";

    logoutBtn.addEventListener("click", async () => {
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
            // Optional: if your backend has a logout API
            await fetch(LOGOUT_API_URL, {
                method: "POST",
                credentials: "include" // sends cookies if session-based
            }).catch(() => {});

            // Clear any locally stored tokens or session data
            localStorage.removeItem("authToken");
            sessionStorage.clear();

            // Redirect to login page
            window.location.href = "login.html";

        } catch (error) {
            console.error("Logout failed:", error);
            alert("Something went wrong while logging out. Please try again.");
        }
    });
});
