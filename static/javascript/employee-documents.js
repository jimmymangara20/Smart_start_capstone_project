// employee-documents.js

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-upload");
    const chooseFileBtn = document.querySelector(".choose-file-btn");
    const uploadText = document.querySelector(".dropzone-text");
    const tableBody = document.getElementById("docsTableBody");
    const emptyStateRow = document.getElementById("emptyStateRow");
    const allDocsButton = document.querySelector(".filter-dropdown"); // “All Documents” section

    const sidebarToggleBtn = document.querySelector(".sidebar-toggle");
    const dashboardContainer = document.querySelector(".dashboard-container");
    const logoutBtn = document.querySelector(".logout-btn");

    // API endpoints
    const API_UPLOAD_URL = "https://smartstart-backend-8afq.onrender.com/api/upload";
    const API_GET_ALL_URL = "https://smartstart-backend-8afq.onrender.com/api/documents";
    const LOGOUT_API_URL = "https://smartstart-backend-8afq.onrender.com/api/logout";

    /* ---------------- Sidebar Toggle ---------------- */
    sidebarToggleBtn?.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            // Slide in/out sidebar on mobile
            dashboardContainer.classList.toggle("show-sidebar");
        } else {
            // Collapse sidebar on tablet/desktop
            dashboardContainer.classList.toggle("sidebar-collapsed");
        }
    });

    /* ---------------- File Upload ---------------- */
    chooseFileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener("change", async (event) => {
        const files = event.target.files;
        if (!files.length) {
            uploadText.textContent = "No file selected.";
            return;
        }

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

                addFileRow({
                    type: data.type || "Uploaded File",
                    name: data.fileName || file.name,
                    size: formatFileSize(file.size),
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

    /* ---------------- Load All Documents ---------------- */
    allDocsButton?.addEventListener("click", async () => {
        try {
            allDocsButton.querySelector("span").textContent = "Loading...";

            const response = await fetch(API_GET_ALL_URL);
            if (!response.ok) throw new Error("Failed to load documents");

            const documents = await response.json();
            tableBody.innerHTML = "";

            if (!documents || documents.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align:center; color:#888; padding:20px;">
                            No documents found.
                        </td>
                    </tr>
                `;
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

    /* ---------------- Logout ---------------- */
    logoutBtn?.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to log out?")) return;

        try {
            await fetch(LOGOUT_API_URL, { method: "POST", credentials: "include" }).catch(() => {});
            localStorage.removeItem("authToken");
            sessionStorage.clear();
            window.location.href = "login.html";
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Something went wrong while logging out. Please try again.");
        }
    });

    /* ---------------- Helper Functions ---------------- */
    function addFileRow(fileData) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${fileData.type}</td>
            <td><i class="fas fa-file-pdf pdf-icon"></i> ${fileData.name}</td>
            <td>${fileData.size}</td>
            <td>${fileData.uploaded}</td>
            <td><span class="status-badge ${fileData.status.toLowerCase().replace(/\s+/g, "-")}">
                ${fileData.status}
            </span></td>
            <td class="actions-cell">
                <i class="fas fa-eye view-icon"></i>
                <i class="fas fa-download download-icon"></i>
            </td>
        `;
        tableBody.prepend(row);
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
    }

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
