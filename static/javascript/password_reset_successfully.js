document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.querySelector(".primary-btn");

  backBtn.addEventListener("click", () => {
    // Redirect to profile page
    window.location.href = "/profile.html"; // change this to your actual profile page path
  });
});
