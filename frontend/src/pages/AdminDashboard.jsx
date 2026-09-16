import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin_space') {
      navigate('/login');
      return;
    }
    setProfile(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-8">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="title">Admin Dashboard</h1>
        <button className="btn btn-outline" onClick={handleLogout}>Keluar</button>
      </div>
      
      {profile && (
        <div className="mt-4" style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)' }}>
          <h3>Selamat datang, Admin {profile.username}!</h3>
          <p className="text-muted">Panel untuk mengelola coworking space dan data pengguna.</p>
        </div>
      )}
    </div>
  );
}
