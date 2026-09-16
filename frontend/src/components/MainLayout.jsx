import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} Coworking Space. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
