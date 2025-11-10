document.addEventListener("DOMContentLoaded", () => {
  const eventsContainer = document.getElementById("eventsContainer");

  // 🔗 API endpoint
  const apiUrl = "https://smartstart-backend-8afq.onrender.com/api/events";

  async function loadEvents() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const events = await response.json();

      eventsContainer.innerHTML = "";

      if (!events || events.length === 0) {
        eventsContainer.innerHTML = "<p>No upcoming events at the moment.</p>";
        return;
      }

      events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        eventCard.innerHTML = `
          <div class="event-title">${event.title}</div>
          <div class="event-details">
            <span class="event-date"><i class="fa-regular fa-calendar"></i> ${event.date}</span>
            <span class="event-time"><i class="fa-regular fa-clock"></i> ${event.time}</span>
            <span class="event-location"><i class="fa-solid fa-location-dot"></i> ${event.type}</span>
          </div>
        `;

        // Optional: click handler for details
        eventCard.addEventListener("click", () => {
          alert(`Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nType: ${event.type}`);
        });

        eventsContainer.appendChild(eventCard);
      });

    } catch (error) {
      console.error("Error fetching events:", error);
      eventsContainer.innerHTML = "<p>⚠️ Failed to load events. Please try again later.</p>";
    }
  }

  // Load events on page load
  loadEvents();
});
