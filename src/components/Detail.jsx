import { Link, useNavigate, useParams } from 'react-router-dom';
import data from '../data.json';
import { slugify } from '../utils';
import { useState } from 'react';

export default function Detail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const item = data.find((entry) => slugify(entry.itemname) === slug);

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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pt-4">
        <button 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 shadow-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 mb-6"
          onClick={() => navigate(-1)}
        >
          Back to catalog
        </button>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center text-4xl text-slate-400 font-light">?</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Item not found</h2>
          <p className="text-slate-500 mb-6">Try selecting a valid product from the home page.</p>
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pt-4">
      <button 
        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 shadow-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 mb-6"
        onClick={() => navigate(-1)}
      >
        Back to catalog
      </button>
      <article className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 min-h-[300px] lg:min-h-[500px]">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            )}
            <img 
              src={item.image} 
              alt={item.itemname}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover ${imageLoaded ? 'loaded' : ''}`}
            />
          </div>
          <div className="p-6 lg:p-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700">{item.category}</span>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2 mb-4">{item.itemname}</h1>
            <p className="text-3xl font-bold text-slate-900 mb-6">{formattedPrice}</p>
            
            <div className="space-y-3">
              {item.itemprops.map((prop) => (
                <div key={prop.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-medium">{prop.label}</span>
                  <strong className="text-slate-900 font-semibold">{prop.value}</strong>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200">
                Add to Cart
              </button>
              <button className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                ♡ Save
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
