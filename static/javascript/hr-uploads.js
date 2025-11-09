// hr-uploads.js

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("docsTableBody");
    const emptyStateRow = document.getElementById("emptyStateRow");

    const API_GET_ALL_URL = "https://smartstart-backend-8afq.onrender.com/api/documents";
    const API_DOWNLOAD_URL = "https://smartstart-backend-8afq.onrender.com/api/download/"; // append file ID

    // Fetch all uploaded documents
    async function fetchAllDocuments() {
        try {
            const response = await fetch(API_GET_ALL_URL);
            if (!response.ok) throw new Error("Failed to load documents");
            const documents = await response.json();

            tableBody.innerHTML = "";

            if (!documents || documents.length === 0) {
                const row = document.createElement("tr");
                row.id = "emptyStateRow";
                row.innerHTML = `
                    <td colspan="6" style="text-align:center;color:#888;padding:20px;">
                        No documents uploaded yet.
                    </td>
                `;
                tableBody.appendChild(row);
                return;
            }

            documents.forEach((doc) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="employee-name">${doc.employeeName || "N/A"}</td>
                    <td>${doc.docType || "N/A"}</td>
                    <td>${doc.fileName}</td>
                    <td>${formatDate(doc.uploadedAt)}</td>
                    <td><span class="status-badge ${doc.status?.toLowerCase() || "pending"}">${doc.status || "Pending"}</span></td>
                    <td class="actions-cell">
                        <i class="fas fa-eye view-icon" data-file="${doc.fileUrl}"></i>
                        <i class="fas fa-download download-icon" data-file="${doc.fileUrl}"></i>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    }

    // View or Download file actions
    tableBody.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("view-icon")) {
            const fileUrl = target.getAttribute("data-file");
            if (fileUrl) window.open(fileUrl, "_blank");
        }
        if (target.classList.contains("download-icon")) {
            const fileUrl = target.getAttribute("data-file");
            if (fileUrl) window.open(API_DOWNLOAD_URL + fileUrl, "_blank");
        }
    });

    // Helper for date formatting
    function formatDate(timestamp) {
        if (!timestamp) return "Unknown";
        return new Date(timestamp).toLocaleDateString();
    }

    // Load documents on page load
    fetchAllDocuments();
});
