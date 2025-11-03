const form = document.querySelector(".forgot__form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();

  if (!email) {
    alert("Please enter your email address");
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

    window.location.href = "forgot-password-instruction.html";

  } catch (error) {
    console.error(error);
    alert("Network error — please try again");
  }
});

