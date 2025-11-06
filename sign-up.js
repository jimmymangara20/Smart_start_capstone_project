document.addEventListener("DOMContentLoaded", () => {
  const adminRadio = document.querySelector('input[value="Admin"]');
  const employeeRadio = document.querySelector('input[value="Employee"]');
  const companyField = document.querySelectorAll(".input-field")[1]; // Company
  const roleField = document.querySelectorAll(".input-field")[2]; // Role
  const signupForm = document.getElementById("signupForm");
  const signupBtn = document.querySelector(".signup-btn");
  const googleLink = document.querySelector('[data-route="google.email"]');
  const loginLink = document.querySelector(".login");

  // Ensure only one radio stays checked at a time
  adminRadio.addEventListener("change", () => {
    if (adminRadio.checked) employeeRadio.checked = false;
    companyField.style.display = "block";
    roleField.style.display = "block";
  });

  employeeRadio.addEventListener("change", () => {
    if (employeeRadio.checked) adminRadio.checked = false;
    // Hide company and role fields for employees
    companyField.style.display = "none";
    roleField.style.display = "none";
  });

  // Handle form submission
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedRole = adminRadio.checked ? "Admin" : "Employee";
    const email = document.getElementById("email").value.trim();
    const password = document.querySelectorAll("#password")[0]?.value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!selectedRole) {
      alert("Please select Admin or Employee");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email,
      password,
      role: selectedRole,
      company: selectedRole === "Admin" ? companyField.querySelector("input").value.trim() : "",
      position: selectedRole === "Admin" ? roleField.querySelector("input").value.trim() : "",
    };

    // Disable button while processing
    signupBtn.disabled = true;
    signupBtn.textContent = "Processing...";

    try {
      // Replace this with your actual backend endpoint
      const response = await fetch("https://your-backend-api.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Signup successful!");

        // Redirect based on user type
        if (selectedRole === "Admin") {
          window.location.href = "/admin-profile.html"; // Admin route
        } else {
          window.location.href = "/employee-profile.html"; // Employee route
        }
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

  // Google signup
  googleLink.addEventListener("click", (e) => {
    e.preventDefault();
    // Replace this with your backend Google Auth route
    window.location.href = "https://your-backend-api.com/auth/google";
  });

  // "Already have an account" → login page
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/login.html";
  });

  // Default visibility
  companyField.style.display = "block";
  roleField.style.display = "block";
});
