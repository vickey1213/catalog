import { Link } from 'react-router-dom';
import { slugify } from '../utils';
import { useState } from 'react';

export default function ItemCard({ item, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate a mock price based on category
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

  // Generate a short description based on properties
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
      className="item-card fade-in" 
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link 
        to={`/item/${slugify(item.itemname)}`} 
        className="block"
        aria-label={`View details for ${item.itemname}`}
      >
        <div className="image-frame">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img 
            src={item.image} 
            alt={item.itemname}
            loading="lazy"
            data-loading="lazy"
            className={imageLoaded ? 'loaded' : ''}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <span className="text-slate-400 text-sm">Image unavailable</span>
            </div>
          )}
        </div>
        <div className="card-body">
          <span className="item-category">{item.category}</span>
          <h3 className="line-clamp-2">{item.itemname}</h3>
          <p className="card-description">{getDescription(item)}</p>
          <p className="card-price">{formattedPrice}</p>
          <span className="card-cta">
            View Details
          </span>
        </div>
      </Link>
    </article>
  );
}
