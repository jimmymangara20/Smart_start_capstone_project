// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
});

// ---Main Dashboard Setup ---
async function initDashboard() {
  try {
    // When backend is ready, replace the mock with:
    // const data = await fetchDataFromAPI('/api/employee/dashboard');
    const data = getMockDashboardData();

    renderUserInfo(data.user);
    renderDocuments(data.documents);
    renderTasksAssigned(data.tasks);
    renderTaskProgress(data.tasks);
    updateTaskCompletion(data.tasks);
    updateCurrentDate();
  } catch (err) {
    console.error("Error initializing dashboard:", err);
  }

  setupEventListeners();
}

// ---Mock Data (until API is connected) ---
function getMockDashboardData() {
  return {
    user: {
      name: "Daniel Owoni",
      title: "Software Engineer",
      photo: "static/assets/user-avatar.png"
    },
    documents: [
      { filename: "Daniel Resume.pdf" },
      { filename: "Daniel Cover Letter.pdf" },
      { filename: "Daniel Original Certificate.pdf" },
      { filename: "Daniel Reference Letter.pdf" }
    ],
    tasks: [
      { title: "Upload Resume", progress: 100 },
      { title: "Upload Cover Letter", progress: 56 },
      { title: "Upload ID Card", progress: 30 },
      { title: "Upload Original Certificate", progress: 100 },
      { title: "Upload Reference Letter", progress: 95 },
      { title: "Upload Agreement Form", progress: 40 }
    ]
  };
}

// ---Fetch Data from API ---
async function fetchDataFromAPI(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Failed to fetch API data");
  return await response.json();
}

// ---Render Functions ---
function renderUserInfo(user) {
  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-title").textContent = user.title;
  document.getElementById("user-photo").style.backgroundImage = `url('${user.photo}')`;
}

function renderDocuments(docs) {
  const container = document.getElementById("documents-list");
  container.innerHTML = docs.map(d => `<p><i class="fas fa-file-alt"></i> ${d.filename}</p>`).join("");
}

function renderTasksAssigned(tasks) {
  const container = document.getElementById("tasks-assigned-list");
  container.innerHTML = tasks
    .slice(0, 4)
    .map(
      t => `<p><i class="fas fa-tasks"></i> ${t.title}</p>`
    )
    .join("");
}

// ---JS Improvement for Task Progress---
function renderTaskProgress(tasks) {
  const container = document.getElementById("task-progress-body");
  
  // Use a proper table structure (divs can work if styled correctly)
  // Let's create header rows manually for semantic clarity
  const header = `
    <div class="progress-row progress-header">
      <span class="col-task-title">Tasks</span>
      <span class="col-progress-bar">Progress</span>
      <span class="col-status">Status</span>
    </div>
  `;
  
  const bodyRows = tasks
    .map(t => `
      <div class="progress-row">
        <span class="col-task-title"><i class="fas fa-file-alt"></i> ${t.title}</span>
        <div class="progress-bar col-progress-bar">
          <div class="progress-fill" style="width:${t.progress}%;"></div>
        </div>
        <span class="col-status progress-status">${t.progress}%</span>
      </div>
    `)
    .join("");
    
  container.innerHTML = header + bodyRows;
}

// ---Completion Ring ---
function updateTaskCompletion(tasks) {
  const completed = tasks.filter(t => t.progress === 100).length;
  const total = tasks.length;
  const percent = Math.round((completed / total) * 100);

  const ring = document.getElementById("task-completion-ring");
  ring.textContent = `${completed}/${total}`;
  ring.style.background = `conic-gradient(#007bff ${percent}%, #e8efff ${percent}%)`;
}

// --- Current Date ---
function updateCurrentDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };
  document.getElementById("current-date-time").textContent = now.toLocaleString("en-US", options);
}

// ---Event Listeners ---
function setupEventListeners() {
  // Sidebar navigation
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".nav-item").forEach(link => link.classList.remove("active"));
      item.classList.add("active");

      const section = item.dataset.section;
      console.log(`Navigated to section: ${section}`);
      // Future: trigger content loading based on section
    });
  });

  // Logout button
  document.getElementById("logout-btn").addEventListener("click", e => {
    e.preventDefault();
    console.log("Logging out...");
    // Future: Add backend logout request or redirect
  });
}
