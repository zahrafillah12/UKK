import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.post('/api/auth/login', formData);
      const { access_token, ...user } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Arahkan berdasarkan role
      if (user.role === 'admin_space') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal login. Periksa kembali username & password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container container mt-8 text-center">
      <div className="auth-card">
        <h1 className="title">Selamat Datang Kembali</h1>
        <p className="subtitle mb-4">Masuk untuk melanjutkan ke akun Anda.</p>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="form-control" 
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="form-control" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="auth-footer mt-4">
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}
