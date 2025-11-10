// =============================
// SIGN-UP + VERIFICATION + FETCH API
// =============================
document.addEventListener("DOMContentLoaded", () => {
  // ---- Elements ----
  const adminRadio = document.querySelector('input[value="Admin"]');
  const employeeRadio = document.querySelector('input[value="Employee"]');
  const companyField = document.querySelectorAll(".input-field")[1]; // Company
  const roleField = document.querySelectorAll(".input-field")[2]; // Role
  const signupForm = document.getElementById("signupForm");
  const signupBtn = document.querySelector(".signup-btn");
  const googleLink = document.querySelector('[data-route="google.email"]');
  const loginLink = document.querySelector(".login");

  const activateBtn = document.querySelector(".primary-btn"); // On verification page
  const emailSpan = document.querySelector("p span");

  const API_BASE_URL = "https://smartstart-backend-2.onrender.com"; // Replace with your backend

  // ---- Role Selection ----
  adminRadio?.addEventListener("change", () => {
    if (adminRadio.checked) employeeRadio.checked = false;
    companyField.style.display = "block";
    roleField.style.display = "block";
  });

  employeeRadio?.addEventListener("change", () => {
    if (employeeRadio.checked) adminRadio.checked = false;
    companyField.style.display = "none";
    roleField.style.display = "none";
  });

  // ---- Sign-Up Form Submission ----
  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedRole = adminRadio.checked ? "Admin" : employeeRadio.checked ? "Employee" : null;
    const email = document.getElementById("email").value.trim();
    const password = document.querySelectorAll("#password")[0]?.value.trim();
    const confirmPassword = document.getElementById("confirmPassword")?.value.trim();

    if (!selectedRole) return alert("Please select Admin or Employee");
    if (password !== confirmPassword) return alert("Passwords do not match");

    const payload = {
      email,
      password,
      role: selectedRole,
      company: selectedRole === "Admin" ? companyField.querySelector("input")?.value.trim() : "",
      position: selectedRole === "Admin" ? roleField.querySelector("input")?.value.trim() : "",
    };

    signupBtn.disabled = true;
    signupBtn.textContent = "Processing...";

    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Store pending user for verification page
        localStorage.setItem("pendingUser", JSON.stringify(payload));

        alert("Signup successful! Check your email to activate your account.");

        // Redirect to verification page
        window.location.href = "/sign-up-verification.html";
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Unable to connect to server. Try again later.");
    } finally {
      signupBtn.disabled = false;
      signupBtn.textContent = "Sign Up";
    }
  });

  // ---- Google signup ----
  googleLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `${API_BASE_URL}/auth/google`;
  });

  // ---- Login link ----
  loginLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/login.html";
  });

  // ---- Verification Page ----
  if (activateBtn && emailSpan) {
    const pendingUser = JSON.parse(localStorage.getItem("pendingUser"));
    if (pendingUser) emailSpan.textContent = pendingUser.email;

    activateBtn.addEventListener("click", async () => {
      if (!pendingUser) return alert("No pending user found. Please sign up first.");

      try {
        const response = await fetch(`${API_BASE_URL}/activate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: pendingUser.email }),
        });

        if (response.ok) {
          // Save user as logged in
          localStorage.setItem("smartstartUser", JSON.stringify(pendingUser));
          localStorage.removeItem("pendingUser");

          // Redirect to role-based profile
          if (pendingUser.role === "Admin") window.location.href = "/profile-hr.html";
          else window.location.href = "/profile-employee.html";
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Activation failed.");
        }
      } catch (err) {
        console.error("Activation error:", err);
        alert("Unable to activate user. Try again later.");
      }
    });
  }

  // ---- Default visibility ----
  if (companyField) companyField.style.display = "block";
  if (roleField) roleField.style.display = "block";
});
