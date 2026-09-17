"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://ukk-production-3cee.up.railway.app";

export default function MemberDashboard() {
  const [activeView, setActiveView] = useState("book");
  const [spaces, setSpaces] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [token, setToken] = useState("");
  
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  
  const [bookForm, setBookForm] = useState({ id_space: "", nama_space: "", tanggal_reservasi: "", jam_mulai: "", durasi_jam: 1, promo: "" });
  const [ticketData, setTicketData] = useState<any>(null);
  
  const [bookError, setBookError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    if (!t || r !== "member") {
      router.push("/login");
    } else {
      setToken(t);
      fetchSpaces(t);
      fetchHistory(t);
    }
  }, [router]);

  const fetchSpaces = async (t: string) => {
    try {
      const res = await fetch(`${API_URL}/api/spaces`, { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.status) setSpaces(data.data);
    } catch {}
  };

  const fetchHistory = async (t: string) => {
    try {
      const res = await fetch(`${API_URL}/api/reservasi/my`, { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.status) setHistory(data.data);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const openBookModal = (id: string, name: string) => {
    setBookForm({ ...bookForm, id_space: id, nama_space: name });
    setBookError("");
    setBookModalOpen(true);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBookError("Memproses...");

    let diskonId = null;
    if (bookForm.promo) {
      try {
        const pRes = await fetch(`${API_URL}/api/diskon/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nama_diskon: bookForm.promo }),
        });
        const pData = await pRes.json();
        if (pData.status) {
          diskonId = pData.data.id;
        } else {
          setBookError("Kode promo tidak valid atau kedaluwarsa.");
          setLoading(false);
          return;
        }
      } catch {
        setBookError("Gagal mengecek kode promo.");
        setLoading(false);
        return;
      }
    }

    const payload: any = {
      id_space: parseInt(bookForm.id_space),
      tanggal_reservasi: bookForm.tanggal_reservasi,
      jam_mulai: bookForm.jam_mulai,
      durasi_jam: bookForm.durasi_jam,
    };
    if (diskonId) payload.id_diskon = diskonId;

    try {
      const res = await fetch(`${API_URL}/api/reservasi`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok && result.status) {
        setBookModalOpen(false);
        alert("Pesanan berhasil!");
        fetchHistory(token);
        setActiveView("history");
      } else {
        setBookError(result.message || "Pemesanan gagal.");
      }
    } catch {
      setBookError("Kesalahan jaringan.");
    }
    setLoading(false);
  };

  const viewTicket = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/reservasi/${id}/e-ticket`, { headers: { Authorization: `Bearer ${token}` } });
      const result = await res.json();
      if (result.status) {
        setTicketData(result.data);
        setTicketModalOpen(true);
      } else {
        alert(result.message);
      }
    } catch {
      alert("Gagal memuat tiket.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-light)", width: "100%" }}>
      <aside className="sidebar-member">
        <div className="sidebar-brand"><i className="bx bx-building-house"></i> Smart Space</div>
        <ul className="nav-menu">
          <li><button className={activeView === "book" ? "active" : ""} onClick={() => setActiveView("book")}><i className="bx bx-plus-circle"></i> Pesan Ruangan</button></li>
          <li><button className={activeView === "history" ? "active" : ""} onClick={() => setActiveView("history")}><i className="bx bx-history"></i> Reservasi Saya</button></li>
          <li><button className={activeView === "promo" ? "active" : ""} onClick={() => setActiveView("promo")}><i className="bx bx-purchase-tag-alt"></i> Info Promo</button></li>
          <li><button onClick={handleLogout}><i className="bx bx-log-out"></i> Keluar</button></li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <h2>{activeView === "book" ? "Pesan Ruangan" : activeView === "history" ? "Reservasi Saya" : "Daftar Promo"}</h2>
        </header>

        {activeView === "book" && (
          <div className="card">
            <h3>Ruangan Tersedia</h3>
            <div className="card-grid">
              {spaces.map(s => (
                <div className="space-card" key={s.id}>
                  {s.foto ? (
                    <div className="space-img-placeholder" style={{ backgroundImage: `url(${API_URL}/uploads/${s.foto})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                  ) : (
                    <div className="space-img-placeholder"><i className="bx bx-building-house"></i></div>
                  )}
                  <div className="space-content">
                    <div className="space-header">
                      <h3>{s.nama_space}</h3>
                      <span className="space-price">Rp {s.harga_per_jam.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="space-details">
                      <span><i className="bx bx-group"></i> Kapasitas {s.kapasitas}</span>
                      <span><i className="bx bx-category"></i> {s.tipe.toUpperCase()}</span>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "15px", height: "40px", overflow: "hidden" }}>
                      {s.deskripsi || "Tidak ada deskripsi tersedia."}
                    </p>
                    <button className="btn-primary" style={{ width: "100%" }} onClick={() => openBookModal(s.id, s.nama_space)}>
                      <i className="bx bx-check-circle"></i> Pesan Sekarang
                    </button>
                  </div>
                </div>
              ))}
              {spaces.length === 0 && <p style={{ gridColumn: "1 / -1", color: "#64748b" }}>Tidak ada ruangan tersedia saat ini.</p>}
            </div>
          </div>
        )}

        {activeView === "history" && (
          <div className="card">
            <h3 style={{ marginBottom: "20px" }}>Riwayat Reservasi Saya</h3>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>Kode Booking</th><th>Ruangan</th><th>Tanggal</th><th>Waktu</th><th>Total Bayar</th><th>Status</th><th>Aksi</th></tr></thead>
                <tbody>
                  {history.map(h => (
                    <tr key={h.id}>
                      <td style={{ fontWeight: 600, color: "var(--primary-dark)" }}>#{h.kode_booking}</td>
                      <td>{h.space ? h.space.nama_space : "-"}</td>
                      <td>{h.tanggal_reservasi}</td>
                      <td>{h.jam_mulai.slice(0, 5)} - {h.jam_selesai.slice(0, 5)}</td>
                      <td style={{ fontWeight: 600 }}>Rp {h.total_bayar.toLocaleString("id-ID")}</td>
                      <td><span className={`badge ${h.status.toLowerCase()}`}>{h.status.replace(/_/g, " ").toUpperCase()}</span></td>
                      <td>
                        <button className="btn-sm" onClick={() => viewTicket(h.id)}><i className="bx bx-receipt"></i> Tiket</button>
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Tidak ada histori pemesanan.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === "promo" && (
          <div className="card">
            <h3 style={{ marginBottom: "20px" }}>Promo & Diskon Spesial</h3>
            <div className="card-grid">
              {/* Tampilan Statis Sementara (Harusnya ambil dari API jika ada endpoint public diskon) */}
              <div className="space-card" style={{ border: "2px dashed var(--accent-blue)" }}>
                <div className="space-content" style={{ textAlign: "center", padding: "30px 20px" }}>
                  <i className="bx bx-gift" style={{ fontSize: "4rem", color: "var(--accent-blue)", marginBottom: "15px" }}></i>
                  <h3>Diskon 10% Pengguna Baru</h3>
                  <p style={{ color: "#64748b", margin: "10px 0" }}>Gunakan kode ini saat melakukan booking ruangan untuk pertama kali.</p>
                  <div style={{ background: "#eff6ff", padding: "10px", borderRadius: "8px", fontWeight: "bold", color: "var(--primary-dark)", letterSpacing: "2px", marginTop: "15px" }}>
                    WELCOME10
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {isBookModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Selesaikan Reservasi</h3>
              <button className="modal-close" onClick={() => setBookModalOpen(false)}>&times;</button>
            </div>
            <p style={{ marginBottom: "20px", color: "#64748b" }}>Space: <strong style={{ color: "var(--primary-dark)" }}>{bookForm.nama_space}</strong></p>
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label>Tanggal</label>
                <input type="date" required value={bookForm.tanggal_reservasi} onChange={e => setBookForm({ ...bookForm, tanggal_reservasi: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Jam Mulai</label>
                <input type="time" required value={bookForm.jam_mulai} onChange={e => setBookForm({ ...bookForm, jam_mulai: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Durasi (Jam)</label>
                <input type="number" min="1" required value={bookForm.durasi_jam} onChange={e => setBookForm({ ...bookForm, durasi_jam: Number(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Kode Promo (Opsional)</label>
                <input type="text" placeholder="Misal: WELCOME10" value={bookForm.promo} onChange={e => setBookForm({ ...bookForm, promo: e.target.value })} />
              </div>
              {bookError && <div className="error-msg">{bookError}</div>}
              <div className="modal-footer">
                <button type="button" className="btn-secondary" style={{ color: "var(--primary-dark)", borderColor: "#e2e8f0" }} onClick={() => setBookModalOpen(false)}>Batal</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Memproses..." : "Konfirmasi Pesanan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {isTicketModalOpen && ticketData && (
        <div className="modal-overlay active">
          <div className="modal-content" style={{ textAlign: "center" }}>
            <div className="modal-header" style={{ justifyContent: "center" }}>
              <h3 style={{ margin: 0, color: "var(--primary-dark)" }}>E-Ticket</h3>
            </div>
            <div style={{ margin: "20px 0", padding: "20px", border: "2px dashed var(--accent-blue)", borderRadius: "12px", background: "#f8fafc" }}>
              <h2 style={{ marginBottom: "10px", color: "var(--primary-dark)" }}>{ticketData.coworking_space.nama}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", textAlign: "left", marginTop: "20px" }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b" }}>Booking Code</span>
                  <strong style={{ fontSize: "1.1rem" }}>{ticketData.kode_booking}</strong>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b" }}>Space</span>
                  <strong style={{ fontSize: "1.1rem" }}>{ticketData.space.nama}</strong>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b" }}>Date</span>
                  <strong style={{ fontSize: "1.1rem" }}>{ticketData.jadwal.tanggal}</strong>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b" }}>Time</span>
                  <strong style={{ fontSize: "1.1rem" }}>{ticketData.jadwal.jam_mulai.slice(0,5)} - {ticketData.jadwal.jam_selesai.slice(0,5)}</strong>
                </div>
              </div>
              <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #e2e8f0" }} />
              <h3 style={{ color: "var(--accent-blue)", fontSize: "1.5rem" }}>Total: Rp {ticketData.rincian_pembayaran.total_dibayar.toLocaleString("id-ID")}</h3>
              <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "10px" }}>Status: <span className={`badge ${ticketData.status_reservasi.toLowerCase()}`}>{ticketData.status_reservasi}</span></p>
            </div>
            <button type="button" className="btn-primary" style={{ width: "100%" }} onClick={() => setTicketModalOpen(false)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
