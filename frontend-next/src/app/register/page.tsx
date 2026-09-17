"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "https://ukk-production-3cee.up.railway.app";

export default function Register() {
  const [currentRegType, setCurrentRegType] = useState<"member" | "admin_space">("member");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    telp: "",
    nama_member: "",
    instansi: "",
    alamat: "",
    nama_coworking: "",
    nama_pemilik: "",
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    let payload: any = {};
    let endpoint = "";

    if (currentRegType === "member") {
      payload = {
        nama_member: formData.nama_member,
        username: formData.username,
        password: formData.password,
        telp: formData.telp,
        instansi: formData.instansi,
        alamat: formData.alamat,
      };
      endpoint = "/api/auth/register/member";
    } else {
      payload = {
        nama_coworking: formData.nama_coworking,
        nama_pemilik: formData.nama_pemilik,
        username: formData.username,
        password: formData.password,
        telp: formData.telp,
      };
      endpoint = "/api/auth/register/admin-space";
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setSuccessMsg("Pendaftaran berhasil! Mengalihkan ke halaman masuk...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        if (Array.isArray(result.message)) {
          setErrorMsg(result.message.join(", "));
        } else {
          setErrorMsg(result.message || "Pendaftaran gagal.");
        }
        setLoading(false);
      }
    } catch (err) {
      setErrorMsg("Kesalahan jaringan. Silakan coba lagi nanti.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-container" style={{ maxWidth: "1000px" }}>
        {/* Left Panel */}
        <div className="auth-left">
          <div className="logo-icon"><i className='bx bx-buildings'></i></div>
          <h1>Join Us!</h1>
          <hr style={{ width: "50px", border: "1px solid white", marginBottom: "30px" }} />
          <p>
            Jadilah bagian dari komunitas profesional kami. Dapatkan akses eksklusif ke ruang kerja, ruang rapat, dan fasilitas premium lainnya dengan mendaftar hari ini.
          </p>
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "10px" }}>
              Sudah memiliki akun?
            </p>
            <Link href="/login" className="btn-glass">
              Masuk di Sini
            </Link>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="auth-right">
          <div className="auth-form-box" style={{ maxWidth: "500px", overflowY: "auto", maxHeight: "80vh" }}>
            <h2>{currentRegType === "member" ? "Register Member" : "Register Admin Space"}</h2>
            <div className="auth-tabs">
              <button
                type="button"
                className={currentRegType === "member" ? "active" : ""}
                onClick={() => {
                  setCurrentRegType("member");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
              >
                Member
              </button>
              <button
                type="button"
                className={currentRegType === "admin_space" ? "active" : ""}
                onClick={() => {
                  setCurrentRegType("admin_space");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
              >
                Admin Space
              </button>
            </div>
            
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            {successMsg && <div className="success-msg">{successMsg}</div>}
            
            <form onSubmit={handleRegister}>
              <div className="auth-form-group">
                <label htmlFor="username">User Name</label>
                <input type="text" id="username" required placeholder="Enter username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="auth-form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required placeholder="••••••••" value={formData.password} onChange={handleChange} />
              </div>
              <div className="auth-form-group">
                <label htmlFor="telp">Phone Number</label>
                <input type="text" id="telp" required placeholder="08xxxxxxxxxx" value={formData.telp} onChange={handleChange} />
              </div>

              {currentRegType === "member" && (
                <>
                  <div className="auth-form-group">
                    <label htmlFor="nama_member">Full Name</label>
                    <input type="text" id="nama_member" required={currentRegType === "member"} placeholder="Enter full name" value={formData.nama_member} onChange={handleChange} />
                  </div>
                  <div className="auth-form-group">
                    <label htmlFor="instansi">Company / Institution</label>
                    <input type="text" id="instansi" placeholder="Optional" value={formData.instansi} onChange={handleChange} />
                  </div>
                  <div className="auth-form-group">
                    <label htmlFor="alamat">Address</label>
                    <input type="text" id="alamat" placeholder="Optional" value={formData.alamat} onChange={handleChange} />
                  </div>
                </>
              )}

              {currentRegType === "admin_space" && (
                <>
                  <div className="auth-form-group">
                    <label htmlFor="nama_coworking">Coworking Space Name</label>
                    <input type="text" id="nama_coworking" required={currentRegType === "admin_space"} placeholder="Enter space name" value={formData.nama_coworking} onChange={handleChange} />
                  </div>
                  <div className="auth-form-group">
                    <label htmlFor="nama_pemilik">Owner / PIC Name</label>
                    <input type="text" id="nama_pemilik" required={currentRegType === "admin_space"} placeholder="Enter PIC name" value={formData.nama_pemilik} onChange={handleChange} />
                  </div>
                </>
              )}

              <button type="submit" className="btn-gradient" disabled={loading}>
                {loading ? "Processing..." : "Register Now"}
              </button>
            </form>
            
            <div style={{ textAlign: "center", marginTop: "20px", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
              <Link href="/">&larr; Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
