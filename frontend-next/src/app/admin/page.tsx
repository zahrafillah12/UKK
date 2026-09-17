"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://ukk-production-3cee.up.railway.app";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("spaces");
  const [spaces, setSpaces] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [diskon, setDiskon] = useState<any[]>([]);
  const [reports, setReports] = useState({ trans: 0, income: 0 });
  const [token, setToken] = useState("");

  const [isSpaceModalOpen, setSpaceModalOpen] = useState(false);
  const [isDiskonModalOpen, setDiskonModalOpen] = useState(false);

  const [spaceForm, setSpaceForm] = useState({ id: "", nama_space: "", tipe: "desk", harga_per_jam: "", kapasitas: "", deskripsi: "" });
  const [diskonForm, setDiskonForm] = useState({ id: "", nama_diskon: "", persentase_diskon: "", tanggal_awal: "", tanggal_akhir: "" });

  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    if (!t || r !== "admin_space") {
      router.push("/login");
    } else {
      setToken(t);
      fetchSpaces(t);
    }
  }, [router]);

  useEffect(() => {
    if (!token) return;
    if (activeView === "spaces") fetchSpaces(token);
    else if (activeView === "reservations") fetchReservations(token);
    else if (activeView === "members") fetchMembers(token);
    else if (activeView === "diskon") fetchDiskon(token);
    else if (activeView === "reports") fetchReports(token);
  }, [activeView, token]);

  const fetchSpaces = async (t: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/spaces`, { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.status) setSpaces(data.data);
      else setSpaces([]);
    } catch { setSpaces([]); }
  };

  const fetchReservations = async (t: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/reservasi`, { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.status) setReservations(data.data);
      else setReservations([]);
    } catch { setReservations([]); }
  };

  const fetchMembers = async (t: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/members`, { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.status) setMembers(data.data);
      else setMembers([]);
    } catch { setMembers([]); }
  };

  const fetchDiskon = async (t: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/diskon`, { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.status) setDiskon(data.data);
      else setDiskon([]);
    } catch { setDiskon([]); }
  };

  const fetchReports = async (t: string) => {
    const d = new Date();
    try {
      const res = await fetch(`${API_URL}/api/admin/reports/monthly?month=${d.getMonth() + 1}&year=${d.getFullYear()}`, { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.status) {
        setReports({ trans: data.data.total_transaksi || 0, income: data.data.realisasi_pendapatan_bersih || 0 });
      }
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const saveSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nama_space: spaceForm.nama_space,
      tipe: spaceForm.tipe,
      harga_per_jam: Number(spaceForm.harga_per_jam),
      kapasitas: Number(spaceForm.kapasitas),
      deskripsi: spaceForm.deskripsi
    };
    const method = spaceForm.id ? "PUT" : "POST";
    const url = spaceForm.id ? `${API_URL}/api/admin/spaces/${spaceForm.id}` : `${API_URL}/api/admin/spaces`;
    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (res.ok) {
        setSpaceModalOpen(false);
        fetchSpaces(token);
      } else { alert("Gagal menyimpan ruangan"); }
    } catch { alert("Error jaringan"); }
  };

  const deleteSpace = async (id: string) => {
    if (!confirm("Hapus ruangan ini?")) return;
    const res = await fetch(`${API_URL}/api/admin/spaces/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchSpaces(token);
  };

  const saveDiskon = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nama_diskon: diskonForm.nama_diskon,
      persentase_diskon: Number(diskonForm.persentase_diskon),
      tanggal_awal: new Date(diskonForm.tanggal_awal).toISOString(),
      tanggal_akhir: new Date(diskonForm.tanggal_akhir).toISOString(),
    };
    const method = diskonForm.id ? "PUT" : "POST";
    const url = diskonForm.id ? `${API_URL}/api/admin/diskon/${diskonForm.id}` : `${API_URL}/api/admin/diskon`;
    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (res.ok) {
        setDiskonModalOpen(false);
        fetchDiskon(token);
      } else { alert("Gagal menyimpan promo"); }
    } catch { alert("Error jaringan"); }
  };

  const deleteDiskon = async (id: string) => {
    if (!confirm("Hapus promo ini?")) return;
    const res = await fetch(`${API_URL}/api/admin/diskon/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchDiskon(token);
  };

  const updateResStatus = async (id: string, status: string) => {
    if(!confirm(`Perbarui status menjadi ${status}?`)) return;
    const res = await fetch(`${API_URL}/api/admin/reservasi/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
    if (res.ok) fetchReservations(token);
  };

  const checkIn = async (id: string) => {
    const res = await fetch(`${API_URL}/api/admin/reservasi/${id}/check-in`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchReservations(token);
  };

  const checkOut = async (id: string) => {
    const res = await fetch(`${API_URL}/api/admin/reservasi/${id}/check-out`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchReservations(token);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-light)", width: "100%" }}>
      <aside className="sidebar-admin">
        <div className="sidebar-brand"><i className="bx bx-shield-quarter"></i> Admin Space</div>
        <ul className="nav-menu">
          <li><button className={activeView === "spaces" ? "active" : ""} onClick={() => setActiveView("spaces")}><i className="bx bx-building"></i> Ruangan</button></li>
          <li><button className={activeView === "reservations" ? "active" : ""} onClick={() => setActiveView("reservations")}><i className="bx bx-calendar-check"></i> Reservasi</button></li>
          <li><button className={activeView === "members" ? "active" : ""} onClick={() => setActiveView("members")}><i className="bx bx-group"></i> Pelanggan</button></li>
          <li><button className={activeView === "diskon" ? "active" : ""} onClick={() => setActiveView("diskon")}><i className="bx bx-purchase-tag-alt"></i> Promo & Diskon</button></li>
          <li><button className={activeView === "reports" ? "active" : ""} onClick={() => setActiveView("reports")}><i className="bx bx-line-chart"></i> Laporan Pendapatan</button></li>
          <li><button onClick={handleLogout}><i className="bx bx-log-out"></i> Keluar</button></li>
        </ul>
      </aside>

      <main className="main-content">
        {activeView === "spaces" && (
          <section className="view-section active">
            <div className="header">
              <h2>Kelola Ruangan</h2>
              <button className="btn-primary" onClick={() => { setSpaceForm({ id: "", nama_space: "", tipe: "desk", harga_per_jam: "", kapasitas: "", deskripsi: "" }); setSpaceModalOpen(true); }}>+ Tambah Ruangan</button>
            </div>
            <div className="card">
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>ID</th><th>Nama Ruangan</th><th>Tipe</th><th>Kapasitas</th><th>Harga/Jam</th><th>Aksi</th></tr></thead>
                  <tbody>
                    {spaces.map(s => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td style={{ fontWeight: 600, color: "var(--primary-dark)" }}>{s.nama_space}</td>
                        <td><span className="badge" style={{ background: "#f1f5f9", color: "#64748b" }}>{s.tipe.toUpperCase()}</span></td>
                        <td>{s.kapasitas} Org</td>
                        <td style={{ fontWeight: 600 }}>Rp {s.harga_per_jam.toLocaleString("id-ID")}</td>
                        <td>
                          <button className="btn-sm" onClick={() => { setSpaceForm(s); setSpaceModalOpen(true); }}><i className="bx bx-edit"></i> Edit</button>
                          <button className="btn-sm btn-danger" onClick={() => deleteSpace(s.id)}><i className="bx bx-trash"></i> Hapus</button>
                        </td>
                      </tr>
                    ))}
                    {spaces.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Belum ada ruangan yang ditambahkan.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeView === "reservations" && (
          <section className="view-section active">
            <div className="header"><h2>Reservasi & Check-In</h2></div>
            <div className="card">
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>Kode Booking</th><th>Member</th><th>Ruangan</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
                  <tbody>
                    {reservations.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600, color: "var(--primary-dark)" }}>#{r.kode_booking}</td>
                        <td>{r.member ? r.member.nama_member : "-"}</td>
                        <td>{r.space ? r.space.nama_space : "-"}</td>
                        <td>{r.tanggal_reservasi}</td>
                        <td><span className={`badge ${r.status.toLowerCase()}`}>{r.status.replace(/_/g, " ").toUpperCase()}</span></td>
                        <td>
                          {r.status === "belum_dikonfirm" && <button className="btn-sm btn-success" onClick={() => updateResStatus(r.id, "disetujui")}><i className="bx bx-check"></i> Approve</button>}
                          {r.status === "disetujui" && <button className="btn-sm" onClick={() => checkIn(r.id)}><i className="bx bx-log-in-circle"></i> Check-In</button>}
                          {r.status === "aktif" && <button className="btn-sm" style={{ background: "#f59e0b", color: "white" }} onClick={() => checkOut(r.id)}><i className="bx bx-log-out-circle"></i> Check-Out</button>}
                        </td>
                      </tr>
                    ))}
                    {reservations.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Tidak ada reservasi saat ini.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeView === "members" && (
          <section className="view-section active">
            <div className="header"><h2>Data Pelanggan</h2></div>
            <div className="card">
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>Nama Lengkap</th><th>No. Telp</th><th>Instansi</th><th>Alamat</th></tr></thead>
                  <tbody>
                    {members.map(m => (
                      <tr key={m.id}>
                        <td style={{ fontWeight: 600 }}>{m.nama_member}</td>
                        <td>{m.telp}</td>
                        <td>{m.instansi || "-"}</td>
                        <td>{m.alamat || "-"}</td>
                      </tr>
                    ))}
                    {members.length === 0 && <tr><td colSpan={4} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Tidak ada data pelanggan.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeView === "diskon" && (
          <section className="view-section active">
            <div className="header">
              <h2>Kelola Promo & Diskon</h2>
              <button className="btn-primary" onClick={() => { setDiskonForm({ id: "", nama_diskon: "", persentase_diskon: "", tanggal_awal: "", tanggal_akhir: "" }); setDiskonModalOpen(true); }}>+ Tambah Promo</button>
            </div>
            <div className="card">
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>Kode Promo</th><th>Diskon (%)</th><th>Berlaku Sejak</th><th>Berakhir Pada</th><th>Aksi</th></tr></thead>
                  <tbody>
                    {diskon.map(d => (
                      <tr key={d.id}>
                        <td style={{ fontWeight: 700, color: "var(--accent-blue)", letterSpacing: "1px" }}>{d.nama_diskon}</td>
                        <td><span className="badge" style={{ background: "#dcfce7", color: "#166534" }}>{d.persentase_diskon}% OFF</span></td>
                        <td>{new Date(d.tanggal_awal).toLocaleDateString("id-ID")}</td>
                        <td>{new Date(d.tanggal_akhir).toLocaleDateString("id-ID")}</td>
                        <td>
                          <button className="btn-sm" onClick={() => { setDiskonForm({ ...d, tanggal_awal: d.tanggal_awal.split("T")[0], tanggal_akhir: d.tanggal_akhir.split("T")[0] }); setDiskonModalOpen(true); }}><i className="bx bx-edit"></i> Edit</button>
                          <button className="btn-sm btn-danger" onClick={() => deleteDiskon(d.id)}><i className="bx bx-trash"></i> Hapus</button>
                        </td>
                      </tr>
                    ))}
                    {diskon.length === 0 && <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Belum ada promo yang ditambahkan.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeView === "reports" && (
          <section className="view-section active">
            <div className="header"><h2>Laporan Pendapatan Bulan Ini</h2></div>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon blue"><i className="bx bx-transfer-alt"></i></div>
                <div className="metric-info">
                  <h4>Total Transaksi</h4>
                  <h2>{reports.trans}</h2>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon green"><i className="bx bx-wallet"></i></div>
                <div className="metric-info">
                  <h4>Pendapatan Bersih</h4>
                  <h2 style={{ color: "#10b981" }}>Rp {reports.income.toLocaleString("id-ID")}</h2>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Space Modal */}
      {isSpaceModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{spaceForm.id ? "Edit Ruangan" : "Tambah Ruangan Baru"}</h3>
              <button className="modal-close" onClick={() => setSpaceModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={saveSpace}>
              <div className="form-group">
                <label>Nama Ruangan</label>
                <input type="text" required value={spaceForm.nama_space} onChange={e => setSpaceForm({...spaceForm, nama_space: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Tipe</label>
                <select required value={spaceForm.tipe} onChange={e => setSpaceForm({...spaceForm, tipe: e.target.value})}>
                  <option value="desk">Desk</option>
                  <option value="meeting_room">Meeting Room</option>
                  <option value="private_office">Private Office</option>
                  <option value="event_space">Event Space</option>
                </select>
              </div>
              <div className="form-group">
                <label>Harga per Jam (Rp)</label>
                <input type="number" required value={spaceForm.harga_per_jam} onChange={e => setSpaceForm({...spaceForm, harga_per_jam: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Kapasitas (Orang)</label>
                <input type="number" required value={spaceForm.kapasitas} onChange={e => setSpaceForm({...spaceForm, kapasitas: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Deskripsi & Fasilitas</label>
                <textarea required rows={3} value={spaceForm.deskripsi} onChange={e => setSpaceForm({...spaceForm, deskripsi: e.target.value})}></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" style={{ color: "var(--primary-dark)", borderColor: "#e2e8f0" }} onClick={() => setSpaceModalOpen(false)}>Batal</button>
                <button type="submit" className="btn-primary">Simpan Ruangan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Diskon Modal */}
      {isDiskonModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{diskonForm.id ? "Edit Promo" : "Tambah Promo Baru"}</h3>
              <button className="modal-close" onClick={() => setDiskonModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={saveDiskon}>
              <div className="form-group">
                <label>Kode Promo</label>
                <input type="text" required value={diskonForm.nama_diskon} onChange={e => setDiskonForm({...diskonForm, nama_diskon: e.target.value})} placeholder="Misal: MERDEKA20" />
              </div>
              <div className="form-group">
                <label>Persentase Diskon (%)</label>
                <input type="number" required min="1" max="100" value={diskonForm.persentase_diskon} onChange={e => setDiskonForm({...diskonForm, persentase_diskon: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Tanggal Mulai</label>
                <input type="date" required value={diskonForm.tanggal_awal} onChange={e => setDiskonForm({...diskonForm, tanggal_awal: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Tanggal Berakhir</label>
                <input type="date" required value={diskonForm.tanggal_akhir} onChange={e => setDiskonForm({...diskonForm, tanggal_akhir: e.target.value})} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" style={{ color: "var(--primary-dark)", borderColor: "#e2e8f0" }} onClick={() => setDiskonModalOpen(false)}>Batal</button>
                <button type="submit" className="btn-primary">Simpan Promo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
