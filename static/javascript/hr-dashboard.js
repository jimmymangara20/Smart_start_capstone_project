import Chart from "https://cdn.jsdelivr.net/npm/chart.js";
let employees = [];

async function fetchEmployees() {
  try {
    const res = await fetch("/api/employees"); // Backend endpoint placeholder
    employees = await res.json();
  } catch (error) {
    console.warn("");
    employees = [
      { name: "Aisha Bello", role: "Logistics Specialist", date: "Oct 28, 2025", progress: 0, status: "Not Started" },
      { name: "Ayara Joshua", role: "Product Designer", date: "Oct 28, 2025", progress: 5, status: "In Progress" },
      { name: "Nwarija Chioma", role: "Marketing Manager", date: "Oct 27, 2025", progress: 20, status: "In Progress" },
      { name: "Daniel Owoni", role: "Backend Developer", date: "Oct 20, 2025", progress: 30, status: "In Progress" },
    ];
  }
}

// Routine Data

let routineData = [];

async function fetchRoutine() {
  try {
    const res = await fetch("/api/routine");
    routineData = await res.json();
  } catch {
    console.warn("");
    routineData = [
      "Onboarding formalities in-progress",
      "1:1 session scheduled",
      "Template review",
    ];
  }
}

// Completion Chart Data

let completionData = { labels: [], values: [] };

async function fetchChartData() {
  try {
    const res = await fetch("/api/onboarding/stats");
    const data = await res.json();
    completionData.labels = data.labels;
    completionData.values = data.values;
  } catch {
    console.warn("");
    completionData = {
      labels: ["Doc Upload", "Forms", "Workspace", "Meet Team", "Checklist"],
      values: [10, 7, 12, 15, 9],
    };
  }
}

// Render Functions

function loadEmployees() {
  const tbody = document.getElementById("employee-table-body");

  tbody.innerHTML = employees.map(emp => `
    <tr>
      <td>${emp.name}</td>
      <td>${emp.role}</td>
      <td>${emp.date}</td>
      <td>
        <div class="progress-bar">
          <div class="progress-bar__fill" style="width:${emp.progress}%"></div>
        </div>
      </td>
      <td><span class="status status--${emp.status.replace(/\s+/g, '').toLowerCase()}">${emp.status}</span></td>
    </tr>
  `).join("");
}

function loadRoutine() {
  const ul = document.getElementById("routineList");
  ul.innerHTML = routineData.map(item => `<li class="routine__item">${item}</li>`).join("");
}

function loadCompletionChart() {
  const ctx = document.getElementById("completionChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: completionData.labels,
      datasets: [{
        data: completionData.values,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}

// Mobile Menu & Search Toggle

const menuBtn = document.querySelector(".main-header__menu-btn");
const sidebar = document.querySelector(".sidebar");
const searchBtn = document.querySelector(".main-header__search-icon");
const searchInput = document.querySelector(".main-header__search-input");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--open");
  });
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("show-search");
    searchInput.focus();
  });
}

// Initialize Dashboard
document.addEventListener("DOMContentLoaded", async () => {
  await fetchEmployees();
  await fetchRoutine();
  await fetchChartData();

  loadEmployees();
  loadRoutine();
  loadCompletionChart();
});

