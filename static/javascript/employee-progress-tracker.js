// employee-progress-tracker.js

const API_BASE_URL = "https://smartstart-backend-8afq.onrender.com/api/progress";

document.addEventListener("DOMContentLoaded", () => {
    loadProgressData();

    // Sidebar toggle (mobile)
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-collapsed');
        });
    }
});

async function loadProgressData() {
    try {
        const token = localStorage.getItem("authToken");

        const response = await fetch(`${API_BASE_URL}/employee/progress`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Progress Data:", data);

        renderMilestones(data.milestones || []);
        renderNextUp(data.nextTask || null);

    } catch (error) {
        console.error("Error loading progress:", error);
    }
}

function renderMilestones(milestones = []) {
    const list = document.querySelector(".milestone-list");
    if (!list) return;
    list.innerHTML = "";

    milestones.forEach((m, i) => {
        const item = document.createElement("li");
        item.className = `milestone-item ${m.completed ? "completed" : "pending"}`;
        item.setAttribute("data-date", m.date || "");

        item.innerHTML = `
            <div class="milestone-icon">
                ${m.completed ? `<i class="fas fa-check-circle"></i>` : i + 1}
            </div>
            <div class="milestone-content">
                <p class="title">${m.title || "Untitled Milestone"}</p>
            </div>
        `;

        list.appendChild(item);
    });
}

function renderNextUp(task) {
    const container = document.querySelector(".next-up-card");
    if (!container) return;

    if (!task) {
        container.innerHTML = `<p>No upcoming tasks.</p>`;
        return;
    }

    container.innerHTML = `
        <div class="card-icon"><i class="fas fa-exclamation-circle"></i></div>
        <div class="card-content">
            <p class="title">${task.title || "Untitled Task"}</p>
            <p class="description">${task.description || ""}</p>
        </div>
    `;

    // Optional: Make card clickable
    container.style.cursor = "pointer";
    container.addEventListener('click', () => {
        // Replace with your route logic
        alert(`Next Up Task: ${task.title}`);
        // window.location.href = `/task/${task.id}`;
    });
}
