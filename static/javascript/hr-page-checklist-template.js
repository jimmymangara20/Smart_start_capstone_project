// ====== ELEMENTS ======
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const uploadCheckbox = document.getElementById("uploadRequired");
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logoutBtn");
const formTitle = document.getElementById("formTitle");
const formDesc = document.getElementById("formDesc");

// ====== BACKEND URL ======
const BASE_URL = "https://smartstart-backend-2.onrender.com/api"; // <--- Replace with your actual backend

// ====== STATE ======
let checklistId = null; // Backend will return this when checklist is created
let tasks = [];

// ====== TAB SWITCHING ======
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    tabContents.forEach((content) => content.classList.add("hidden"));
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

// ====== LOAD EXISTING CHECKLISTS ======
async function loadChecklist() {
  try {
    const res = await fetch(`${BASE_URL}/checklists`);
    if (!res.ok) throw new Error("Failed to load checklist");
    const data = await res.json();

    if (data.length > 0) {
      const latest = data[data.length - 1];
      checklistId = latest.id;
      formTitle.textContent = latest.title;
      formDesc.textContent = latest.description;
      tasks = latest.tasks || [];
      renderTasks();
    }
  } catch (error) {
    console.error("Error loading checklist:", error);
  }
}

// ====== ADD TASK LOCALLY & SEND TO BACKEND ======
addTaskBtn.addEventListener("click", async () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task.");

  const newTask = {
    text: taskText,
    uploadRequired: uploadCheckbox.checked,
  };

  // Save task in backend
  try {
    const res = await fetch(`${BASE_URL}/checklists/${checklistId || "new"}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (!res.ok) throw new Error("Failed to save task");

    const savedTask = await res.json();
    tasks.push(savedTask);
    renderTasks();

    taskInput.value = "";
    uploadCheckbox.checked = false;
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Could not save task. Please check backend connection.");
  }
});

// ====== RENDER TASKS ======
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text} ${task.uploadRequired ? "(Upload Required)" : ""}</span>
      <button class="remove-btn" data-id="${task.id}">✖</button>
    `;
    taskList.appendChild(li);
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskId = e.target.dataset.id;
      deleteTask(taskId);
    });
  });
}

// ====== DELETE TASK ======
async function deleteTask(taskId) {
  try {
    const res = await fetch(`${BASE_URL}/checklists/${checklistId}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete task");

    tasks = tasks.filter((t) => t.id !== taskId);
    renderTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// ====== AUTO-SAVE FORM TITLE AND DESCRIPTION ======
formTitle.addEventListener("blur", saveChecklist);
formDesc.addEventListener("blur", saveChecklist);

async function saveChecklist() {
  const payload = {
    title: formTitle.textContent.trim(),
    description: formDesc.textContent.trim(),
  };

  try {
    let res;
    if (!checklistId) {
      res = await fetch(`${BASE_URL}/checklists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch(`${BASE_URL}/checklists/${checklistId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    if (!res.ok) throw new Error("Failed to save checklist");
    const data = await res.json();
    checklistId = data.id;
    console.log("Checklist saved:", data);
  } catch (error) {
    console.error("Error saving checklist:", error);
  }
}

// ====== LOGOUT ======
logoutBtn.addEventListener("click", () => {
  alert("You have been logged out.");
  window.location.href = "login.html"; // Change this to your actual login route
});

// ====== INITIALIZE ======
loadChecklist();
