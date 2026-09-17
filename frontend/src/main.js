import './style.css'

const API_URL = 'https://ukk-production-3cee.up.railway.app';

// Add some micro-interactions for the navbar (glassmorphism effect on scroll)
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  checkAuth();
  fetchSpaces();
});

function checkAuth() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const authNavItem = document.getElementById('auth-nav-item');
  
  if (token && role) {
    const dashboardUrl = role === 'admin_space' ? '/admin.html' : '/member.html';
    authNavItem.innerHTML = `<a href="${dashboardUrl}" class="btn-primary">Dashboard</a>
                             <a href="#" onclick="logout(event)" style="margin-left: 10px; color: white;">Logout</a>`;
  }
}

window.logout = function(event) {
  event.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.reload();
}

async function fetchSpaces() {
  try {
    const response = await fetch(`${API_URL}/api/spaces`);
    const result = await response.json();
    
    if (result.status && result.data && result.data.length > 0) {
      renderSpaces(result.data);
    }
  } catch (error) {
    console.error('Error fetching spaces:', error);
  }
}

function renderSpaces(spaces) {
  const container = document.querySelector('.featured-container');
  if (!container) return;
  
  // Clear placeholder static cards
  container.innerHTML = '';
  
  // Render up to 3 spaces for the landing page
  spaces.slice(0, 3).forEach((space, index) => {
    const card = document.createElement('div');
    card.className = 'space-card';
    
    // Fallback images if no photo is provided
    const defaultImages = [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&q=80&w=800'
    ];
    
    const imageUrl = space.foto ? `${API_URL}/uploads/${space.foto}` : defaultImages[index % 3];
    
    card.innerHTML = `
      <div class="space-img" style="background-image: url('${imageUrl}')"></div>
      <div class="space-content">
        <h4>${space.nama_space}</h4>
        <p>${space.deskripsi || 'Ruangan eksklusif untuk kebutuhan produktivitas Anda.'}</p>
        <div style="margin-bottom: 15px; font-weight: bold; color: var(--accent-blue);">
          Rp ${space.harga_per_jam.toLocaleString('id-ID')} / Jam
        </div>
        <a href="#" class="btn-outline">View Details</a>
      </div>
    `;
    container.appendChild(card);
  });
}
