
import React from 'react';
import type { FacilityCategory } from '../types';

interface CategoryTabsProps {
  categories: FacilityCategory[];
  selectedCategory: FacilityCategory;
  onSelectCategory: (category: FacilityCategory) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white p-2 rounded-xl shadow">
      <nav className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`
              px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${selectedCategory.id === category.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-200'}
            `}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CategoryTabs;
