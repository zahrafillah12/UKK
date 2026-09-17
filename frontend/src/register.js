const API_URL = 'https://ukk-production-3cee.up.railway.app';

let currentRole = 'member';
const tabMember = document.getElementById('tab-member');
const tabAdmin = document.getElementById('tab-admin');
const formTitle = document.getElementById('form-title');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const memberFields = document.getElementById('member-fields');
const adminFields = document.getElementById('admin-fields');

tabMember.addEventListener('click', () => {
  currentRole = 'member';
  tabMember.classList.add('active');
  tabAdmin.classList.remove('active');
  formTitle.textContent = 'Register Member';
  errorMsg.textContent = '';
  successMsg.textContent = '';
  memberFields.style.display = 'grid';
  adminFields.style.display = 'none';
  document.getElementById('nama_member').required = true;
  document.getElementById('nama_coworking').required = false;
  document.getElementById('nama_pemilik').required = false;
});

tabAdmin.addEventListener('click', () => {
  currentRole = 'admin_space';
  tabAdmin.classList.add('active');
  tabMember.classList.remove('active');
  formTitle.textContent = 'Register Admin Space';
  errorMsg.textContent = '';
  successMsg.textContent = '';
  memberFields.style.display = 'none';
  adminFields.style.display = 'grid';
  document.getElementById('nama_member').required = false;
  document.getElementById('nama_coworking').required = true;
  document.getElementById('nama_pemilik').required = true;
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let payload = {};
  let endpoint = '';
  
  if (currentRole === 'member') {
    payload = {
      nama_member: document.getElementById('nama_member').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      telp: document.getElementById('telp').value,
      instansi: document.getElementById('instansi').value,
      alamat: document.getElementById('alamat').value
    };
    endpoint = '/api/auth/register/member';
  } else {
    payload = {
      nama_coworking: document.getElementById('nama_coworking').value,
      nama_pemilik: document.getElementById('nama_pemilik').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      telp: document.getElementById('telp').value
    };
    endpoint = '/api/auth/register/admin-space';
  }
  
  const btn = document.getElementById('register-btn');
  btn.textContent = 'Memproses...';
  btn.disabled = true;
  errorMsg.textContent = '';
  successMsg.textContent = '';
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    
    if (response.ok && result.status) {
      successMsg.textContent = 'Pendaftaran berhasil! Mengalihkan ke halaman masuk...';
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } else {
      errorMsg.textContent = result.message || 'Pendaftaran gagal.';
      if (Array.isArray(result.message)) {
         errorMsg.textContent = result.message.join(', ');
      }
      btn.textContent = 'Register Now';
      btn.disabled = false;
    }
  } catch (err) {
    errorMsg.textContent = 'Kesalahan jaringan. Silakan coba lagi nanti.';
    btn.textContent = 'Register Now';
    btn.disabled = false;
  }
});
