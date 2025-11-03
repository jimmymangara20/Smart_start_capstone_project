// Select form & elements
const form = document.querySelector(".forgot__form");
const emailInput = document.querySelector("#email");
const messageBox = document.querySelector(".form__message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  // Simple email validation
  if (!email || !validateEmail(email)) {
    showMessage("Please enter a valid email address", "error");
    return;
  }

  showMessage("Sending reset link...", "loading");

  try {
    const response = await fetch("https://api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message || "Something went wrong", "error");
    } else {
      showMessage("A reset link has been sent to your email ✅", "success");
      form.reset();
    }

  } catch (err) {
    showMessage("Network error — please try again", "error");
  }
});

// Email validation function
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Display messages
function showMessage(message, type) {
  messageBox.textContent = message;
  messageBox.className = `form__message ${type}`;
}
