import { NameSpace } from '../const';
import { Product, Products, Promos as PromoProducts } from '../types/product';
import { Reviews } from '../types/review';
import { State } from '../types/state';
import { Busket } from './busket-process';

export const selectAddBusketStatus = (state: Pick<State, typeof NameSpace.Busket>): boolean => state[NameSpace.Busket].isAddBusketVisible;
export const selectAddBusketSuccessStatus = (state: Pick<State, typeof NameSpace.Busket>): boolean => state[NameSpace.Busket].isSuccessVisible;
export const selectCurrentBusketItem = (state: Pick<State, typeof NameSpace.Busket>): Product | null => state[NameSpace.Busket].currentBusketItem;
export const selectBusket = (state: Pick<State, typeof NameSpace.Busket>): Busket => state[NameSpace.Busket].busket;

export const selectProducts = (state: Pick<State, typeof NameSpace.Product>): Products => state[NameSpace.Product].products;
export const selectSimilarProducts = (state: Pick<State, typeof NameSpace.Product>): Products => state[NameSpace.Product].similarProducts;
export const selectProduct = (state: Pick<State, typeof NameSpace.Product>): Product | null => state[NameSpace.Product].currentProduct;
export const selectPromo = (state: Pick<State, typeof NameSpace.Product>): PromoProducts => state[NameSpace.Product].promo;
export const selectDataStatus = (state: Pick<State, typeof NameSpace.Product>): boolean => state[NameSpace.Product].isDataLoading;

export const selectProductReviews = (state: Pick<State, typeof NameSpace.Review>): Reviews => state[NameSpace.Review].productReviews;
export const selectReviewsDataStatus = (state: Pick<State, typeof NameSpace.Review>): boolean => state[NameSpace.Review].isDataLoading;
export const selectReviewModalStatus = (state: Pick<State, typeof NameSpace.Review>): boolean => state[NameSpace.Review].isReviewModalVisible;
export const selectSuccessModalStatus = (state: Pick<State, typeof NameSpace.Review>): boolean => state[NameSpace.Review].isSuccessModalVisible;
