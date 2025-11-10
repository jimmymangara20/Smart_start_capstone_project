const API = "https://smartstart-backend-2.onrender.com";
const tbody = document.getElementById("employee-rows");
const totalCountEl = document.getElementById("total-count");

let employees = [];

async function fetchEmployees() {
    try {
        const res = await fetch(`${API}/api/employees`);
        employees = await res.json();
        totalCountEl.textContent = employees.length;
        renderEmployees(employees);
    } catch (error) {
        console.log("Failed to load employees:", error);
    }
}

function renderEmployees(list) {
    tbody.innerHTML = list.map(emp => `
        <tr>
            <td>
                <img src="${emp.profileImageUrl || 'static/assets/default-user.png'}" class="employee-pic">
                <strong>${emp.firstName} ${emp.lastName}</strong><br>
                <small>${emp.email}</small>
            </td>
            <td>${emp.employeeId}</td>
            <td>• ${emp.department}</td>
            <td>${emp.role}</td>
            <td>${emp.joiningDate}</td>
            <td><span class="contract-tag ${getContractClass(emp.contractType)}">${emp.contractType}</span></td>
            <td class="actions">⋮</td>
        </tr>
    `).join("");
}

function getContractClass(type) {
    return {
        "Full-time": "fulltime",
        "Part-time": "parttime",
        "Freelance": "freelance",
        "Internship": "intern"
    }[type] || "fulltime";
}

document.addEventListener("DOMContentLoaded", fetchEmployees);
