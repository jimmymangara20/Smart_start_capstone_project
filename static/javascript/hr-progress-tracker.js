const API_BASE = "https://smartstart-backend-8afq.onrender.com";
const tableBody = document.getElementById("employee-rows");

let currentPage = 1;
const perPage = 10;

async function loadProgressData() {
    try {
        const res = await fetch(`${API_BASE}/api/employees`);
        const employees = await res.json();

        renderSummary(employees);
        renderTable(employees);

    } catch (error) {
        console.error("Error loading data:", error);
        alert("Could not load employee progress.");
    }
}

function renderSummary(data) {
    document.getElementById("total-count").textContent = data.length;
    document.getElementById("completed-count").textContent = data.filter(e => e.status === "Completed").length;
    document.getElementById("ontrack-count").textContent = data.filter(e => e.status === "On Track").length;
    document.getElementById("atrisk-count").textContent = data.filter(e => e.status === "At Risk").length;
    document.getElementById("delayed-count").textContent = data.filter(e => e.status === "Delayed").length;

    document.getElementById("alert-text").textContent =
        `${data.filter(e => e.status === "Delayed" || e.status === "At Risk").length} employees need attention`;
}

function renderTable(data) {
    const start = (currentPage - 1) * perPage;
    const paginated = data.slice(start, start + perPage);

    tableBody.innerHTML = paginated.map(emp => `
        <tr>
            <td>
                <img src="${emp.avatar}" style="width:35px;border-radius:50%;"> 
                <strong>${emp.name}</strong><br>
                <small>${emp.role}</small>
            </td>
            <td>${emp.startDate}</td>

            <td>
                <div class="progress-bar"><div class="progress-fill" style="width: ${emp.progress}%"></div></div>
                ${emp.progress}%
            </td>

            <td>${emp.completedTasks} / ${emp.totalTasks}</td>

            <td>
                <span class="status-dot ${statusClass(emp.status)}"></span> ${emp.status}
            </td>
        </tr>
    `).join('');
}

function statusClass(status) {
    return {
        "Completed": "status-completed",
        "On Track": "status-ontrack",
        "At Risk": "status-atrisk",
        "Delayed": "status-delayed"
    }[status];
}

document.addEventListener("DOMContentLoaded", loadProgressData);
