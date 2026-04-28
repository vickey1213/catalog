import { Link, useNavigate, useParams } from 'react-router-dom';
import data from '../data.json';
import { slugify } from '../utils';
import { useState } from 'react';

export default function Detail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const item = data.find((entry) => slugify(entry.itemname) === slug);

  // Generate mock price based on category
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

  if (!item) {
    return (
      <div className="page-shell detail-page">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to catalog
        </button>
        <div className="not-found">
          <div className="not-found-icon">?</div>
          <h2>Item not found</h2>
          <p>Try selecting a valid product from the home page.</p>
          <Link to="/" className="button-link">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const price = getPrice(item.category);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className="page-shell detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to catalog
      </button>
      <article className="detail-card">
        <div className="detail-image">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img 
            src={item.image} 
            alt={item.itemname}
            onLoad={() => setImageLoaded(true)}
            className={imageLoaded ? 'loaded' : ''}
          />
        </div>
        <div className="detail-content">
          <span className="item-category tag">{item.category}</span>
          <h1>{item.itemname}</h1>
          <p className="card-price text-3xl">{formattedPrice}</p>
          
          <div className="detail-meta">
            {item.itemprops.map((prop) => (
              <div key={prop.label} className="detail-property">
                <span>{prop.label}</span>
                <strong>{prop.value}</strong>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button className="btn-primary flex-1">
              Add to Cart
            </button>
            <button className="btn-secondary">
              ♡ Save
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
