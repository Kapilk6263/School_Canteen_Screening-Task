import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Users, PlusCircle } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="container nav-container">
                    <Link to="/" className="brand">
                        <UtensilsCrossed size={24} />
                        <span>School Canteen</span>
                    </Link>
                    <div className="nav-links">
                        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                            <UtensilsCrossed size={18} />
                            Snacks
                        </Link>
                        <Link to="/students" className={`nav-item ${isActive('/students') ? 'active' : ''}`}>
                            <Users size={18} />
                            Students
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="container content">
                {children}
            </main>

            <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .navbar {
          background: white;
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--primary-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-item:hover, .nav-item.active {
          color: var(--primary-color);
        }
        .content {
          padding-top: 2rem;
          padding-bottom: 2rem;
          flex: 1;
        }
      `}</style>
        </div>
    );
};

export default Layout;
