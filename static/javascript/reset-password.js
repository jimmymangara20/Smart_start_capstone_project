document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reset-form");
  const backLink = document.querySelector(".link");

  if (!form) return; // Exit if form doesn't exist

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // --- Input elements ---
    const oldPasswordInput = document.getElementById("old-password");
    const newPasswordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    // --- Values ---
    const oldPassword = oldPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // --- Clear previous errors ---
    clearErrors([oldPasswordInput, newPasswordInput, confirmPasswordInput]);

    let isValid = true;

    // --- Validation ---

    // Old password required
    if (!oldPassword) {
      displayError(oldPasswordInput, "Please enter your current password.");
      isValid = false;
    }

    // New password strength
    const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strengthRegex.test(newPassword)) {
      displayError(newPasswordInput, "New password must be 8+ characters, with Upper, Lower, Number, and Symbol.");
      isValid = false;
    }

    // New passwords match
    if (newPassword !== confirmPassword) {
      displayError(confirmPasswordInput, "New passwords do not match.");
      isValid = false;
    }

    // New password different from old
    if (newPassword && newPassword === oldPassword) {
      displayError(newPasswordInput, "New password must be different from the old password.");
      isValid = false;
    }

    // --- If all valid, store and route ---
    if (isValid) {
      // Store new password temporarily (or send to API)
      localStorage.setItem("newPassword", newPassword);

      // Route to success page
      window.location.href = "password-reset-successful.html";
    }
  });

  // --- Back link to login ---
  if (backLink) {
    backLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }

  // --- Helper Functions ---
  function displayError(inputElement, message) {
    inputElement.classList.add("input-error");

    const errorEl = document.createElement("p");
    errorEl.className = "error-text";
    errorEl.textContent = message;

    inputElement.parentNode.insertBefore(errorEl, inputElement.nextSibling);
  }

  function clearErrors(inputs) {
    inputs.forEach((input) => input.classList.remove("input-error"));
    document.querySelectorAll(".error-text").forEach((el) => el.remove());
  }
});
