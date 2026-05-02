import React from 'react';
import '../styles/SearchBar.css';

// Search Bar Component
export function SearchBar({ value, onChange, placeholder = "Search subscriptions..." }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
}
