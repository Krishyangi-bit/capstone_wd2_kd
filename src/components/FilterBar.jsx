import React from 'react';
import '../styles/FilterBar.css';

// Filter Bar Component
export function FilterBar({ selectedCategory, onCategoryChange, selectedStatus, onStatusChange }) {
  return (
    <div className="filter-bar">
      {/* Category Filter */}
      <div className="filter-group">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
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

      {/* Status Filter */}
      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedStatus) && (
        <button
          onClick={() => {
            onCategoryChange('');
            onStatusChange('');
          }}
          className="btn-clear-filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
