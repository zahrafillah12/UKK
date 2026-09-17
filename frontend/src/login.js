const API_URL = 'https://ukk-production-3cee.up.railway.app';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const btn = document.getElementById('login-btn');
  const errorMsg = document.getElementById('error-msg');
  
  btn.textContent = 'Memproses...';
  btn.disabled = true;
  errorMsg.textContent = '';
  
  try {
    // The backend uses 'username' instead of 'usernameOrEmail' for general login based on the PDF docs.
    // Wait, the PDF says for App Maker it uses usernameOrEmail, but for User/Admin it says username.
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
      // Save to local storage
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);
      
      // Redirect based on role
      if (role === 'admin_space') {
        window.location.href = '/admin.html';
      } else {
        window.location.href = '/member.html';
      }
    } else {
      errorMsg.textContent = result.message || 'Gagal masuk. Silakan coba lagi.';
      btn.textContent = 'Masuk';
      btn.disabled = false;
    }
  } catch (err) {
    errorMsg.textContent = 'Kesalahan jaringan. Silakan coba lagi nanti.';
    btn.textContent = 'Masuk';
    btn.disabled = false;
  }
});
