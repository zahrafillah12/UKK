"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "https://ukk-production-3cee.up.railway.app";

export default function Login() {
  const [currentLoginType, setCurrentLoginType] = useState<"member" | "admin_space">("member");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        const { access_token, role } = result.data;

        if (currentLoginType === "member" && role === "admin_space") {
          setErrorMsg("Akun ini terdaftar sebagai Admin. Silakan login melalui tab Admin Space.");
          setLoading(false);
          return;
        }

        if (currentLoginType === "admin_space" && role === "member") {
          setErrorMsg("Akun ini terdaftar sebagai Member. Silakan login melalui tab Member.");
          setLoading(false);
          return;
        }

        localStorage.setItem("token", access_token);
        localStorage.setItem("role", role);

        if (role === "admin_space") {
          router.push("/admin");
        } else {
          router.push("/member");
        }
      } else {
        setErrorMsg(result.message || "Gagal masuk. Periksa username dan password.");
        setLoading(false);
      }
    } catch (err) {
      setErrorMsg("Kesalahan jaringan. Silakan coba lagi nanti.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-container">
        {/* Left Panel */}
        <div className="auth-left">
          <div className="logo-icon"><i className='bx bx-buildings'></i></div>
          <h1>Welcome!</h1>
          <hr style={{ width: "50px", border: "1px solid white", marginBottom: "30px" }} />
          <p>
            Silakan masuk untuk mengelola reservasi ruang kerja Anda. Kami siap memberikan
            pengalaman terbaik bagi produktivitas bisnis Anda.
          </p>
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "10px" }}>
              Belum memiliki akun?
            </p>
            <Link href="/register" className="btn-glass">
              Daftar Akun Baru
            </Link>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="auth-right">
          <div className="auth-form-box">
            <h2>{currentLoginType === "member" ? "Sign In Member" : "Sign In Admin"}</h2>
            <div className="auth-tabs">
              <button
                type="button"
                className={currentLoginType === "member" ? "active" : ""}
                onClick={() => {
                  setCurrentLoginType("member");
                  setErrorMsg("");
                }}
              >
                Member
              </button>
              <button
                type="button"
                className={currentLoginType === "admin_space" ? "active" : ""}
                onClick={() => {
                  setCurrentLoginType("admin_space");
                  setErrorMsg("");
                }}
              >
                Admin Space
              </button>
            </div>
            
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="auth-form-group">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  id="username"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-gradient" disabled={loading}>
                {loading ? "Processing..." : "Submit"}
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
