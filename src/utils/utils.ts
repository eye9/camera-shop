import { Review } from '../types/review';

export function formatPrice(price: number) {
  return price.toLocaleString();
}

export function reviewSorter(a: Review, b: Review): number {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);

  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  }

  return 0;
}
