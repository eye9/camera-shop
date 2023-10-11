import { Product, Products, Promos } from './product';
import { store } from '../store/store';

export type AppDispatch = typeof store.dispatch;

export type State = {
  products: Products;
  currentProduct: Product | null;
  promo: Promos;
  isDataLoading: boolean;
};
