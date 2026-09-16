import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './LandingPage.css';

export default function LandingPage() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await api.get('/api/spaces');
        setSpaces(res.data);
      } catch (err) {
        setError('Gagal memuat daftar ruang kerja.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <div className="landing">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Temukan Ruang Kerja Terbaik Anda</h1>
          <p className="hero-subtitle">
            Booking coworking space modern dengan fasilitas lengkap, koneksi internet super cepat, dan lingkungan yang mendukung produktivitas.
          </p>
          <div className="hero-actions mt-8">
            <Link to="/login" className="btn btn-primary btn-lg">Mulai Sekarang</Link>
          </div>
        </div>
      </section>

      <section className="spaces-section container mt-8">
        <h2 className="title text-center">Ruangan Tersedia</h2>
        
        {loading ? (
          <p className="text-center mt-4 text-muted">Memuat data ruangan...</p>
        ) : error ? (
          <div className="alert alert-danger mt-4">{error}</div>
        ) : (
          <div className="space-grid mt-4">
            {spaces.length === 0 && <p className="text-center text-muted">Belum ada ruangan yang ditambahkan.</p>}
            
            {spaces.map(space => (
              <div key={space.id} className="space-card">
                {space.foto_url ? (
                  <img src={space.foto_url} alt={space.nama_space} className="space-img" />
                ) : (
                  <div className="space-img-placeholder">Tidak Ada Gambar</div>
                )}
                <div className="space-info">
                  <div className="space-header">
                    <h3>{space.nama_space}</h3>
                    <span className="space-type">{space.tipe}</span>
                  </div>
                  <p className="space-desc">{space.deskripsi}</p>
                  <div className="space-footer">
                    <div className="space-price">
                      <strong>Rp {space.harga_per_jam.toLocaleString('id-ID')}</strong> <small>/ jam</small>
                    </div>
                    <Link to={`/login`} className="btn btn-primary">Pesan</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="features container mt-8 mb-8">
        <h2 className="title text-center">Kenapa Memilih Kami?</h2>
        <div className="feature-grid mt-4">
          <div className="feature-card">
            <h3>Fasilitas Lengkap</h3>
            <p>Dari internet cepat hingga meeting room khusus, kami punya semuanya.</p>
          </div>
          <div className="feature-card">
            <h3>Lokasi Strategis</h3>
            <p>Berada di pusat kota yang mudah diakses transportasi umum.</p>
          </div>
          <div className="feature-card">
            <h3>Booking Mudah</h3>
            <p>Cukup beberapa klik, ruang kerja favorit Anda sudah bisa digunakan.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
