import React from 'react';
import '../styles/StatCard.css';

// Reusable Statistics Card Component
export function StatCard({ icon, title, value, unit, color }) {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <p className="stat-value">
          {value}
          {unit && <span className="stat-unit">{unit}</span>}
        </p>
      </div>
    </div>
  );
}
