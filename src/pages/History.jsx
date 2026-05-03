import React, { useState, useEffect } from 'react';
import { getActivityHistory, getAllSubscriptions } from '../utils/storage';
import { EmptyState } from '../components/EmptyState';
import '../styles/History.css';

// History/Analytics Page - Shows subscription history and analytics
export default function History() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalAdded: 0,
    totalDeleted: 0,
    averagePrice: 0,
    mostExpensive: null,
    cheapest: null,
    categoriesBreakdown: {}
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load subscriptions and calculate analytics
  const loadData = () => {
    const subs = getAllSubscriptions();
    setSubscriptions(subs);
    calculateAnalytics(subs);
  };

  // Calculate analytics from subscriptions
  const calculateAnalytics = (subs) => {
    if (subs.length === 0) {
      setAnalytics({
        totalAdded: 0,
        totalDeleted: 0,
        averagePrice: 0,
        mostExpensive: null,
        cheapest: null,
        categoriesBreakdown: {}
      });
      return;
    }

    // Calculate total added (count)
    const totalAdded = subs.length;

    // Calculate average price
    const avgPrice = subs.reduce((sum, sub) => sum + sub.price, 0) / subs.length;

    // Find most expensive and cheapest
    const sorted = [...subs].sort((a, b) => b.price - a.price);
    const mostExpensive = sorted[0];
    const cheapest = sorted[sorted.length - 1];

    // Break down by category
    const categoriesBreakdown = {};
    subs.forEach(sub => {
      categoriesBreakdown[sub.category] = (categoriesBreakdown[sub.category] || 0) + 1;
    });

    setAnalytics({
      totalAdded,
      totalDeleted: 0, // Track through timestamps if needed
      averagePrice: avgPrice,
      mostExpensive,
      cheapest,
      categoriesBreakdown
    });
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      entertainment: '🎬',
      productivity: '💼',
      education: '📚',
      cloud: '☁️',
      music: '🎵',
      fitness: '💪',
      news: '📰',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  const getCategoryColor = (category) => {
    const colors = {
      entertainment: '#FF6B6B',
      productivity: '#4ECDC4',
      education: '#FFE66D',
      cloud: '#95E1D3',
      music: '#C6B5FF',
      fitness: '#FFB6C1',
      news: '#87CEEB',
      other: '#D3D3D3'
    };
    return colors[category] || '#D3D3D3';
  };

  return (
    <div className="history-page">
      <div className="page-header">
        <h1>📊 History & Analytics</h1>
        <p>View your subscription analytics and insights</p>
      </div>

      {subscriptions.length > 0 ? (
        <div className="analytics-container">
          {/* Analytics Cards */}
          <section className="analytics-grid">
            <div className="analytics-card">
              <h3>📦 Total Subscriptions</h3>
              <p className="analytics-value">{analytics.totalAdded}</p>
            </div>

            <div className="analytics-card">
              <h3>💵 Average Price</h3>
              <p className="analytics-value">₹{analytics.averagePrice.toFixed(0)}</p>
            </div>

            <div className="analytics-card">
              <h3>💎 Most Expensive</h3>
              {analytics.mostExpensive ? (
                <>
                  <p className="analytics-label">{analytics.mostExpensive.name}</p>
                  <p className="analytics-value">₹{analytics.mostExpensive.price.toFixed(0)}</p>
                </>
              ) : (
                <p className="analytics-value">-</p>
              )}
            </div>

            <div className="analytics-card">
              <h3>💰 Cheapest</h3>
              {analytics.cheapest ? (
                <>
                  <p className="analytics-label">{analytics.cheapest.name}</p>
                  <p className="analytics-value">₹{analytics.cheapest.price.toFixed(0)}</p>
                </>
              ) : (
                <p className="analytics-value">-</p>
              )}
            </div>
          </section>

          {/* Categories Breakdown */}
          <section className="categories-breakdown">
            <h2>📈 Subscriptions by Category</h2>
            <div className="categories-grid">
              {Object.entries(analytics.categoriesBreakdown).map(([category, count]) => (
                <div key={category} className="category-card">
                  <div
                    className="category-color"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  ></div>
                  <span className="category-icon">{getCategoryIcon(category)}</span>
                  <h3>{category}</h3>
                  <p className="category-count">{count} subscription{count !== 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Subscription Timeline */}
          <section className="timeline-section">
            <h2>📅 Subscription Timeline</h2>
            <div className="timeline">
              {subscriptions.map((sub, index) => (
                <div key={sub.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>{sub.name}</h3>
                    <p className="timeline-date">
                      Added: {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                    <p className="timeline-details">
                      {sub.category} • ₹{sub.price.toFixed(0)} {sub.billingCycle === 'yearly' ? '/year' : '/month'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Spending Summary */}
          <section className="spending-summary">
            <h2>💸 Spending Summary</h2>
            <div className="spending-grid">
              {Object.entries(
                subscriptions.reduce((acc, sub) => {
                  acc[sub.category] = (acc[sub.category] || 0) + sub.price;
                  return acc;
                }, {})
              ).map(([category, total]) => (
                <div key={category} className="spending-item">
                  <span className="spending-category">
                    {getCategoryIcon(category)} {category}
                  </span>
                  <span className="spending-amount">₹{total.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <EmptyState
          title="No History Yet"
          message="Start adding subscriptions to see your analytics and history!"
          icon="📭"
          actionLink="/add"
          actionText="Add Your First Subscription"
        />
      )}
    </div>
  );
}
