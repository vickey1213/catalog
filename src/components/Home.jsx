import { useState, useMemo, useEffect } from 'react';
import data from '../data.json';
import { categoryOrder, groupByCategory } from '../utils';
import CategorySection from './CategorySection';

// Skeleton component for loading state
function ItemCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton-title" />
        <div className="skeleton-text" />
        <div className="skeleton-button" />
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = groupByCategory(data);
  const allCategories = ['all', ...categoryOrder.filter(cat => categories[cat])];

  // Simulate loading for demo (remove in production with real async data)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort items
  const filteredData = useMemo(() => {
    let result = [...data];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.itemname.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.itemname.localeCompare(b.itemname);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  const totalItems = filteredData.length;

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="max-w-2xl">
          <span className="eyebrow">Dynamic Catalog</span>
          <h1>Multi-category product showcase</h1>
          <p>Explore the catalog by category and view every item's details with fully dynamic attributes.</p>
        </div>
      </header>

      {/* Filters and Controls */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              aria-label="Search products"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field sm:w-48"
            aria-label="Filter by category"
          >
            {allCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field sm:w-40"
            aria-label="Sort products"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mt-3">
          Showing {totalItems} {totalItems === 1 ? 'product' : 'products'}
        </p>
      </div>

      <main>
        {isLoading ? (
          // Loading skeletons
          <div className="card-grid">
            {[...Array(8)].map((_, i) => (
              <ItemCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          // Empty state
          <div className="not-found">
            <div className="not-found-icon">🔍</div>
            <h2>No products found</h2>
            <p>Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="button-link"
            >
              Clear filters
            </button>
          </div>
        ) : selectedCategory === 'all' ? (
          // Show grouped by category
          categoryOrder.filter((category) => categories[category]).map((category) => (
            <CategorySection 
              key={category} 
              category={category} 
              items={categories[category]} 
            />
          ))
        ) : (
          // Show filtered grid
          <div className="card-grid">
            {filteredData.map((item, index) => (
              <CategorySection.ItemCard 
                key={item.itemname} 
                item={item}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}