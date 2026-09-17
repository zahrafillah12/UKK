import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            Solusi Ruang Kerja &<br />Kolaborasi Terpercaya
          </h1>
          <p>
            Berkomitmen memberikan fasilitas profesional, independen, dan terpercaya untuk membantu bisnis Anda tumbuh dengan ekosistem kerja yang nyaman.
          </p>
          <div className="hero-buttons">
            <Link href="#layanan" className="btn-primary">
              Konsultasi Gratis <i className="bx bx-right-arrow-alt"></i>
            </Link>
            <Link href="/register" className="btn-secondary">
              Pelajari Layanan Kami <i className="bx bx-right-arrow-alt"></i>
            </Link>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section style={{ padding: "80px 0" }} id="layanan">
        <div className="section-title">
          <span style={{ background: "var(--accent-blue)", color: "white", padding: "4px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "15px", display: "inline-block" }}>01</span>
          <h2 style={{ textTransform: "uppercase", fontSize: "1.2rem", letterSpacing: "1px", marginBottom: "10px" }}>Layanan Profesional</h2>
          <h3 style={{ fontSize: "2rem", color: "var(--primary-dark)" }}>Kebutuhan Bisnis Anda</h3>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"><i className="bx bx-desktop"></i></div>
            <h3>Meja Fleksibel & Dedicated</h3>
            <p>Cocok untuk pekerja lepas dan remote yang membutuhkan lingkungan profesional kapan saja dengan fasilitas lengkap.</p>
            <Link href="#" className="service-link">Selengkapnya <i className="bx bx-right-arrow-alt"></i></Link>
          </div>
          <div className="service-card">
            <div className="service-icon"><i className="bx bx-buildings"></i></div>
            <h3>Private Office</h3>
            <p>Ruangan eksklusif untuk tim Anda dengan privasi penuh dan akses 24/7 untuk meningkatkan produktivitas.</p>
            <Link href="#" className="service-link">Selengkapnya <i className="bx bx-right-arrow-alt"></i></Link>
          </div>
          <div className="service-card">
            <div className="service-icon"><i className="bx bx-group"></i></div>
            <h3>Ruang Rapat Eksekutif</h3>
            <p>Ruang rapat canggih yang dilengkapi peralatan presentasi dan video konferensi terkini.</p>
            <Link href="#" className="service-link">Selengkapnya <i className="bx bx-right-arrow-alt"></i></Link>
          </div>
          <div className="service-card">
            <div className="service-icon"><i className="bx bx-calendar-star"></i></div>
            <h3>Event Space</h3>
            <p>Area luas yang dapat disesuaikan untuk lokakarya, seminar, dan pertemuan komunitas perusahaan.</p>
            <Link href="#" className="service-link">Selengkapnya <i className="bx bx-right-arrow-alt"></i></Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}><i className="bx bx-medal"></i></div>
            <h3>10+</h3>
            <p>Tahun Pengalaman</p>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}><i className="bx bx-group"></i></div>
            <h3>200+</h3>
            <p>Klien Puas</p>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}><i className="bx bx-buildings"></i></div>
            <h3>50+</h3>
            <p>Ruangan Tersedia</p>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}><i className="bx bx-check-shield"></i></div>
            <h3>100%</h3>
            <p>Keamanan Terjamin</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
