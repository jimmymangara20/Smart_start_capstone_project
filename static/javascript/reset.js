// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reset-form");
  const oldPassword = document.getElementById("old-password");
  const newPassword = document.getElementById("new-password");
  const confirmPassword = document.getElementById("confirm-password");
  const submitBtn = document.querySelector(".submit-btn");

  // Helper: Display a message to user
  const showMessage = (msg, type = "error") => {
    let existing = document.querySelector(".msg");
    if (existing) existing.remove();

    const div = document.createElement("div");
    div.className = `msg ${type}`;
    div.textContent = msg;
    div.style.marginTop = "1rem";
    div.style.padding = "0.7rem 1rem";
    div.style.borderRadius = "5px";
    div.style.textAlign = "center";
    div.style.fontWeight = "500";
    div.style.color = type === "success" ? "#155724" : "#721c24";
    div.style.backgroundColor = type === "success" ? "#d4edda" : "#f8d7da";
    div.style.border = type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb";

    form.appendChild(div);

    setTimeout(() => div.remove(), 5000);
  };

  // Form Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword.value.trim() || !newPassword.value.trim() || !confirmPassword.value.trim()) {
      showMessage("Please fill in all fields");
      return;
    }

    if (newPassword.value.length < 8) {
      showMessage("Password must be at least 8 characters long");
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      showMessage("New passwords do not match");
      return;
    }

    // Disable button while processing
    submitBtn.disabled = true;
    submitBtn.textContent = "Resetting...";

    try {
      // API request to backend
      const response = await fetch("https://smartstart-backend-2.onrender.com/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token") // if using auth
        },
        body: JSON.stringify({
          old_password: oldPassword.value,
          new_password: newPassword.value
        })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Password reset successful!", "success");
        form.reset();
        // Optionally redirect:
        // setTimeout(() => window.location.href = "/login.html", 2000);
      } else {
        showMessage(data.message || "Password reset failed");
      }

    } catch (error) {
      console.error(error);
      showMessage("Network error. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Reset Password";
    }
  });
});
