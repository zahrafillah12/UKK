const API_URL = 'https://ukk-production-3cee.up.railway.app';
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || role !== 'admin_space') {
  window.location.href = '/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  // Navigation handling
  document.querySelectorAll('.nav-menu a[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active class
      document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Switch views
      document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
      const target = link.getAttribute('data-target');
      document.getElementById(`view-${target}`).classList.add('active');
      
      // Load data
      if (target === 'spaces') fetchAdminSpaces();
      else if (target === 'reservations') fetchAdminReservations();
      else if (target === 'members') fetchAdminMembers();
      else if (target === 'reports') fetchAdminReport();
    });
  });

  // Initial load
  fetchAdminSpaces();
});

async function fetchAdminSpaces() {
  try {
    const res = await fetch(`${API_URL}/api/admin/spaces`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    const tbody = document.getElementById('admin-spaces-list');
    tbody.innerHTML = '';
    
    if (result.status && result.data.length > 0) {
      result.data.forEach(space => {
        tbody.innerHTML += `
          <tr>
            <td>${space.id}</td>
            <td>${space.nama_space}</td>
            <td>${space.tipe}</td>
            <td>${space.kapasitas}</td>
            <td>Rp ${space.harga_per_jam.toLocaleString('id-ID')}</td>
            <td>
              <button class="btn btn-sm" onclick="alert('Edit Space ${space.id}')">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteSpace(${space.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="6">Tidak ada ruangan yang ditemukan.</td></tr>';
    }
  } catch (err) { console.error(err); }
}

async function fetchAdminReservations() {
  try {
    const res = await fetch(`${API_URL}/api/admin/reservasi`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    const tbody = document.getElementById('admin-reservations-list');
    tbody.innerHTML = '';
    
    if (result.status && result.data.length > 0) {
      result.data.forEach(reser => {
        let actionButtons = '';
        if (reser.status === 'belum_dikonfirm') {
          actionButtons += `<button class="btn btn-sm btn-success" onclick="updateResStatus(${reser.id}, 'disetujui')">Approve</button>`;
        } else if (reser.status === 'disetujui') {
          actionButtons += `<button class="btn btn-sm" onclick="checkIn(${reser.id})">Check-In</button>`;
        } else if (reser.status === 'aktif') {
          actionButtons += `<button class="btn btn-sm" style="background:#ffc107; color:black;" onclick="checkOut(${reser.id})">Check-Out</button>`;
        }
        
        tbody.innerHTML += `
          <tr>
            <td>${reser.kode_booking}</td>
            <td>${reser.member ? reser.member.nama_member : 'Tidak diketahui'}</td>
            <td>${reser.space ? reser.space.nama_space : 'Tidak diketahui'}</td>
            <td>${reser.tanggal_reservasi}</td>
            <td><span class="badge ${reser.status}">${reser.status}</span></td>
            <td>${actionButtons}</td>
          </tr>
        `;
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="6">Tidak ada reservasi ditemukan.</td></tr>';
    }
  } catch (err) { console.error(err); }
}

async function fetchAdminMembers() {
  try {
    const res = await fetch(`${API_URL}/api/admin/members`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    const tbody = document.getElementById('admin-members-list');
    tbody.innerHTML = '';
    
    if (result.status && result.data.length > 0) {
      result.data.forEach(member => {
        tbody.innerHTML += `
          <tr>
            <td>${member.nama_member}</td>
            <td>${member.telp}</td>
            <td>${member.instansi || '-'}</td>
            <td>${member.alamat || '-'}</td>
          </tr>
        `;
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="4">Tidak ada anggota ditemukan.</td></tr>';
    }
  } catch (err) { console.error(err); }
}

async function fetchAdminReport() {
  const d = new Date();
  try {
    const res = await fetch(`${API_URL}/api/admin/reports/monthly?month=${d.getMonth()+1}&year=${d.getFullYear()}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    
    if (result.status) {
      document.getElementById('r-trans').textContent = result.data.total_transaksi || 0;
      document.getElementById('r-income').textContent = (result.data.realisasi_pendapatan_bersih || 0).toLocaleString('id-ID');
    }
  } catch (err) { console.error(err); }
}

window.updateResStatus = async function(id, status) {
  if(!confirm(`Perbarui status menjadi ${status}?`)) return;
  try {
    const res = await fetch(`${API_URL}/api/admin/reservasi/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    if(res.ok) fetchAdminReservations();
  } catch(e) {}
}

window.checkIn = async function(id) {
  try {
    const res = await fetch(`${API_URL}/api/admin/reservasi/${id}/check-in`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if(res.ok) fetchAdminReservations();
  } catch(e) {}
}

window.checkOut = async function(id) {
  try {
    const res = await fetch(`${API_URL}/api/admin/reservasi/${id}/check-out`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if(res.ok) fetchAdminReservations();
  } catch(e) {}
}

window.logout = function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login.html';
}
