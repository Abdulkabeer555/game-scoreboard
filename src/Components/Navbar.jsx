import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🏆 Game Scoreboard</div>

      {isMobile && (
        <div style={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      )}

      <div
        style={{
          ...(isMobile ? styles.linksMobile : styles.linksDesktop),
          maxHeight: isMobile ? (menuOpen ? '200px' : '0') : 'none',
          opacity: isMobile ? (menuOpen ? 1 : 0) : 1,
          transform: isMobile
            ? menuOpen
              ? 'translateY(0)'
              : 'translateY(-10px)'
            : 'none',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>
          New Setup
        </Link>
        <Link to="/gamepage" style={styles.link} onClick={() => setMenuOpen(false)}>
          Live Game
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 25px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    flexWrap: 'wrap',
    position: 'relative',
  },
  logo: {
    fontSize: '22px',
    fontWeight: '700',
  },
  menuButton: {
    display: 'block',
    fontSize: '26px',
    cursor: 'pointer',
    color: '#fff',
    zIndex: 100,
  },
  linksDesktop: {
    display: 'flex',
    gap: '20px',
  },
  linksMobile: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '70px',
    right: '20px',
    backgroundColor: '#2c3e50',
    border: '1px solid #444',
    borderRadius: '6px',
    padding: '10px',
    width: '160px',
    zIndex: 50,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '4px',
    margin: '4px 0',
    transition: 'background 0.2s',
  },
};

export default Navbar;
