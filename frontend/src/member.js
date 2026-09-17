const API_URL = 'https://ukk-production-3cee.up.railway.app';
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || role !== 'member') {
  window.location.href = '/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchSpaces();
  fetchHistory();

  // Navigation
  document.getElementById('nav-book').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('book');
  });
  document.getElementById('nav-history').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('history');
  });

  // Booking Form Submission
  document.getElementById('booking-form').addEventListener('submit', handleBooking);
});

function switchView(view) {
  document.getElementById('view-book').style.display = view === 'book' ? 'block' : 'none';
  document.getElementById('view-history').style.display = view === 'history' ? 'block' : 'none';
  
  document.getElementById('nav-book').classList.toggle('active', view === 'book');
  document.getElementById('nav-history').classList.toggle('active', view === 'history');
  document.getElementById('page-title').textContent = view === 'book' ? 'Book a Space' : 'My Reservations';
}

async function fetchSpaces() {
  try {
    const res = await fetch(`${API_URL}/api/spaces`);
    const result = await res.json();
    if (result.status) {
      renderSpaces(result.data);
    }
  } catch (err) {
    console.error(err);
  }
}

function renderSpaces(spaces) {
  const container = document.getElementById('spaces-list');
  container.innerHTML = '';
  
  spaces.forEach(space => {
    const imageUrl = space.foto ? `${API_URL}/uploads/${space.foto}` : 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800';
    const card = document.createElement('div');
    card.className = 'space-item';
    card.innerHTML = `
      <div class="space-img" style="background-image: url('${imageUrl}')"></div>
      <div class="space-info">
        <h4>${space.nama_space}</h4>
        <p style="font-size:0.9rem; color:#666;">Rp ${space.harga_per_jam.toLocaleString('id-ID')} / Jam</p>
        <button class="btn" style="width:100%; margin-top:10px;" onclick="openModal(${space.id}, '${space.nama_space}')">Book</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Global modal functions
window.openModal = function(id, name) {
  document.getElementById('book-space-id').value = id;
  document.getElementById('modal-space-name').textContent = `Space: ${name}`;
  document.getElementById('booking-modal').style.display = 'flex';
}

window.closeModal = function() {
  document.getElementById('booking-modal').style.display = 'none';
  document.getElementById('book-error').textContent = '';
  document.getElementById('booking-form').reset();
}

async function handleBooking(e) {
  e.preventDefault();
  const errorDiv = document.getElementById('book-error');
  errorDiv.textContent = 'Processing...';

  // Check promo code if any
  const promo = document.getElementById('book-promo').value.trim();
  let diskonId = null;

  if (promo) {
    try {
      const pRes = await fetch(`${API_URL}/api/diskon/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_diskon: promo })
      });
      const pData = await pRes.json();
      if (pData.status) {
        diskonId = pData.data.id;
      } else {
        errorDiv.textContent = 'Promo code invalid or expired.';
        return;
      }
    } catch(err) {
      errorDiv.textContent = 'Error checking promo code.';
      return;
    }
  }

  const payload = {
    id_space: parseInt(document.getElementById('book-space-id').value),
    tanggal_reservasi: document.getElementById('book-date').value,
    jam_mulai: document.getElementById('book-time').value,
    durasi_jam: parseInt(document.getElementById('book-duration').value)
  };
  
  if (diskonId) payload.id_diskon = diskonId;

  try {
    const res = await fetch(`${API_URL}/api/reservasi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    
    if (res.ok && result.status) {
      closeModal();
      alert('Booking successful!');
      fetchHistory();
      switchView('history');
    } else {
      errorDiv.textContent = result.message || 'Booking failed.';
    }
  } catch (err) {
    errorDiv.textContent = 'Network error.';
  }
}

async function fetchHistory() {
  try {
    const res = await fetch(`${API_URL}/api/reservasi/my`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    if (result.status) {
      renderHistory(result.data);
    }
  } catch (err) {
    console.error(err);
  }
}

function renderHistory(reservations) {
  const tbody = document.getElementById('history-list');
  tbody.innerHTML = '';
  
  if (reservations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No reservations found.</td></tr>';
    return;
  }

  reservations.forEach(res => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${res.kode_booking}</td>
      <td>${res.space ? res.space.nama_space : 'Unknown'}</td>
      <td>${res.tanggal_reservasi}</td>
      <td>${res.jam_mulai} - ${res.jam_selesai}</td>
      <td>Rp ${res.total_bayar.toLocaleString('id-ID')}</td>
      <td><span class="badge ${res.status}">${res.status.replace('_', ' ').toUpperCase()}</span></td>
      <td>
        <button class="btn" style="padding:4px 8px; font-size:0.8rem;" onclick="viewTicket(${res.id})">Ticket</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.viewTicket = async function(id) {
  try {
    const res = await fetch(`${API_URL}/api/reservasi/${id}/e-ticket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    if (result.status) {
      const t = result.data;
      document.getElementById('ticket-content').innerHTML = `
        <h2 style="margin-bottom:10px;">${t.coworking_space.nama}</h2>
        <p><strong>Code:</strong> ${t.kode_booking}</p>
        <p><strong>Space:</strong> ${t.space.nama}</p>
        <p><strong>Date:</strong> ${t.jadwal.tanggal}</p>
        <p><strong>Time:</strong> ${t.jadwal.jam_mulai} - ${t.jadwal.jam_selesai}</p>
        <hr style="margin:15px 0;">
        <h3 style="color:var(--accent-blue);">Total: Rp ${t.rincian_pembayaran.total_dibayar.toLocaleString('id-ID')}</h3>
        <p style="font-size:0.8rem; color:#888; margin-top:10px;">Status: ${t.status_reservasi}</p>
      `;
      document.getElementById('ticket-modal').style.display = 'flex';
    } else {
      alert(result.message);
    }
  } catch (err) {
    alert('Failed to load ticket.');
  }
}

window.closeTicketModal = function() {
  document.getElementById('ticket-modal').style.display = 'none';
}

window.logout = function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login.html';
}
