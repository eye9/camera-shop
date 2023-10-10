import { Products, Promos as PromoProducts } from '../types/product';
import { State } from '../types/state';

export const selectProducts = (state: State): Products => state.products;
export const selectPromo = (state: State): PromoProducts => state.promo;
