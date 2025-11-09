const BASE_URL = "https://smartstart-backend-8afq.onrender.com/api"; // Replace with your real backend URL

document.addEventListener("DOMContentLoaded", () => {
  loadDocuments();

  // Hover effect on cards
  const statusCards = document.querySelectorAll(".status-card");
  statusCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.querySelector(".card-icon-status").style.opacity = "0.3";
    });
    card.addEventListener("mouseleave", () => {
      card.querySelector(".card-icon-status").style.opacity = "0.1";
    });
  });

  // Filter placeholder
  const filterDropdown = document.querySelector(".filter-dropdown");
  filterDropdown.addEventListener("click", () => {
    console.log("Filter dropdown clicked — future: show filter options.");
  });
});

// Load all uploaded documents from backend
async function loadDocuments() {
  try {
    const response = await fetch(`${BASE_URL}/documents`);
    const documents = await response.json();

    const tbody = document.getElementById("documentsTableBody");
    tbody.innerHTML = "";

    let pending = 0, approved = 0;

    documents.forEach(doc => {
      if (doc.status === "Pending Review") pending++;
      if (doc.status === "Approved") approved++;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <span class="employee-name">${doc.employee_name}</span><br>
          <span class="employee-email">${doc.employee_email}</span>
        </td>
        <td>${doc.document_type}</td>
        <td><i class="fas fa-file-pdf pdf-icon"></i> ${doc.file_name}</td>
        <td>${formatFileSize(doc.size)}</td>
        <td>${timeAgo(doc.uploaded_at)}</td>
        <td><span class="status-badge ${doc.status === "Approved" ? "approved" : "pending"}">${doc.status}</span></td>
        <td class="actions-cell">
          <i class="fas fa-eye view-icon clickable" onclick="viewDocument('${doc.id}')"></i>
          <i class="fas fa-download download-icon clickable" onclick="downloadDocument('${doc.id}')"></i>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("approvedCount").textContent = approved;
    document.getElementById("totalCount").textContent = documents.length;

  } catch (error) {
    console.error("Error loading documents:", error);
  }
}

function viewDocument(id) {
  window.open(`${BASE_URL}/documents/${id}/view`, "_blank");
}

function downloadDocument(id) {
  window.location.href = `${BASE_URL}/documents/${id}/download`;
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}
