// Ensure DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     ROUTES
  --------------------------------*/
  const routes = {
    home: "index.html",
    features: "features.html",
    contact: "#contact",
    pricing: "pricing.html",
    login: "login.html",
    signup: "sign-up.html"
  };

  /* -------------------------------
     NAVIGATION LINKS
  --------------------------------*/
  document.querySelectorAll(".nav_link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.textContent.trim().toLowerCase();
      if (routes[target]) {
        window.location.href = routes[target];
      } else {
        console.warn("Unknown route:", target);
      }
    });
  });

  /* -------------------------------
     FOOTER QUICK LINKS
  --------------------------------*/
  document.querySelectorAll(".footer_list-container li").forEach(item => {
    item.addEventListener("click", () => {
      const text = item.textContent.trim().toLowerCase();
      if (routes[text]) {
        window.location.href = routes[text];
      }
    });
  });

  /* -------------------------------
     GET STARTED / TRIAL BUTTONS
  --------------------------------*/
  const allStartButtons = document.querySelectorAll(".nav_btn, .hero_btn-one, .trial_btn");
  allStartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isOldUser = confirm("Are you an existing user?");
      window.location.href = isOldUser ? routes.login : routes.signup;
    });
  });

  /* -------------------------------
     GET DEMO BUTTON
  --------------------------------*/
  const demoBtn = document.querySelector(".hero_btn-two");
  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      window.location.href = routes.contact;
    });
  }

  /* -------------------------------
     NEWSLETTER SUBSCRIPTION
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
     MOBILE NAV TOGGLE
  --------------------------------*/
  const navBtn = document.querySelector(".nav_btn-toggle");
  const navDiv = document.querySelector(".nav_div");
  if (navBtn && navDiv) {
    navBtn.addEventListener("click", () => {
      navDiv.classList.toggle("active");
    });
  }
});
