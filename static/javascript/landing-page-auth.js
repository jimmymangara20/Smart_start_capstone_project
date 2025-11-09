// =============================
// LANDING PAGE AUTH + ROUTING + AVATAR
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".heading");
  const fileInput = document.querySelector('input[type="file"]');
  const avatar = document.createElement("img");

  avatar.classList.add("avatar-preview");
  Object.assign(avatar.style, {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    marginLeft: "1rem",
  });
  avatar.title = "Profile Avatar";

  // =============================
  // LOAD USER AVATAR (FROM HR/EMPLOYEE PROFILE OR UPLOAD)
  // =============================
  const hrProfile = localStorage.getItem("hrProfile");
  const employeeProfile = localStorage.getItem("employeeProfile");
  const uploadedAvatar = localStorage.getItem("userAvatar");

  let avatarSrc = null;

  // Priority: HR Profile > Employee Profile > Manual Upload
  if (hrProfile) {
    try {
      avatarSrc = JSON.parse(hrProfile).avatar || null;
    } catch {}
  }
  if (!avatarSrc && employeeProfile) {
    try {
      avatarSrc = JSON.parse(employeeProfile).avatar || null;
    } catch {}
  }
  if (!avatarSrc && uploadedAvatar) {
    avatarSrc = uploadedAvatar;
  }

  if (avatarSrc) {
    avatar.src = avatarSrc;
    header.appendChild(avatar);
  }

  // Show new image upload immediately and save
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        avatar.src = event.target.result;
        header.appendChild(avatar);
        localStorage.setItem("userAvatar", event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  // =============================
  // ROUTING (Navbar & Buttons)
  // =============================
  const routes = {
    "#home": "/index.html",
    "#Features": "/features.html",
    "#Contact": "#contact",
    "#Pricing": "/pricing.html",
  };

  // Navbar routing
  document.querySelectorAll(".nav_link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = e.target.getAttribute("href");
      if (routes[href]) {
        e.preventDefault();
        window.location.href = routes[href];
      }
    });
  });

  // =============================
  // BUTTON ROUTING
  // =============================

  // Get Started → Login page
  const getStartedBtn = document.querySelector(".hero_btn-get");
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      window.location.href = "/login.html";
    });
  }

  // See Features → Features page
  const seeFeaturesBtn = document.querySelector(".hero_btn-see");
  if (seeFeaturesBtn) {
    seeFeaturesBtn.addEventListener("click", () => {
      window.location.href = "/features.html";
    });
  }

  // Contact Sales → Contact page
  const contactSalesBtn = document.querySelector(".start_btn-two");
  if (contactSalesBtn) {
    contactSalesBtn.addEventListener("click", () => {
      window.location.href = "#contact";
    });
  }

  // Newsletter form (optional)
  const newsletterForm = document.querySelector(".newsletter_form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector("input").value;
      if (email.trim() !== "") {
        alert(`Thank you for subscribing, ${email}!`);
      }
      newsletterForm.reset();
    });
  }

  // =============================
  // FETCH API (Reusable Template)
  // =============================
  const API_BASE_URL = "https://your-backend-link.com/api"; // Replace with your actual backend

  async function fetchData(endpoint, method = "GET", body = null) {
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (body) options.body = JSON.stringify(body);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();

      console.log("✅ Data fetched:", data);
      return data;
    } catch (err) {
      console.error("❌ Fetch error:", err);
      return null;
    }
  }

  // Example: Fetch profile data on load
  fetchData("/user/profile");
});
