
document.addEventListener("DOMContentLoaded", () => {
  console.log("SmartStart landing page loaded ");


  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  const header = document.querySelector("header");
  const stickyOffset = header.offsetTop;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > stickyOffset) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

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

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  
  async function fetchData() {
    try {
      const response = await fetch("https://api.example.com/data"); 
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const data = await response.json();
      console.log("Fetched data:", data);

      const whySection = document.querySelector(".why_section");
      if (whySection) {
        whySection.innerHTML += `<p>${data.message || "API data loaded successfully."}</p>`;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }


});











const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll(".nav_link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (pageYOffset >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
