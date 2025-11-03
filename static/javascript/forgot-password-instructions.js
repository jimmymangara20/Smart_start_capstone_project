// Display saved email
const email = localStorage.getItem("resetEmail");
document.getElementById("userEmail").textContent = email || "your email";

// Handle "Open email app" button
document.querySelector(".instruction__btn").addEventListener("click", function () {
  window.location.href = "mailto:";
});

