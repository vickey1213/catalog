import { Link, useNavigate, useParams } from 'react-router-dom';
import data from '../data.json';
import { slugify } from '../utils';

export default function Detail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = data.find((entry) => slugify(entry.itemname) === slug);

  if (!item) {
    return (
      <div className="page-shell detail-page">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="not-found">
          <h2>Item not found</h2>
          <p>Try selecting a valid product from the home page.</p>
          <Link to="/" className="button-link">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to catalog
      </button>
      <article className="detail-card">
        <div className="detail-image">
          <img src={item.image} alt={item.itemname} />
        </div>
        <div className="detail-content">
          <p className="item-category tag">{item.category}</p>
          <h1>{item.itemname}</h1>
          <div className="detail-meta">
            {item.itemprops.map((prop) => (
              <div key={prop.label} className="detail-property">
                <span>{prop.label}</span>
                <strong>{prop.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
