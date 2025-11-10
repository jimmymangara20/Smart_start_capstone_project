document.addEventListener("DOMContentLoaded", () => {
  console.log("SmartStart landing page loaded");

  /* -------------------------------
     ROUTES
  --------------------------------*/
  const routes = {
    home: "index.html",
    features: "features.html",
    contact: "#contact",
    about: "#about",
    pricing: "pricing.html",
    login: "login.html",
    signup: "sign-up.html"
  };

  /* -------------------------------
     SMOOTH SCROLL FOR INTERNAL LINKS (#)
  --------------------------------*/
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        e.preventDefault();
        window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  /* -------------------------------
     STICKY HEADER ON SCROLL
  --------------------------------*/
  const header = document.querySelector("header");
  const stickyOffset = header.offsetTop;

  window.addEventListener("scroll", () => {
    if (window.scrollY > stickyOffset) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  /* -------------------------------
     ACTIVE SECTION HIGHLIGHT
  --------------------------------*/
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  /* -------------------------------
     MOBILE MENU TOGGLE
  --------------------------------*/
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  /* -------------------------------
     MAIN NAVIGATION ROUTING
  --------------------------------*/
  document.querySelectorAll(".nav_link").forEach(link => {
    link.addEventListener("click", (e) => {
      const text = e.target.textContent.trim().toLowerCase();
      if (routes[text]) {
        // If it's an in-page section, scroll instead of reload
        if (routes[text].startsWith("#")) {
          e.preventDefault();
          document.querySelector(routes[text]).scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = routes[text];
        }
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
        if (routes[text].startsWith("#")) {
          document.querySelector(routes[text]).scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = routes[text];
        }
      }
    });
  });

  /* -------------------------------
     GET STARTED & CONTACT SALES BUTTONS
  --------------------------------*/
  const getStartedButtons = document.querySelectorAll(".nav_btn, .hero_btn-get, .start_btn-one");
  const contactSalesButton = document.querySelector(".start_btn-two");

  // Get Started → Ask old/new user
  getStartedButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOldUser = confirm("Are you an existing user?");
      window.location.href = isOldUser ? routes.login : routes.signup;
    });
  });

  // Contact Sales → Go to contact page
  if (contactSalesButton) {
    contactSalesButton.addEventListener("click", (e) => {
      e.preventDefault();
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
        const response = await fetch("https://smartstart-backend-2.onrender.com/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          alert("Subscription successful!");
          newsletterForm.reset();
        } else {
          alert("Subscription failed. Try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Network error. Please check your connection.");
      }
    });
  }
});
