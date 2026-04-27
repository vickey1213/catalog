export const categoryOrder = ['Cars', 'Bikes', 'Phones', 'Computers'];

export function slugify(value) {
  return encodeURIComponent(value.toLowerCase().replace(/\s+/g, '-'));
}

export function groupByCategory(items) {
  return items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});
}
