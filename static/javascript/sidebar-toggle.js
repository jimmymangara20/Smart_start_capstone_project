// sidebar-toggle.js

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const navLinks = document.querySelectorAll(".nav-item");

    // Toggle sidebar visibility
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    // Close sidebar when a navigation link is clicked (on mobile)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("active");
            }
        });
    });

    // Optional: close sidebar if user clicks outside it
    document.addEventListener("click", (event) => {
        if (
            window.innerWidth <= 768 &&
            !sidebar.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            sidebar.classList.remove("active");
        }
    });
});
