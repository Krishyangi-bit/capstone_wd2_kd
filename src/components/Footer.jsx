import React from 'react';
import '../styles/Footer.css';

// Footer Component
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} SubTrack. All rights reserved.</p>
        <p>Built with React • Your subscriptions, your control.</p>
      </div>
    </footer>
  );
}
