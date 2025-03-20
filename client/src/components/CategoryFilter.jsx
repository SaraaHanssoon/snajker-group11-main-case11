import React from 'react';

const CategoryFilter = ({ category, onCategorySelect }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category">Filter by Category:</label>
      <select id="category" onChange={e => onCategorySelect(e.target.value)}>
        <option value="">All Categories</option>
        {category.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
