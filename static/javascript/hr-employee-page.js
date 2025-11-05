const API_URL = "/api/employees"; // backend endpoint

let employees = [];
let currentPage = 1;
let rowsPerPage = 10;

async function loadEmployees() {
  try {
    const res = await fetch(API_URL);
    employees = await res.json();
    renderTable();
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function renderTable() {
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";

  let start = (currentPage - 1) * rowsPerPage;
  let paginated = employees.slice(start, start + rowsPerPage);

  paginated.forEach(emp => {
    tableBody.innerHTML += `
      <tr>
        <td>
          <strong>${emp.name}</strong><br>
          <small>${emp.email}</small>
        </td>
        <td>${emp.id}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>${emp.joinDate}</td>
        <td><span class="tag tag--${emp.contractClass}">${emp.contract}</span></td>
        <td><button class="action-btn">⋮</button></td>
      </tr>
    `;
  });

  document.getElementById("empCount").textContent = employees.length;
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  employees = employees.filter(emp =>
    emp.name.toLowerCase().includes(query) ||
    emp.id.toLowerCase().includes(query)
  );
  renderTable();
});

loadEmployees();
