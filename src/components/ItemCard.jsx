import { Link } from 'react-router-dom';
import { slugify } from '../utils';

export default function ItemCard({ item }) {
  return (
    <Link key={item.itemname} to={`/item/${slugify(item.itemname)}`} className="item-card">
      <div className="image-frame">
        <img src={item.image} alt={item.itemname} loading="lazy" />
      </div>
      <div className="card-body">
        <p className="item-category">{item.category}</p>
        <h3>{item.itemname}</h3>
        <div className="preview-properties">
          {item.itemprops.slice(0, 3).map((prop) => (
            <span key={prop.label} className="preview-property">
              {prop.label}: {prop.value}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
