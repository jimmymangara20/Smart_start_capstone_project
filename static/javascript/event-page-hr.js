let selectedDate = null;

document.addEventListener("DOMContentLoaded", function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function (info) {
            selectedDate = info.dateStr;
            alert("Date selected: " + selectedDate);
        }
    });

    calendar.render();
});

// Handle Save and send to backend
document.getElementById("eventForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!selectedDate) {
        alert("Please select a date from the calendar");
        return;
    }

    let eventData = {
        time: document.getElementById("time").value,
        title: document.getElementById("title").value,
        formLink: document.getElementById("formLink").value,
        mode: document.getElementById("mode").value,
        date: selectedDate
    };

    try {
        let response = await fetch("https://smartstart-backend-2.onrender.com/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        });

        let result = await response.json();

        if (response.ok) {
            alert("Event saved successfully!");
            window.location.href = "events-page-employee.html"; // redirect after saving
        } else {
            alert("Failed to save event: " + result.message);
        }

    } catch (error) {
        console.error(error);
        alert("⚠ Something went wrong while connecting to the server.");
    }
});
