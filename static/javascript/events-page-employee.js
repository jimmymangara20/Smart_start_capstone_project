document.addEventListener("DOMContentLoaded", loadEvents);

// Replace with YOUR actual backend URL
const API_URL = "https://YOUR_BACKEND_URL/api/events";

function loadEvents() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            displayEvents(data);
        })
        .catch(err => {
            console.error("Error loading events:", err);
        });
}

function displayEvents(events) {
    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";

    if (events.length === 0) {
        container.innerHTML = "<p>No upcoming events yet.</p>";
        return;
    }

    events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-details">
                <span class="tag">${event.date} | ${event.time}</span>
                <span class="tag">${event.mode}</span>
            </div>
        `;

        container.appendChild(card);
    });
}
