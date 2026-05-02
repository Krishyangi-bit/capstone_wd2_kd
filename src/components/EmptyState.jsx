import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EmptyState.css';

// Empty State Component - shown when no subscriptions exist
export function EmptyState({ title, message, icon = '📭', actionLink = '/add', actionText = 'Add Subscription' }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
      {actionLink && (
        <Link to={actionLink} className="empty-state-action">
          {actionText}
        </Link>
      )}
    </div>
  );
}
