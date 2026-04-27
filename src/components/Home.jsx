import data from '../data.json';
import { categoryOrder, groupByCategory } from '../utils';
import CategorySection from './CategorySection';

export default function Home() {
  const categories = groupByCategory(data);

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Dynamic Catalog</p>
          <h1>Multi-category product showcase</h1>
          <p>Explore the catalog by category and view every item’s details with fully dynamic attributes.</p>
        </div>
      </header>

      <main>
        {categoryOrder.filter((category) => categories[category]).map((category) => (
          <CategorySection key={category} category={category} items={categories[category]} />
        ))}
      </main>
    </div>
  );
}
