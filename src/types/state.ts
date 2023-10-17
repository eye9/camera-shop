import { Product, Products, Promos } from './product';
import { store } from '../store/store';

export type AppDispatch = typeof store.dispatch;

export type State = {
  products: Products;
  currentBusketItem: Product | null;
  isAddBusketVisible: boolean;
  currentProduct: Product | null;
  promo: Promos;
  isDataLoading: boolean;
};
