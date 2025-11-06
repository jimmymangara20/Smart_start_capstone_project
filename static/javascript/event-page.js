document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel) => document.querySelector(sel);

  /* === Sidebar Navigation === */
  const navLinks = document.querySelectorAll('.nav-item[data-spa]');
  const sidebar = $('.sidebar');
  const logoLink = $('.logo-link');

  function setActiveNav(path) {
    navLinks.forEach((a) => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === path);
    });
  }

  // // Route every sidebar click to index.html
  // navLinks.forEach((a) => {
  //   a.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     window.location.href = 'index.html';
  //   });
  // });

  // if (logoLink && sidebar) {
  //   logoLink.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     sidebar.classList.toggle('collapsed');
  //   });
  // }

  /* === Header === */
  const notifIcon = $('#notifIcon');
  const notifBadge = $('#notifBadge');
  const notifDropdown = $('#notifDropdown');
  const msgIcon = $('#msgIcon');
  const msgBadge = $('#msgBadge');
  const msgDropdown = $('#msgDropdown');

  const STORAGE_KEYS = {
    events: 'app_events_v1',
    notifications: 'app_notifs_v1',
  };

  const loadFromStorage = (k) => JSON.parse(localStorage.getItem(k)) || [];
  const saveToStorage = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  function escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderNotifs() {
    if (!notifDropdown || !notifBadge) return;
    const notifs = loadFromStorage(STORAGE_KEYS.notifications);
    notifDropdown.innerHTML = '';
    if (!notifs.length) {
      notifDropdown.innerHTML = `<div class="notif-empty">No notifications</div>`;
      notifBadge.textContent = '';
      return;
    }
    notifs
      .slice()
      .reverse()
      .forEach((n) => {
        const el = document.createElement('div');
        el.className = 'notif-item';
        el.innerHTML = `<div class="notif-title">${escapeHtml(n.title)}</div>
                        <div class="notif-sub">${escapeHtml(n.message)}</div>
                        <div class="notif-time">${escapeHtml(n.time)}</div>`;
        notifDropdown.appendChild(el);
      });
    notifBadge.textContent = notifs.length;
  }

  function toggleDropdown(el) {
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
  }

  notifIcon?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(notifDropdown);
    if (msgDropdown) msgDropdown.style.display = 'none';
  });

  msgIcon?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(msgDropdown);
    if (notifDropdown) notifDropdown.style.display = 'none';
  });

  document.addEventListener('click', () => {
    if (notifDropdown) notifDropdown.style.display = 'none';
    if (msgDropdown) msgDropdown.style.display = 'none';
  });

  renderNotifs();

  /* === Calendar === */
  const daysContainer = $('.calendar-grid');
  const monthYearEl = $('.calendar-header .month-year');
  const prevBtn = $('.prev-month');
  const nextBtn = $('.next-month');
  const saveBtn = $('.event-btn-two');
  const cancelBtn = $('.event-btn-one');
  const timeInput = $('#time');
  const titleInput = $('#title');
  const formLinkInput = $('#form-link');
  const modeSelect = $('#mode');

  let activeDate = null;
  let currentMonth = new Date();

  function formatDateShort(dt) {
    const m = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${m[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
  }

  function renderCalendar(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    monthYearEl.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startIndex = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const prevLast = new Date(year, month, 0).getDate();
    const today = new Date();

    let cells = `
      <div class="day-name">S</div><div class="day-name">M</div><div class="day-name">T</div>
      <div class="day-name">W</div><div class="day-name">T</div><div class="day-name">F</div><div class="day-name">S</div>
    `;

    for (let i = startIndex - 1; i >= 0; i--) {
      const dayNum = prevLast - i;
      cells += `<div class="prev-date">${dayNum}</div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
      const selected =
        activeDate &&
        d === activeDate.getDate() &&
        month === activeDate.getMonth() &&
        year === activeDate.getFullYear();
      const cls = isToday ? 'today' : selected ? 'active' : '';
      cells += `<div class="${cls}" data-day="${d}">${d}</div>`;
    }

    const totalCellsSoFar = startIndex + totalDays;
    const trailing =
      totalCellsSoFar % 7 === 0 ? 0 : 7 - (totalCellsSoFar % 7);
    for (let t = 1; t <= trailing; t++)
      cells += `<div class="prev-date">${t}</div>`;

    daysContainer.innerHTML = cells;

    daysContainer.querySelectorAll('div[data-day]').forEach((el) => {
      el.addEventListener('click', () => {
        const day = parseInt(el.getAttribute('data-day'));
        activeDate = new Date(year, month, day);
        renderCalendar(currentMonth);
      });
    });
  }

  renderCalendar(currentMonth);

  prevBtn?.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar(currentMonth);
  });

  nextBtn?.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar(currentMonth);
  });

  cancelBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    titleInput.value = '';
    timeInput.value = '';
    formLinkInput.value = '';
    modeSelect.selectedIndex = 0;
    activeDate = null;
    renderCalendar(currentMonth);
  });

  saveBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const time = timeInput.value.trim();
    const formLink = formLinkInput.value.trim();
    const mode = modeSelect.value;

    if (!title || !activeDate) {
      alert('Enter event title and select date!');
      return;
    }

    const evt = {
      id: Date.now(),
      title,
      time,
      formLink,
      mode,
      dateISO: activeDate.toISOString(),
      createdAt: new Date().toISOString(),
    };

    const evts = loadFromStorage(STORAGE_KEYS.events);
    evts.push(evt);
    saveToStorage(STORAGE_KEYS.events, evts);

    alert('Event saved!');
  });

  /* data from backend === */
  async function loadEventsFromBackend() {
    try {
      const response = await fetch('https://your-backend-api.com/api/events');
      if (!response.ok) throw new Error('Failed to load events');
      const data = await response.json();
      console.log('Loaded events:', data);

      //  store fetched events in localStorage
      saveToStorage(STORAGE_KEYS.events, data);
    } catch (err) {
      console.error('Backend fetch failed:', err);
    }
  }

  // Auto-run fetch on load
  loadEventsFromBackend();
});
