document.addEventListener("DOMContentLoaded", () => {
  // --- Elements ---
  const adminRadio = document.querySelector('input[value="Admin"]');
  const employeeRadio = document.querySelector('input[value="Employee"]');
  const inputFields = document.querySelectorAll(".input-field");
  const companyField = inputFields[1]; // Company
  const roleField = inputFields[2];    // Role
  const signupForm = document.getElementById("signupForm");
  const signupBtn = document.querySelector(".signup-btn");
  const googleLink = document.querySelector('[data-route="google.email"]');
  const loginLink = document.querySelector(".login");

  const API_BASE_URL = "https://your-backend-api.com"; // Replace with your backend

  // --- Show/Hide fields based on role ---
  adminRadio?.addEventListener("change", () => {
    employeeRadio.checked = false;
    companyField.style.display = "block";
    roleField.style.display = "block";
  });

  employeeRadio?.addEventListener("change", () => {
    adminRadio.checked = false;
    companyField.style.display = "none";
    roleField.style.display = "none";
  });

  // --- Signup form submission ---
  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedRole = adminRadio.checked ? "Admin" : employeeRadio.checked ? "Employee" : null;
    if (!selectedRole) return alert("Please select Admin or Employee");

    const email = document.getElementById("email").value.trim();
    const password = inputFields[3].querySelector("input").value.trim();
    const confirmPassword = inputFields[4].querySelector("input").value.trim();

    if (password !== confirmPassword) return alert("Passwords do not match");

    const payload = {
      email,
      password,
      role: selectedRole,
      company: selectedRole === "Admin" ? companyField.querySelector("input").value.trim() : "",
      position: selectedRole === "Admin" ? roleField.querySelector("input").value.trim() : "",
    };

    signupBtn.disabled = true;
    signupBtn.textContent = "Processing...";

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Signup successful! Check the verification page.");

        // Store pending user for verification routing
        localStorage.setItem("pendingUser", JSON.stringify(payload));

        // Redirect to verification page
        window.location.href = "/signup-verification.html";
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Unable to connect to server. Try again later.");
    } finally {
      signupBtn.disabled = false;
      signupBtn.textContent = "Sign Up";
    }
  });

  // --- Google signup ---
  googleLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `${API_BASE_URL}/auth/google`;
  });

  // --- Already have an account (login) ---
  loginLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/login.html";
  });

  // --- Default visibility ---
  companyField.style.display = "block";
  roleField.style.display = "block";
});
