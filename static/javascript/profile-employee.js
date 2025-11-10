// ✅ SET YOUR LIVE BACKEND URL
const API_BASE_URL = "https://smartstart-backend-8afq.onrender.com/api";

// Load user data on page load
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // if (!token) {
  //   window.location.href = "/login.html"; 
  //   return;
  // }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await res.json();

    document.querySelector(".user-name").textContent = user.name;
    document.querySelector(".card-name").textContent = user.name;
    document.querySelector(".card-email").textContent = user.email;

  } catch (error) {
    console.error("Could not load user profile:", error);
  }
});


// SPA Navigation for sidebar links
document.querySelectorAll("[data-spa]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const url = link.getAttribute("href");
    window.location.href = url;
  });
});

// PROFILE CARD CLICK → details page
document.querySelector("[data-action='details']").addEventListener("click", () => {
  window.location.href = "/profile/details";
});

// ACCOUNT VERIFICATION
document.querySelector("[data-action='verify']").addEventListener("click", () => {
  window.location.href = "/profile/verify-account";
});

// CHANGE PASSWORD
document.querySelector("[data-action='change-password']").addEventListener("click", () => {
  window.location.href = "/profile/change-password";
});

// ✅ PRIVACY POLICY
document.querySelector("[data-action='privacy']").addEventListener("click", () => {
  window.location.href = "/privacy";
});

// ✅ SUPPORT PAGE
document.querySelector("[data-action='support']").addEventListener("click", () => {
  window.location.href = "/support";
});

// ✅ ABOUT PAGE
document.querySelector("[data-action='about']").addEventListener("click", () => {
  window.location.href = "/about";
});

// ✅ BIOMETRIC TOGGLE
const biometricToggle = document.getElementById("biometric-toggle");
biometricToggle.addEventListener("change", async () => {
  const enabled = biometricToggle.checked;
  const token = localStorage.getItem("token");

  await fetch(`${API_BASE_URL}/settings/biometric`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ enabled }),
  });

  alert(`Biometric login ${enabled ? "enabled" : "disabled"}`);
});

// ✅ SEARCH
document.getElementById("searchBtn").addEventListener("click", () => {
  const text = document.getElementById("searchInput").value.trim();
  if (text.length > 0) {
    window.location.href = `/search?query=${text}`;
  }
});

// ✅ LOGOUT (sidebar + bottom)
document.querySelectorAll("[data-action='logout-menu']").forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  });
});

// ✅ NOTIFICATIONS DROPDOWN
document.getElementById("notifIcon").addEventListener("click", () => {
  document.getElementById("notifDropdown").classList.toggle("show");
});

// ✅ MESSAGES DROPDOWN
document.getElementById("msgIcon").addEventListener("click", () => {
  document.getElementById("msgDropdown").classList.toggle("show");
});

// ✅ CLOSE DROPDOWNS WHEN CLICK OUTSIDE
window.addEventListener("click", (e) => {
  if (!e.target.matches(".user-icon")) {
    document.getElementById("notifDropdown").classList.remove("show");
  }
  if (!e.target.matches(".ph-fill")) {
    document.getElementById("msgDropdown").classList.remove("show");
  }
});
