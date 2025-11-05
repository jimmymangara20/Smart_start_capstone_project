// checklist.js (page-specific logic only)
document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------
       1. Checklist Countdown Timer
    -------------------------------------------------- */
    const deadlineElement = document.querySelector('.deadline-time');

    if (deadlineElement) {
        let distance = parseInt(deadlineElement.getAttribute('data-deadline-ms'));

        function updateCountdown() {
            distance -= 1000;

            if (distance <= 0) {
                deadlineElement.textContent = "Deadline Passed!";
                clearInterval(countdownInterval);
                return;
            }

            const msInDay = 1000 * 60 * 60 * 24;
            const msInHour = 1000 * 60 * 60;
            const msInMinute = 1000 * 60;

            const days = Math.floor(distance / msInDay);
            const hours = Math.floor((distance % msInDay) / msInHour);
            const minutes = Math.floor((distance % msInHour) / msInMinute);
            const seconds = Math.floor((distance % msInMinute) / 1000);

            deadlineElement.textContent =
                `${days} days ${String(hours).padStart(2, '0')}:` +
                `${String(minutes).padStart(2, '0')}:` +
                `${String(seconds).padStart(2, '0')}`;
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }


    /* --------------------------------------------------
       2. Task Item Click Events
    -------------------------------------------------- */
    const taskItems = document.querySelectorAll('.task-item.clickable');

    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const taskTitle = item.querySelector('h3').textContent;
            console.log(`Task Clicked: ${taskTitle}`);
            // Future routing: window.location.href = `/task/${id}`;
        });
    });

});
