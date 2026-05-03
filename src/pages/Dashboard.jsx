import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { StatCard } from '../components/StatCard';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { EmptyState } from '../components/EmptyState';
import { getAllSubscriptions, updateSubscription, deleteSubscription } from '../utils/storage';
import '../styles/Dashboard.css';

// Dashboard Page - Main page showing statistics and upcoming renewals
export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);

  // Load subscriptions on component mount
  useEffect(() => {
    loadSubscriptions();
  }, []);

  // Load subscriptions from localStorage
  const loadSubscriptions = () => {
    const data = getAllSubscriptions();
    setSubscriptions(data);
  };

  // Toggle subscription status (active/inactive)
  const handleStatusChange = (id) => {
    const subscription = subscriptions.find(s => s.id === id);
    if (subscription) {
      const newStatus = subscription.status === 'active' ? 'inactive' : 'active';
      updateSubscription(id, { status: newStatus });
      loadSubscriptions();
    }
  };

  // Delete subscription
  const handleDelete = (id) => {
    deleteSubscription(id);
    loadSubscriptions();
  };

  // Edit subscription - redirect to manage page
  const handleEdit = (subscription) => {
    // Store subscription in session storage for editing
    sessionStorage.setItem('editSubscription', JSON.stringify(subscription));
    navigate('/manage');
  };

  // Calculate statistics
  const totalSubscriptions = subscriptions.length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const totalMonthlySpending = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, sub) => {
      const monthlyPrice = sub.billingCycle === 'yearly' ? sub.price / 12 : sub.price;
      return sum + monthlyPrice;
    }, 0); 

  // Get upcoming renewals (next 30 days)
  const getUpcomingRenewals = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

    return subscriptions
      .filter(sub => {
        const renewalDate = new Date(sub.renewalDate);
        return renewalDate >= today && renewalDate <= thirtyDaysFromNow && sub.status === 'active';
      })
      .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))
      .slice(0, 5);
  };

  const upcomingRenewals = getUpcomingRenewals();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Track and manage your subscriptions at a glance</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          icon="📦"
          title="Total Subscriptions"
          value={totalSubscriptions}
          color="blue"
        />
        <StatCard
          icon="✅"
          title="Active Subscriptions"
          value={activeSubscriptions}
          color="green"
        />
        <StatCard
          icon="💰"
          title="Monthly Spending"
          value={totalMonthlySpending.toFixed(0)}
          unit="₹"
          color="purple"
        />
        <StatCard
          icon="🔔"
          title="Upcoming Renewals"
          value={upcomingRenewals.length}
          color="orange"
        />
      </div>

      {/* Upcoming Renewals Section */}
      <section className="renewals-section">
        <h2>📅 Upcoming Renewals (Next 30 Days)</h2>
        {upcomingRenewals.length > 0 ? (
          <div className="renewals-list">
            {upcomingRenewals.map(sub => (
              <div key={sub.id} className="renewal-item">
                <div className="renewal-info">
                  <h3>{sub.name}</h3>
                  <p>Renewal: {new Date(sub.renewalDate).toLocaleDateString()}</p>
                </div>
                <div className="renewal-price">
                  ₹{sub.billingCycle === 'yearly' ? (sub.price / 12).toFixed(0) : sub.price.toFixed(0)}/month
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-renewals">No subscriptions expiring in the next 30 days</p>
        )}
      </section>

      {/* Recent Subscriptions Section */}
      <section className="recent-section">
        <h2>🎯 All Subscriptions</h2>
        {subscriptions.length > 0 ? (
          <div className="subscriptions-grid">
            {subscriptions.map(subscription => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Subscriptions Yet"
            message="Start tracking your subscriptions by adding your first one!"
            icon="🎬"
            actionLink="/add"
            actionText="+ Add Subscription"
          />
        )}
      </section>
    </div>
  );
}
