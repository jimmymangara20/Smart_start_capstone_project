document.addEventListener("DOMContentLoaded", () => {
  // Select the form and back link
  const form = document.querySelector("form.forgot__form");
  const backToLoginLink = document.querySelector(".forgot__link");

  // ROUTES
  const routes = {
    login: "login.html",
    forgotPasswordInstruction: "forgot-password-instruction.html",
  };

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.querySelector("#email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!emailInput) {
      alert("Please enter your email address.");
      return;
    }

    if (!emailPattern.test(emailInput)) {
      alert("Please enter a valid email (e.g., name@example.com).");
      return;
    }

    // Save email to localStorage
    localStorage.setItem("forgotEmail", emailInput);

    // Redirect to forgot-password-instruction page
    window.location.href = routes.forgotPasswordInstruction;
  });

  // Back to login handler
  if (backToLoginLink) {
    backToLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = routes.login;
    });
  }
});
