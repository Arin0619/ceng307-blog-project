import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo" onClick={() => navigate('/')}>
          📝 Blog Platformu
        </h1>

        <div className="navbar-menu">
          {user ? (
            <>
              <span className="user-info">
                👤 {user.name} ({user.role === 'teacher' ? 'Yazar' : 'Okuyucu'})
              </span>
              {user.role === 'teacher' && (
                <button onClick={() => navigate('/create-post')} className="btn-nav">
                  Yeni Yazı
                </button>
              )}
              <button onClick={handleLogout} className="btn-nav btn-logout">
                Çıkış
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn-nav">
                Giriş
              </button>
              <button onClick={() => navigate('/register')} className="btn-nav">
                Kayıt Ol
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
