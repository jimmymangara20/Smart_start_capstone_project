// checklist-page-employee.js
document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       1. Sidebar Toggle for Mobile/Small Screens
    ======================================================== */
    const dashboardContainer = document.querySelector('.dashboard-container');
    const sidebar = document.querySelector('.sidebar');

    // Create toggle button dynamically if on small screens
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle-btn';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.setAttribute('aria-label', 'Toggle Sidebar');

    const topHeader = document.querySelector('.top-header');
    topHeader.insertAdjacentElement('afterbegin', toggleBtn);

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-collapsed');
    });

    // Optional: collapse sidebar on window resize below 768px
    function handleResize() {
        if (window.innerWidth < 768) {
            sidebar.classList.add('sidebar-collapsed');
        } else {
            sidebar.classList.remove('sidebar-collapsed');
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();


    /* ========================================================
       2. Checklist Countdown Timer
    ======================================================== */
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


    /* ========================================================
       3. Task Item Click Events
    ======================================================== */
    const taskItems = document.querySelectorAll('.task-item.clickable');

    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const taskTitle = item.querySelector('h3')?.textContent || 'Untitled Task';
            console.log(`Task Clicked: ${taskTitle}`);
            // Future routing: window.location.href = `/task/${id}`;
        });
    });

});
