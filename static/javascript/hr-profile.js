// ==========================
// HR PROFILE PAGE (JWT-secured)
// ==========================

// Base API URL
const API_BASE = "https://smartstart-backend-2.onrender.com/api/hr";

// Check if user is logged in (JWT token available)
const token = localStorage.getItem("jwtToken");
if (!token) {
  alert("⚠ Session expired or not logged in. Please log in again.");
  window.location.href = "login.html";
}

// Optional: store HR ID after login
const hrId = localStorage.getItem("hrId");

document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements
  const nameLabel = document.querySelector(".user-name-label");
  const userNameTop = document.querySelector(".user-name");
  const profilePic = document.querySelector(".large-profile-pic");
  const personalBtn = document.querySelector('[data-section="personal"]');
  const residentialBtn = document.querySelector('[data-section="residential"]');
  const documentBtn = document.querySelector('[data-section="document"]');
  const deleteBtn = document.querySelector('[data-action="delete"]');

  // ========================
  // FETCH HR PROFILE DETAILS
  // ========================
  try {
    const response = await fetch(`${API_BASE}/profile/${hrId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to load profile data.");

    const data = await response.json();

    // Update UI with backend data
    userNameTop.textContent = data.name || "HR User";
    nameLabel.textContent = data.name || "HR User";

    if (data.profileImage) {
      profilePic.src = data.profileImage;
    }

    console.log("Profile loaded:", data);
  } catch (err) {
    console.error("Error fetching profile:", err);
    alert("⚠ Could not load your profile. Please log in again.");
    localStorage.removeItem("jwtToken");
    window.location.href = "login.html";
  }

  // ========================
  // NAVIGATION HANDLERS
  // ========================
  personalBtn.addEventListener("click", () => {
    window.location.href = `personal-details.html?hrId=${hrId}`;
  });

  residentialBtn.addEventListener("click", () => {
    window.location.href = `residential-details.html?hrId=${hrId}`;
  });

  documentBtn.addEventListener("click", () => {
    window.location.href = `identification-document.html?hrId=${hrId}`;
  });

  // ========================
  // DELETE ACCOUNT HANDLER
  // ========================
  deleteBtn.addEventListener("click", async () => {
    const confirmDelete = confirm(
      "⚠ Are you sure you want to delete this account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE}/profile/${hrId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("hrId");
        window.location.href = "login.html";
      } else {
        const result = await response.json();
        alert("Failed to delete account: " + (result.message || "Server error"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠ Error while deleting account.");
    }
  });
});
