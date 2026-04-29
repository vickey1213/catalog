import ItemCard from './ItemCard';

export default function CategorySection({ category, items }) {
  return (
    <section className="mb-8 lg:mb-12">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">{category}</h2>
        <span className="text-slate-500 text-sm font-medium">{items.length} items</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {items.map((item, index) => (
          <ItemCard key={item.itemname} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

CategorySection.ItemCard = ItemCard;
