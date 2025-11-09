document.addEventListener("DOMContentLoaded", () => {
  const eventsContainer = document.getElementById("eventsContainer");

  // 🔗 Replace with your live API endpoint
  const apiUrl = "https://smartstart-backend-8afq.onrender.com/api/events";

  fetch(apiUrl)
    .then(response => response.json())
    .then(events => {
      eventsContainer.innerHTML = "";

      // If no events found
      if (events.length === 0) {
        eventsContainer.innerHTML = "<p>No upcoming events at the moment.</p>";
        return;
      }

      // Create cards for each event
      events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        eventCard.innerHTML = `
          <div class="event-title">${event.title}</div>
          <div class="event-details">
            <span class="event-date"><i class="fa-regular fa-calendar"></i> ${event.date}</span>
            <span class="event-time"><i class="fa-regular fa-clock"></i> ${event.time}</span>
            <span class="event-type"><i class="fa-solid fa-location-dot"></i> ${event.type}</span>
          </div>
        `;

        eventsContainer.appendChild(eventCard);
      });
    })
    .catch(error => {
      console.error("Error fetching events:", error);
      eventsContainer.innerHTML = "<p>⚠️ Failed to load events. Please try again later.</p>";
    });
});
