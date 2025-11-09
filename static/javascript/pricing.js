document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // SIMPLE PAGE ROUTING
  // ==============================
  const routes = {
    home: "index.html",
    features: "features.html",
    contact: "contact.html",
    about: "about.html",
    login: "login.html",
    signup: "sign-up.html"
  };

  // Handle nav link clicks
  document.querySelectorAll(".nav_link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");

      // If it starts with '#', handle internal sections
      if (href.startsWith("#")) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to another page
        window.location.href = href;
      }
    });
  });

  // ==============================
  // "GET STARTED" BUTTONS LOGIC
  // ==============================
  const getStartedButtons = document.querySelectorAll(".card_btn, .nav_btn");

  getStartedButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isOldUser = confirm("Are you an existing user?");
      if (isOldUser) {
        window.location.href = routes.login;
      } else {
        window.location.href = routes.signup;
      }
    });
  });

  // ==============================
  // BILLING TOGGLE LOGIC
  // ==============================
  const monthlyBtn = document.getElementById("monthly");
  const yearlyBtn = document.getElementById("yearly");

  if (monthlyBtn && yearlyBtn) {
    monthlyBtn.addEventListener("click", () => {
      monthlyBtn.classList.add("active");
      yearlyBtn.classList.remove("active");
      updatePrices("monthly");
    });

    yearlyBtn.addEventListener("click", () => {
      yearlyBtn.classList.add("active");
      monthlyBtn.classList.remove("active");
      updatePrices("yearly");
    });
  }

  function updatePrices(planType) {
    const proPrice = document.querySelector(".card_type.two");
    const proPeriod = document.querySelector(".card_type-p.two");

    if (planType === "yearly") {
      proPrice.textContent = "$290"; // Example: 2 months free on yearly plan
      proPeriod.textContent = "/year";
    } else {
      proPrice.textContent = "$29";
      proPeriod.textContent = "/month";
    }
  }

  // ==============================
  // FOOTER QUICK LINKS
  // ==============================
  document.querySelectorAll(".footer_list-container li").forEach(item => {
    item.addEventListener("click", () => {
      const text = item.textContent.trim().toLowerCase();

      if (routes[text]) {
        window.location.href = routes[text];
      } else {
        alert("This page is coming soon!");
      }
    });
  });
});
