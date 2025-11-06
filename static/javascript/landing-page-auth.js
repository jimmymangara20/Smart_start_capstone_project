// =============================
// LANDING PAGE AUTH FUNCTIONALITY
// =============================

// ---------- PROFILE UPLOAD PREVIEW ----------
const fileInput = document.querySelector('input[type="file"]');
const header = document.querySelector(".heading");

// Create an avatar element
const avatar = document.createElement("img");
avatar.classList.add("avatar-preview");
avatar.style.width = "45px";
avatar.style.height = "45px";
avatar.style.borderRadius = "50%";
avatar.style.objectFit = "cover";
avatar.style.cursor = "pointer";
avatar.style.marginLeft = "1rem";
avatar.title = "Profile Avatar";

// Load previously saved avatar (if any)
const storedAvatar = localStorage.getItem("userAvatar");
if (storedAvatar) {
  avatar.src = storedAvatar;
  header.appendChild(avatar);
}

// Show selected image immediately and save
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

// ---------- RESPONSIVE NAVIGATION & BUTTON ROUTING ----------
const routes = {
  "#home": "/index.html",
  "#Features": "/features.html",
  "#Contact": "/contact.html",
  "#Pricing": "/pricing.html",
};

// handle routing for nav links and buttons
document.querySelectorAll(".nav_link, button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let path = "";

    // check for specific buttons
    if (btn.classList.contains("hero_btn-get") || btn.classList.contains("start_btn-one")) {
      path = "/signin.html";
    } else if (btn.classList.contains("hero_btn-see")) {
      path = "/features.html";
    } else if (btn.classList.contains("start_btn-two")) {
      path = "/contact.html";
    } else {
      const href = btn.getAttribute("href") || "";
      path = routes[href] || href;
    }

    if (path) {
      window.location.href = path;
    }
  });
});

// ---------- FETCH API (Reusable Template) ----------
const API_BASE_URL = "https://your-backend-link.com/api"; // Replace with your backend endpoint

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

// Example: Fetch data on load
window.addEventListener("DOMContentLoaded", async () => {
  await fetchData("/user/profile"); // Example endpoint
});
