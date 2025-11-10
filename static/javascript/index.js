// ======= Multi-Page Routing with Active Link Highlight =======
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav_link");
  const buttons = document.querySelectorAll("button");

  // === Define routes for buttons and links ===
  const routes = {
    home: "index.html",
    features: "features.html",
    contact: "#contact",
    pricing: "pricing.html",
    signin: "signin.html",
    "get started": "signin.html",
    "see features": "features.html",
    "contact sales": "contact.html"
  };

  // === Highlight the active link ===
  const setActiveLink = (path) => {
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href && path.includes(href.replace("#", "").toLowerCase())) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // === Handle nav link clicks ===
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const routeKey = link.textContent.trim().toLowerCase();
      if (routes[routeKey]) {
        window.location.href = routes[routeKey];
      } else {
        const href = link.getAttribute("href");
        if (href) window.location.href = href;
      }
    });
  });

  // === Handle button clicks (Get Started, See Features, etc.) ===
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const btnText = btn.textContent.trim().toLowerCase();
      if (routes[btnText]) {
        window.location.href = routes[btnText];
      }
    });
  });

  // === On page load, set active link ===
  setActiveLink(window.location.pathname.toLowerCase());
});


const API_BASE_URL = "https://smartstart-backend-2.onrender.com/api"; 

  // === Highlight Active Link ===
  const setActiveLink = (path) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.replace("#", "").toLowerCase();
      if (href && path.includes(href)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
