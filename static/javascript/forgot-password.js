const form = document.querySelector(".forgot__form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address (e.g., name@example.com).");
    return;
  }

  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    // ✅ ROUTING happens here after successful response
    window.location.href = "forgot-password-instruction.html";

  } catch (error) {
    console.error(error);
    alert("Network error — please try again");
  }
});
