import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionForm } from '../components/SubscriptionForm';
import { addSubscription } from '../utils/storage';
import '../styles/AddSubscription.css';

// Add Subscription Page - Form to add new subscriptions
export default function AddSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate a slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add subscription to storage
      addSubscription(formData);
      
      // Show success message
      setSuccessMessage('✓ Subscription added successfully!');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Failed to add subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-subscription-page">
      <div className="page-header">
        <h1>➕ Add New Subscription</h1>
        <p>Enter the details of your new subscription to start tracking it</p>
      </div>

      <div className="add-subscription-container">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="form-wrapper">
          <SubscriptionForm 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
