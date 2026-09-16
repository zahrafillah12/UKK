import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_member: '',
    username: '',
    password: '',
    instansi: '',
    alamat: '',
    telp: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/api/auth/register/member', formData);
      setSuccess('Pendaftaran berhasil! Silakan masuk dengan akun Anda.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mendaftar. Pastikan username belum digunakan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container container mt-8 text-center">
      <div className="auth-card">
        <h1 className="title">Buat Akun Baru</h1>
        <p className="subtitle mb-4">Daftar untuk mulai booking ruang kerja Anda.</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nama_member">Nama Lengkap</label>
            <input type="text" id="nama_member" name="nama_member" className="form-control" value={formData.nama_member} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="instansi">Instansi / Sekolah</label>
            <input type="text" id="instansi" name="instansi" className="form-control" value={formData.instansi} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="alamat">Alamat Lengkap</label>
            <input type="text" id="alamat" name="alamat" className="form-control" value={formData.alamat} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="telp">No. Telp / HP</label>
            <input type="text" id="telp" name="telp" className="form-control" value={formData.telp} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="auth-footer mt-4">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
