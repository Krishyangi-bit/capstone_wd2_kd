import React, { useState, useEffect } from 'react';
import '../styles/SubscriptionForm.css';

// Reusable Subscription Form Component (for adding and editing)
export function SubscriptionForm({ onSubmit, initialData = null, isLoading = false }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'entertainment',
    price: '',
    billingCycle: 'monthly',
    renewalDate: '',
    status: 'active',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.renewalDate) {
      newErrors.renewalDate = 'Renewal date is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      // Reset form if not editing
      if (!initialData) {
        setFormData({
          name: '',
          category: 'entertainment',
          price: '',
          billingCycle: 'monthly',
          renewalDate: '',
          status: 'active'
        });
      }
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="subscription-form" onSubmit={handleSubmit}>
      {/* Subscription Name */}
      <div className="form-group">
        <label htmlFor="name">Subscription Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Netflix, Spotify"
          disabled={isLoading}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Category */}
      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="entertainment">Entertainment</option>
          <option value="productivity">Productivity</option>
          <option value="education">Education</option>
          <option value="cloud">Cloud Storage</option>
          <option value="music">Music</option>
          <option value="fitness">Fitness</option>
          <option value="news">News</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Price and Billing Cycle Row */}
      <div className="form-row">
        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price (₹) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            step="1"
            min="0"
            disabled={isLoading}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        {/* Billing Cycle */}
        <div className="form-group">
          <label htmlFor="billingCycle">Billing Cycle *</label>
          <select
            id="billingCycle"
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Renewal Date */}
      <div className="form-group">
        <label htmlFor="renewalDate">Renewal Date *</label>
        <input
          type="date"
          id="renewalDate"
          name="renewalDate"
          value={formData.renewalDate}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.renewalDate && <span className="error-message">{errors.renewalDate}</span>}
      </div>

      {/* Status */}
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Subscription' : 'Add Subscription'}
      </button>
    </form>
  );
}
