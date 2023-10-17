import { Product, Products, Promos as PromoProducts } from '../types/product';
import { State } from '../types/state';

export const selectAddBusketStatus = (state: State): boolean => state.isAddBusketVisible;
export const selectCurrentBusketItem = (state: State): Product | null => state.currentBusketItem;
export const selectProducts = (state: State): Products => state.products;
export const selectProduct = (state: State): Product | null => state.currentProduct;
export const selectPromo = (state: State): PromoProducts => state.promo;
export const selectDataStatus = (state: State): boolean => state.isDataLoading;
