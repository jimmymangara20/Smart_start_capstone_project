// =============== Sidebar Navigation ===============
const sidebarLinks = document.querySelectorAll('#sidebar a');
const mainContent = document.getElementById('mainContent');

sidebarLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    loadPage(page);
  });
});

async function loadPage(page) {
  mainContent.innerHTML = `<h2>${page}</h2><p>Loading data...</p>`;
  
  try {
    // Simulate API fetch
    const res = await fetch(`https://your-backend-api.com/${page}`);
    const data = await res.json();

    mainContent.innerHTML = `
      <h2>${page.charAt(0).toUpperCase() + page.slice(1)}</h2>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (error) {
    mainContent.innerHTML = `<p>Error loading ${page} data.</p>`;
    console.error(error);
  }
}

// =============== Search Function ===============
document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value;
  if (!query) return alert('Please enter a search term');
  
  try {
    const res = await fetch(`https://your-backend-api.com/search?q=${query}`);
    const results = await res.json();
    mainContent.innerHTML = `
      <h2>Search Results for "${query}"</h2>
      <pre>${JSON.stringify(results, null, 2)}</pre>
    `;
  } catch (error) {
    console.error(error);
    mainContent.innerHTML = `<p>Search failed.</p>`;
  }
});

// =============== Upload Image Preview ===============
const uploadInput = document.getElementById('uploadInput');
const profileImage = document.getElementById('profileImage');

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      profileImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// =============== Notifications & Messages ===============
const notifIcon = document.getElementById('notifIcon');
const msgIcon = document.getElementById('msgIcon');

function showNotification(icon, message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  popup.style.position = 'absolute';
  popup.style.top = '60px';
  popup.style.right = '20px';
  popup.style.background = '#333';
  popup.style.color = '#fff';
  popup.style.padding = '10px';
  popup.style.borderRadius = '8px';
  popup.style.zIndex = '999';
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 3000);
}

notifIcon.addEventListener('click', () => {
  showNotification(notifIcon, 'You have 3 new notifications!');
});

msgIcon.addEventListener('click', () => {
  showNotification(msgIcon, '2 new messages received!');
});
