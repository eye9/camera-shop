import { Products } from './product';
import { store } from '../store/store';

export type AppDispatch = typeof store.dispatch;

export type State = {
  products: Products;
  isDataLoading: boolean;
};
