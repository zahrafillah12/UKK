import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function MemberDashboard() {
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'member') {
      navigate('/login');
      return;
    }
    
    // Fetch profile and reservations (placeholder endpoints)
    const fetchData = async () => {
      try {
        setProfile(user);
        // const res = await api.get('/api/reservasi/member');
        // setReservations(res.data);
      } catch (err) {
        console.error('Error fetching dashboard data');
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-8">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="title">Dashboard Member</h1>
        <button className="btn btn-outline" onClick={handleLogout}>Keluar</button>
      </div>
      
      {profile && (
        <div className="mt-4" style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)' }}>
          <h3>Selamat datang, {profile.username}!</h3>
          <p className="text-muted">Ini adalah halaman dashboard Anda untuk mengelola reservasi.</p>
        </div>
      )}

      <div className="mt-8">
        <h2>Riwayat Reservasi</h2>
        <div className="mt-4 text-muted">Belum ada reservasi aktif.</div>
      </div>
    </div>
  );
}
