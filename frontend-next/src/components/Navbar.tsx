"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <i className="bx bx-building-house"></i>
          <span>SMART SPACE</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/#home">Beranda</Link>
          </li>
          <li>
            <Link href="/#spaces">Ruangan</Link>
          </li>
          <li>
            <Link href="/#features">Fasilitas</Link>
          </li>
          <li>
            <Link href="/#gallery">Galeri</Link>
          </li>
          <li id="auth-nav-item">
            <Link href="/login" className="btn-primary">
              Masuk / Daftar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
