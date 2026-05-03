import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Header.css';

// Header/Navigation Component
export function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`header ${isDark ? 'dark' : 'light'}`}>
      <div className="header-container">
        {/* Logo/Brand */}
        <div className="logo">
          <h1>SubTrack</h1>
          <p>Subscription Manager</p>
        </div>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/add" className="nav-link">Add Subscription</Link>
          <Link to="/manage" className="nav-link">Manage</Link>
        </nav>

        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
