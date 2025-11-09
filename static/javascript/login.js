// ==========================
// SMARTSTART LOGIN PAGE
// ==========================

// Base API URL
const API_BASE = "https://smartstart-backend-8afq.onrender.com/api/auth";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const keepLoggedIn = document.getElementById("keep");
  const googleLoginBtn = document.querySelector(".google-login");
  const forgotPasswordLink = document.querySelector(".forgot-password");

  // ======================
  // LOGIN FORM SUBMISSION
  // ======================
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token and HR ID in localStorage (or sessionStorage)
        if (keepLoggedIn.checked) {
          localStorage.setItem("jwtToken", result.token);
          localStorage.setItem("hrId", result.user.id);
        } else {
          sessionStorage.setItem("jwtToken", result.token);
          sessionStorage.setItem("hrId", result.user.id);
        }

        alert("Login successful! Redirecting...");

        // Redirect based on role (HR or Employee)
        if (result.user.role === "HR") {
          window.location.href = "hr-profile.html";
        } else if (result.user.role === "Employee") {
          window.location.href = "events-page-employee.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        alert("Login failed: " + (result.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("⚠ Login error:", err);
      alert("Error connecting to the server. Please try again.");
    }
  });

  // ======================
  // GOOGLE LOGIN HANDLER
  // ======================
  googleLoginBtn.addEventListener("click", () => {
    alert(" Google login integration coming soon!");
    // Example placeholder — replace with real OAuth link:
    // window.location.href = `${API_BASE}/google-auth`;
  });

  // ======================
  // FORGOT PASSWORD
  // ======================
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = prompt("Enter your email to reset your password:");
    if (email) {
      fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Reset link sent! Check your email inbox.");
          } else {
            alert("⚠ Could not send reset link. Please check your email.");
          }
        })
        .catch(() => alert("⚠ Server error. Try again later."));
    }
  });
});
