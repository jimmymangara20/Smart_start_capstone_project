document.addEventListener("DOMContentLoaded", () => {
  const backToLoginBtn = document.querySelector(".primary-btn");

  if (backToLoginBtn) {
    backToLoginBtn.addEventListener("click", () => {
      // Optional: clear temporary storage
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("newPassword");

      // Redirect to login
      window.location.href = "login.html";
    });
  }
});
