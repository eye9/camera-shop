import { Product, Products, Promos } from './product';
import { store } from '../store/store';
import { Reviews } from './review';

export type AppDispatch = typeof store.dispatch;

export type State = {
  products: Products;
  currentBusketItem: Product | null;
  isAddBusketVisible: boolean;
  currentProduct: Product | null;
  similarProducts: Products;
  productReviews: Reviews;
  promo: Promos;
  isDataLoading: boolean;
  isReviewAdded: boolean;
};
