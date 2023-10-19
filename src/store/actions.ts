import { createAction } from '@reduxjs/toolkit';
import { Product, Products, Promos } from '../types/product';
import { Reviews } from '../types/review';

export const closeModal = createAction('window/closeModal');
export const addToBusket = createAction<Product>('product/addToBasket');
export const loadProducts = createAction<Products>('products/load');
export const loadSimilarProducts = createAction<Products>('product/loadSimilar');
export const loadProductReviews = createAction<Reviews>('product/loadReviews');
export const loadProduct = createAction<Product>('product/load');
export const loadPromo = createAction<Promos>('promo/load');
export const setDataLoadingStatus = createAction<boolean>('data/setLoadingStatus');

