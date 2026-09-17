"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000";

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
          <li><button onClick={handleLogout}><i className="bx bx-log-out"></i> Keluar</button></li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <h2>{activeView === "book" ? "Pesan Ruangan" : "Reservasi Saya"}</h2>
        </header>

        {activeView === "book" && (
          <div className="card">
            <h3>Ruangan Tersedia</h3>
            <div className="spaces-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
              {spaces.map(s => (
                <div className="space-item" key={s.id} style={{ border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden", background: "var(--white)" }}>
                  <div className="space-img" style={{ height: "180px", backgroundImage: `url(${s.foto ? `${API_URL}/uploads/${s.foto}` : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                  <div className="space-info" style={{ padding: "20px" }}>
                    <h4 style={{ margin: "0 0 10px 0", color: "var(--primary-dark)", fontSize: "1.1rem" }}>{s.nama_space}</h4>
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>Rp {s.harga_per_jam.toLocaleString("id-ID")} / Jam</p>
                    <button className="btn" style={{ width: "100%", marginTop: "10px" }} onClick={() => openBookModal(s.id, s.nama_space)}>Book</button>
                  </div>
                </div>
              ))}
              {spaces.length === 0 && <p>Tidak ada ruangan tersedia.</p>}
            </div>
          </div>
        )}

        {activeView === "history" && (
          <div className="card">
            <h3>Reservasi Saya</h3>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>Kode Booking</th><th>Ruangan</th><th>Tanggal</th><th>Waktu</th><th>Total Bayar</th><th>Status</th><th>Aksi</th></tr></thead>
                <tbody>
                  {history.map(h => (
                    <tr key={h.id}>
                      <td>{h.kode_booking}</td>
                      <td>{h.space ? h.space.nama_space : "-"}</td>
                      <td>{h.tanggal_reservasi}</td>
                      <td>{h.jam_mulai} - {h.jam_selesai}</td>
                      <td>Rp {h.total_bayar.toLocaleString("id-ID")}</td>
                      <td><span className={`badge ${h.status}`}>{h.status.replace("_", " ").toUpperCase()}</span></td>
                      <td><button className="btn" style={{ padding: "4px 8px", fontSize: "0.8rem" }} onClick={() => viewTicket(h.id)}>Tiket</button></td>
                    </tr>
                  ))}
                  {history.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center" }}>Tidak ada histori pemesanan.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {isBookModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <h3 style={{ marginTop: 0, color: "var(--primary-dark)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "20px" }}>Selesaikan Reservasi</h3>
            <p style={{ marginBottom: "20px" }}>Space: {bookForm.nama_space}</p>
            <form onSubmit={handleBooking}>
              <div className="form-group" style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Tanggal</label>
                <input type="date" required value={bookForm.tanggal_reservasi} onChange={e => setBookForm({ ...bookForm, tanggal_reservasi: e.target.value })} style={{ width: "100%", padding: "12px" }} />
              </div>
              <div className="form-group" style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Jam Mulai</label>
                <input type="time" required value={bookForm.jam_mulai} onChange={e => setBookForm({ ...bookForm, jam_mulai: e.target.value })} style={{ width: "100%", padding: "12px" }} />
              </div>
              <div className="form-group" style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Durasi (Jam)</label>
                <input type="number" min="1" required value={bookForm.durasi_jam} onChange={e => setBookForm({ ...bookForm, durasi_jam: Number(e.target.value) })} style={{ width: "100%", padding: "12px" }} />
              </div>
              <div className="form-group" style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Kode Promo (Opsional)</label>
                <input type="text" value={bookForm.promo} onChange={e => setBookForm({ ...bookForm, promo: e.target.value })} style={{ width: "100%", padding: "12px" }} />
              </div>
              {bookError && <div style={{ color: "red", marginBottom: "10px" }}>{bookError}</div>}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="button" className="btn" style={{ background: "#ccc", color: "#333" }} onClick={() => setBookModalOpen(false)}>Batal</button>
                <button type="submit" className="btn" disabled={loading}>Konfirmasi Pesanan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {isTicketModalOpen && ticketData && (
        <div className="modal-overlay active">
          <div className="modal-content" style={{ textAlign: "center" }}>
            <h3 style={{ marginTop: 0, color: "var(--primary-dark)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "20px" }}>E-Ticket</h3>
            <div style={{ margin: "20px 0", padding: "20px", border: "2px dashed var(--accent-blue)" }}>
              <h2 style={{ marginBottom: "10px" }}>{ticketData.coworking_space.nama}</h2>
              <p><strong>Code:</strong> {ticketData.kode_booking}</p>
              <p><strong>Space:</strong> {ticketData.space.nama}</p>
              <p><strong>Date:</strong> {ticketData.jadwal.tanggal}</p>
              <p><strong>Time:</strong> {ticketData.jadwal.jam_mulai} - {ticketData.jadwal.jam_selesai}</p>
              <hr style={{ margin: "15px 0" }} />
              <h3 style={{ color: "var(--accent-blue)" }}>Total: Rp {ticketData.rincian_pembayaran.total_dibayar.toLocaleString("id-ID")}</h3>
              <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "10px" }}>Status: {ticketData.status_reservasi}</p>
            </div>
            <button type="button" className="btn" onClick={() => setTicketModalOpen(false)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
