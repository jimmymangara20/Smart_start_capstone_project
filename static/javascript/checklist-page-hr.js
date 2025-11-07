const API = "https://smartstart-backend-8afq.onrender.com";
const templateRows = document.getElementById("template-rows");

let allTemplates = [];

async function fetchTemplates() {
    try {
        const response = await fetch(`${API}/api/templates`);
        allTemplates = await response.json();
        updateSummary();
        renderTable(allTemplates);
    } catch (err) {
        console.log("Error loading templates", err);
    }
}

function updateSummary() {
    document.getElementById("total-templates").innerText = allTemplates.length;
    document.getElementById("active-templates").innerText = allTemplates.filter(t => t.status === "Active").length;
    document.getElementById("total-tasks").innerText = allTemplates.reduce((sum, t) => sum + t.tasks, 0);
    document.getElementById("total-using").innerText = allTemplates.reduce((sum, t) => sum + t.assignedEmployees, 0);
}

function renderTable(data) {
    templateRows.innerHTML = data.map(t => `
        <tr>
            <td><strong>${t.name}</strong><br><small>${t.description}</small></td>
            <td>${t.department}</td>
            <td>${t.tasks}</td>
            <td>${t.assignedEmployees} employees</td>
            <td><span class="status ${t.status === "Active" ? "active-status" : "inactive-status"}">${t.status}</span></td>
            <td class="actions">...</td>
        </tr>
    `).join("");
}

document.addEventListener("DOMContentLoaded", fetchTemplates);
