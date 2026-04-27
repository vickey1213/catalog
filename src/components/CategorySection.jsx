import ItemCard from './ItemCard';

export default function CategorySection({ category, items }) {
  return (
    <section className="category-panel">
      <div className="category-heading">
        <h2>{category}</h2>
        <span>{items.length} items</span>
      </div>
      <div className="card-grid">
        {items.map((item) => (
          <ItemCard key={item.itemname} item={item} />
        ))}
      </div>
    </section>
  );
}
