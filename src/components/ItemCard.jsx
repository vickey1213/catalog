import { Link } from 'react-router-dom';
import { slugify } from '../utils';
import { useState } from 'react';

export default function ItemCard({ item, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getPrice = (category) => {
    const prices = {
      Cars: { min: 15000, max: 100000 },
      Phones: { min: 699, max: 1599 },
      Computers: { min: 999, max: 3499 },
      Bikes: { min: 5000, max: 50000 },
    };
    const range = prices[category] || { min: 100, max: 1000 };
    return Math.floor(Math.random() * (range.max - range.min) + range.min);
  };

  const getDescription = (item) => {
    const keyProps = item.itemprops.slice(0, 2).map(p => `${p.label}: ${p.value}`);
    return keyProps.join(' • ');
  };

  const price = getPrice(item.category);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <article 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link 
        to={`/item/${slugify(item.itemname)}`} 
        className="block"
        aria-label={`View details for ${item.itemname}`}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-[4/3]">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}
          <img 
            src={item.image} 
            alt={item.itemname}
            loading="lazy"
            data-loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-300 ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <span className="text-slate-400 text-sm">Image unavailable</span>
            </div>
          )}
        </div>
        <div className="p-4 lg:p-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-3">${item.category}</span>
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{item.itemname}</h3>
          <p className="text-slate-500 text-sm mb-4 line-clamp-2">{getDescription(item)}</p>
          <p className="text-xl font-bold text-slate-900 mb-4">{formattedPrice}</p>
          <span className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            View Details
          </span>
        </div>
      </Link>
    </article>
  );
}
