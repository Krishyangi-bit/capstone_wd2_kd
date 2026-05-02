import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionForm } from '../components/SubscriptionForm';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { EmptyState } from '../components/EmptyState';
import { getAllSubscriptions, updateSubscription, deleteSubscription } from '../utils/storage';
import '../styles/ManageSubscriptions.css';

// Manage Subscriptions Page - View, edit, search, and filter subscriptions
export default function ManageSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Load subscriptions on mount or check for edit mode
  useEffect(() => {
    loadSubscriptions();
    checkForEditMode();
  }, []);

  // Load subscriptions from storage
  const loadSubscriptions = () => {
    const data = getAllSubscriptions();
    setSubscriptions(data);
  };

  // Check if we should load a subscription for editing
  const checkForEditMode = () => {
    const editData = sessionStorage.getItem('editSubscription');
    if (editData) {
      const subscription = JSON.parse(editData);
      setEditingId(subscription.id);
      sessionStorage.removeItem('editSubscription');
    }
  };

  // Handle form submission (for editing)
  const handleUpdateSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update subscription
      updateSubscription(editingId, formData);
      
      // Show success message
      setSuccessMessage('✓ Subscription updated successfully!');
      setEditingId(null);
      
      // Reload subscriptions
      loadSubscriptions();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle subscription status
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

  // Edit subscription
  const handleEdit = (subscription) => {
    setEditingId(subscription.id);
    window.scrollTo(0, 0);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Get subscription being edited
  const editingSubscription = subscriptions.find(s => s.id === editingId);

  // Filter subscriptions based on search and filters
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || sub.category === selectedCategory;
    const matchesStatus = !selectedStatus || sub.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="manage-subscriptions-page">
      <div className="page-header">
        <h1>⚙️ Manage Subscriptions</h1>
        <p>Search, filter, edit, or delete your subscriptions</p>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="manage-container">
        {/* Edit Form Section - Shows when editing */}
        {editingSubscription && (
          <section className="edit-section">
            <div className="edit-header">
              <h2>✏️ Edit Subscription</h2>
              <button onClick={handleCancelEdit} className="btn-cancel">
                ✕ Cancel
              </button>
            </div>
            <SubscriptionForm
              onSubmit={handleUpdateSubmit}
              initialData={editingSubscription}
              isLoading={isLoading}
            />
          </section>
        )}

        {/* Search and Filter Section */}
        <section className="search-filter-section">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search subscriptions..."
          />
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </section>

        {/* Results Info */}
        <div className="results-info">
          <p>
            Showing <strong>{filteredSubscriptions.length}</strong> of{' '}
            <strong>{subscriptions.length}</strong> subscriptions
          </p>
        </div>

        {/* Subscriptions Grid */}
        {filteredSubscriptions.length > 0 ? (
          <div className="subscriptions-grid">
            {filteredSubscriptions.map(subscription => (
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
            title={subscriptions.length === 0 ? "No Subscriptions" : "No Results"}
            message={subscriptions.length === 0 
              ? "You haven't added any subscriptions yet."
              : "No subscriptions match your search or filters."}
            icon={subscriptions.length === 0 ? "📭" : "🔍"}
            actionLink={subscriptions.length === 0 ? "/add" : null}
            actionText="Add Subscription"
          />
        )}
      </div>
    </div>
  );
}
