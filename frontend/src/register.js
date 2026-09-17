const API_URL = 'https://ukk-production-3cee.up.railway.app';

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = {
    nama_member: document.getElementById('nama_member').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    telp: document.getElementById('telp').value,
    instansi: document.getElementById('instansi').value,
    alamat: document.getElementById('alamat').value
  };
  
  const btn = document.getElementById('register-btn');
  const errorMsg = document.getElementById('error-msg');
  const successMsg = document.getElementById('success-msg');
  
  btn.textContent = 'Loading...';
  btn.disabled = true;
  errorMsg.textContent = '';
  successMsg.textContent = '';
  
  try {
    const response = await fetch(`${API_URL}/api/auth/register/member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    
    if (response.ok && result.status) {
      successMsg.textContent = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } else {
      errorMsg.textContent = result.message || 'Registration failed.';
      if (result.message && typeof result.message === 'object') {
         // handle validation array from nestjs
         errorMsg.textContent = result.message.join(', ');
      }
      btn.textContent = 'Register';
      btn.disabled = false;
    }
  } catch (err) {
    errorMsg.textContent = 'Network error. Please try again later.';
    btn.textContent = 'Register';
    btn.disabled = false;
  }
});
