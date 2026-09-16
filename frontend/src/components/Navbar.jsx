import { Link, useNavigate } from 'react-router-dom';
import { Home, LogIn } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const isLoggedIn = !!userStr;
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <div className="brand-logo">CS</div>
          <span className="brand-text">Coworking Space</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className="nav-item">
            <Home size={18} /> Beranda
          </Link>
          {isLoggedIn ? (
            <>
              <Link to={user.role === 'admin_space' ? '/admin' : '/dashboard'} className="nav-item">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '8px 16px' }}>Keluar</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              <LogIn size={18} /> Masuk
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
