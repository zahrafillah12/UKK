const API_URL = 'https://ukk-production-3cee.up.railway.app';

let currentRole = 'member';
const tabMember = document.getElementById('tab-member');
const tabAdmin = document.getElementById('tab-admin');
const formTitle = document.getElementById('form-title');
const errorMsg = document.getElementById('error-msg');

tabMember.addEventListener('click', () => {
  currentRole = 'member';
  tabMember.classList.add('active');
  tabAdmin.classList.remove('active');
  formTitle.textContent = 'Sign In Member';
  errorMsg.textContent = '';
});

tabAdmin.addEventListener('click', () => {
  currentRole = 'admin_space';
  tabAdmin.classList.add('active');
  tabMember.classList.remove('active');
  formTitle.textContent = 'Sign In Admin';
  errorMsg.textContent = '';
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const btn = document.getElementById('login-btn');
  
  btn.textContent = 'Memproses...';
  btn.disabled = true;
  errorMsg.textContent = '';
  
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const result = await response.json();
    
    if (response.ok && result.status) {
      const { access_token, role } = result.data;
      
      if (currentRole === 'member' && role === 'admin_space') {
        errorMsg.textContent = 'Akun ini terdaftar sebagai Admin. Silakan login melalui tab Admin Space.';
        btn.textContent = 'Submit';
        btn.disabled = false;
        return;
      }
      if (currentRole === 'admin_space' && role === 'member') {
        errorMsg.textContent = 'Akun ini terdaftar sebagai Member. Silakan login melalui tab Member.';
        btn.textContent = 'Submit';
        btn.disabled = false;
        return;
      }
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);
      
      if (role === 'admin_space') {
        window.location.href = '/admin.html';
      } else {
        window.location.href = '/member.html';
      }
    } else {
      errorMsg.textContent = result.message || 'Gagal masuk. Silakan coba lagi.';
      btn.textContent = 'Submit';
      btn.disabled = false;
    }
  } catch (err) {
    errorMsg.textContent = 'Kesalahan jaringan. Silakan coba lagi nanti.';
    btn.textContent = 'Submit';
    btn.disabled = false;
  }
});
