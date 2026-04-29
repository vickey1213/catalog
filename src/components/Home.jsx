import { useState, useMemo, useEffect } from 'react';
import data from '../data.json';
import { categoryOrder, groupByCategory } from '../utils';
import CategorySection from './CategorySection';

// Skeleton component for loading state
function ItemCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
      <div className="aspect-[4/3] bg-slate-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
        <div className="h-10 bg-slate-200 rounded animate-pulse w-full" />
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    let result = [...data];
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.itemname.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.itemname.localeCompare(b.itemname);
        case 'category': return a.category.localeCompare(b.category);
        default: return 0;
      }
    });
    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  const totalItems = filteredData.length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <header className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 lg:p-12 mb-8">
        <div className="max-w-2xl">
          <span className="text-indigo-600 font-semibold uppercase tracking-wider text-xs mb-2 block">Dynamic Catalog</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">Multi-category product showcase</h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4">Explore the catalog by category and view every item's details with fully dynamic attributes.</p>
        </div>
      </header>

      {/* Filters and Controls */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              aria-label="Search products"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors sm:w-48"
            aria-label="Filter by category"
          >
            {allCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors sm:w-40"
            aria-label="Sort products"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
        <p className="text-sm text-slate-500 mt-3">
          Showing {totalItems} {totalItems === 1 ? 'product' : 'products'}
        </p>
      </div>

      <main>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <ItemCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center text-4xl text-slate-400 font-light">🔍</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No products found</h2>
            <p className="text-slate-500 mb-6">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : searchQuery.trim() || selectedCategory !== 'all' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredData.map((item, index) => (
              <CategorySection.ItemCard key={item.itemname} item={item} index={index} />
            ))}
          </div>
        ) : (
          categoryOrder.filter((category) => categories[category]).map((category) => (
            <CategorySection key={category} category={category} items={categories[category]} />
          ))
        )}
      </main>
    </div>
  );
}