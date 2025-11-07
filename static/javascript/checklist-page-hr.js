const menuButton = document.querySelector(".main-header__menu-btn");
const sidebar = document.querySelector(".sidebar");

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


const API_URL = "/api/checklists"; // <-- backend will replace this

// Table body element
const tableBody = document.getElementById("employee-table-body");

// Fetch checklist templates from backend
async function loadChecklists() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!Array.isArray(data)) return;

        renderTable(data);
    } catch (error) {
        console.error("Error loading checklists:", error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;color:#a00;">
                    Failed to load data
                </td>
            </tr>
        `;
    }
}

function renderTable(checklists) {
    tableBody.innerHTML = "";

    checklists.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.templateName}</td>
            <td>${item.department}</td>
            <td>${item.tasksCount}</td>
            <td>${item.assignedCount}</td>
            <td>
                <button class="action-btn view" data-id="${item.id}">View</button>
                <button class="action-btn edit" data-id="${item.id}">Edit</button>
                <button class="action-btn delete" data-id="${item.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    attachActionEvents();
}

// Handle action buttons 
function attachActionEvents() {
    document.querySelectorAll(".action-btn.view").forEach(btn =>
        btn.addEventListener("click", e => {
            const id = e.target.dataset.id;
            console.log("View checklist:", id);
            // Backend route can open details page
            window.location.href = `/checklist/${id}`;
        })
    );

    document.querySelectorAll(".action-btn.edit").forEach(btn =>
        btn.addEventListener("click", e => {
            const id = e.target.dataset.id;
            console.log("Edit checklist:", id);
            window.location.href = `/checklist/edit/${id}`;
        })
    );

    document.querySelectorAll(".action-btn.delete").forEach(btn =>
        btn.addEventListener("click", async e => {
            const id = e.target.dataset.id;
            if (confirm("Are you sure you want to delete this template?")) {
                await deleteChecklist(id);
            }
        })
    );
}

async function deleteChecklist(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (response.ok) {
            loadChecklists();
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
}

// Load data on page load
document.addEventListener("DOMContentLoaded", loadChecklists);

const tabs = document.querySelectorAll(".templates__tab");

tabs.forEach(tab => {
  tab.addEventListener("click", async () => {
    tabs.forEach(t => t.classList.remove("templates__tab--active"));
    tab.classList.add("templates__tab--active");

    const filter = tab.dataset.tab;
    
    // Later when backend supports filters you will call API like:
    // loadChecklists(filter);

    console.log("Filter selected:", filter);
  });
});

// Handle "+ New Template" button (no page change)
const newTemplateBtn = document.querySelector(".btn--primary");

if (newTemplateBtn) {
  newTemplateBtn.addEventListener("click", () => {
    window.location.href = "hr-page-checklist-template.html";
    // Later you can show a modal or form here instead of alert
  });
}


// Search functionality
const searchInput = document.querySelector(".main-header__search-input");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    // Select all rows inside the checklist table (excluding header)
    const rows = document.querySelectorAll(".templates__row:not(.templates__row--head)");

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      // Show row only if it contains the search term
      row.style.display = text.includes(query) ? "" : "none";
    });
  });
}


