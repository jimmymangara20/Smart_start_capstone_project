document.addEventListener("DOMContentLoaded", () => {
  const emailSpan = document.getElementById("userEmail");
  const openEmailBtn = document.querySelector(".instruction__btn");
  const backToSignIn = document.querySelector(".instruction__link");

  // Get stored email
  const email = localStorage.getItem("resetEmail") || "your email";

  if (emailSpan) emailSpan.textContent = email;

  // Open email button → go to reset password page
  if (openEmailBtn) {
    openEmailBtn.addEventListener("click", () => {
      window.location.href = "reset_password.html";
    });
  }

  // Back to sign-in link
  if (backToSignIn) {
    backToSignIn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }
});
