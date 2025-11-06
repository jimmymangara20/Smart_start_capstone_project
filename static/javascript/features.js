// Ensure the DOM is loaded before running
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     SPA-LIKE ROUTING FOR NAV LINKS
  --------------------------------*/
  const navLinks = document.querySelectorAll(".nav_link");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = e.target.textContent.trim().toLowerCase();

      // Route based on link text
      switch (target) {
        case "home":
          window.location.href = "index.html";
          break;
        case "features":
          window.location.href = "features.html";
          break;
        case "contact":
          window.location.href = "contact.html";
          break;
        case "pricing":
          window.location.href = "pricing.html";
          break;
        default:
          console.warn("Unknown route:", target);
      }
    });
  });


  /* -------------------------------
     BUTTON CLICK ROUTES
  --------------------------------*/
  const routeToSignup = () => (window.location.href = "signup.html");

  document.querySelector(".nav_btn")?.addEventListener("click", routeToSignup);
  document.querySelector(".hero_btn-one")?.addEventListener("click", routeToSignup);
  document.querySelector(".trial_btn")?.addEventListener("click", routeToSignup);

  // Optional demo button
  document.querySelector(".hero_btn-two")?.addEventListener("click", () => {
    window.location.href = "demo.html";
  });


  /* -------------------------------
     NEWSLETTER SUBSCRIPTION (Fetch API)
  --------------------------------*/
  const newsletterForm = document.querySelector(".newsletter_form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = newsletterForm.querySelector(".newsletter_input").value.trim();

      if (!email) {
        alert("Please enter a valid email address.");
        return;
      }

      try {
        const response = await fetch("https://your-backend-api.com/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          alert("✅ Subscription successful!");
          newsletterForm.reset();
        } else {
          alert("❌ Subscription failed. Try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Network error. Please check your connection.");
      }
    });
  }


  /* -------------------------------
     OPTIONAL: MOBILE NAV TOGGLE
  --------------------------------*/
  const navBtn = document.querySelector(".nav_btn-toggle");
  const navDiv = document.querySelector(".nav_div");

  if (navBtn && navDiv) {
    navBtn.addEventListener("click", () => {
      navDiv.classList.toggle("active");
    });
  }
});
