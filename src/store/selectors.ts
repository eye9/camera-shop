import { NameSpace } from '../const';
import { Product, Products, Promos as PromoProducts } from '../types/product';
import { Reviews } from '../types/review';
import { State } from '../types/state';

export const selectAddBusketStatus = (state: State): boolean => state[NameSpace.Busket].isAddBusketVisible;
export const selectCurrentBusketItem = (state: State): Product | null => state[NameSpace.Busket].currentBusketItem;

export const selectProducts = (state: State): Products => state[NameSpace.Product].products;
export const selectSimilarProducts = (state: State): Products => state[NameSpace.Product].similarProducts;
export const selectProduct = (state: State): Product | null => state[NameSpace.Product].currentProduct;
export const selectPromo = (state: State): PromoProducts => state[NameSpace.Product].promo;
export const selectDataStatus = (state: State): boolean => state[NameSpace.Product].isDataLoading;

export const selectProductReviews = (state: State): Reviews => state[NameSpace.Review].productReviews;
export const selectReviewModalStatus = (state: State): boolean => state[NameSpace.Review].isReviewModalVisible;
