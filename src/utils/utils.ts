import { SortOrders } from '../components/main-catalog/const';
import { Product } from '../types/product';
import { Review } from '../types/review';

export function formatPrice(price: number) {
  return price.toLocaleString();
}

export function reviewSorter(a: Review, b: Review): number {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);

  if (dateA > dateB) {
    return -1;
  } else if (dateA < dateB) {
    return 1;
  }

  return 0;
}

export const priceSorter =
  (sortOrder: SortOrders) => (a: Product, b: Product) =>
    sortOrder === SortOrders.Asc ? a.price - b.price : b.price - a.price;
export const popularitySorter =
  (sortOrder: SortOrders) => (a: Product, b: Product) =>
    sortOrder === SortOrders.Asc ? a.rating - b.rating : b.rating - a.rating;
