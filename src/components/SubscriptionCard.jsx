import React from 'react';
import '../styles/SubscriptionCard.css';

// Reusable Subscription Card Component
export function SubscriptionCard({ subscription, onEdit, onDelete, onStatusChange }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate days until renewal
  const daysUntilRenewal = () => {
    const renewal = new Date(subscription.renewalDate);
    const today = new Date();
    const diff = renewal - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const days = daysUntilRenewal();

  return (
    <div className="subscription-card">
      {/* Header with name and category */}
      <div className="card-header">
        <div>
          <h3 className="card-title">{subscription.name}</h3>
          <p className="card-category">{subscription.category}</p>
        </div>
        <span className={`card-status ${subscription.status}`}>
          {subscription.status === 'active' ? '✓ Active' : '⊘ Inactive'}
        </span>
      </div>

      {/* Pricing info */}
      <div className="card-pricing">
        <div className="price-item">
          <span className="price-label">
            {subscription.billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
          </span>
          <span className="price-value">${subscription.price.toFixed(2)}</span>
        </div>
        {subscription.billingCycle === 'yearly' && (
          <div className="price-item">
            <span className="price-label">Per Month</span>
            <span className="price-value">${(subscription.price / 12).toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Renewal date and status */}
      <div className="card-renewal">
        <p className="renewal-label">Renewal Date</p>
        <p className="renewal-date">{formatDate(subscription.renewalDate)}</p>
        {days <= 7 && days > 0 && (
          <p className="renewal-warning">⚠️ Renews in {days} days</p>
        )}
        {days <= 0 && (
          <p className="renewal-urgent">🔔 Due for renewal!</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="card-actions">
        <button
          className={`btn-status ${subscription.status}`}
          onClick={() => onStatusChange(subscription.id)}
          title="Toggle subscription status"
        >
          {subscription.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
        <button
          className="btn-edit"
          onClick={() => onEdit(subscription)}
          title="Edit subscription"
        >
          ✏️ Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            if (window.confirm(`Delete "${subscription.name}"?`)) {
              onDelete(subscription.id);
            }
          }}
          title="Delete subscription"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
