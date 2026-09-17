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
  
  btn.textContent = 'Memproses...';
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
      successMsg.textContent = 'Pendaftaran berhasil! Mengalihkan ke halaman masuk...';
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } else {
      errorMsg.textContent = result.message || 'Pendaftaran gagal.';
      if (result.message && typeof result.message === 'object') {
         // handle validation array from nestjs
         errorMsg.textContent = result.message.join(', ');
      }
      btn.textContent = 'Daftar Sekarang';
      btn.disabled = false;
    }
  } catch (err) {
    errorMsg.textContent = 'Kesalahan jaringan. Silakan coba lagi nanti.';
    btn.textContent = 'Daftar Sekarang';
    btn.disabled = false;
  }
});
