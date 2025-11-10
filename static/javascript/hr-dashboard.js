const API = "https://smartstart-backend-2.onrender.com";

const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");
const progressCount = document.getElementById("progress-count");
const overdueCount = document.getElementById("overdue-count");
const tableBody = document.getElementById("recent-employees-body");

async function loadDashboard() {
    try {
        const res = await fetch(`${API}/api/employees`);
        const employees = await res.json();

        // Stats
        activeCount.textContent = employees.length;
        completedCount.textContent = employees.filter(e => e.status === "Completed").length;
        progressCount.textContent = employees.filter(e => e.status === "In Progress").length;
        overdueCount.textContent = employees.filter(e => e.status === "Overdue").length;

        // Recent employees (limit 4)
        tableBody.innerHTML = employees.slice(0, 4)
        .map(e => `
            <tr>
              <td><strong>${e.firstName} ${e.lastName}</strong></td>
              <td>${e.role}</td>
              <td>${e.startDate}</td>
              <td><div class="bar"><div style="width:${e.progress}%"></div></div></td>
              <td><span class="status ${e.status.replace(" ", "").toLowerCase()}">${e.status}</span></td>
            </tr>
        `).join("");

        drawChart();

    } catch(err) { console.log("Dashboard load failed", err); }
}

function drawChart() {
    const ctx = document.getElementById("onboardChart");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Profile Setup","Document Upload","Onboarding Form","Workspace Access","Meet Team","First week Checklist"],
            datasets: [{
                data: [19, 12, 15, 8, 17, 10]
            }]
        }
    });
}

document.addEventListener("DOMContentLoaded", loadDashboard);
