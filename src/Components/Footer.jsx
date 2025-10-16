import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.text}>© {new Date().getFullYear()} Scoreboard App. All rights reserved.</p>
        <p style={styles.subtext}>Made with 💙 for game lovers.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '16px 10px',
    textAlign: 'center',
    width: '100%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
  },
  content: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    overflowWrap: 'break-word',
  },
  text: {
    margin: '5px 0',
    fontSize: '14px',
  },
  subtext: {
    margin: 0,
    fontSize: '13px',
    color: '#ccc',
  },
};

export default Footer;
