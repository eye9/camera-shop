import { createAction } from '@reduxjs/toolkit';
import { Product, Products, Promos } from '../types/product';
import { Reviews } from '../types/review';

export const closeModal = createAction('window/closeModal');
export const addToBusket = createAction<Product>('products/addToBasket');
export const loadProducts = createAction<Products>('products/load');
export const loadProductReviews = createAction<Reviews>('products/loadReviews');
export const loadProduct = createAction<Product>('products/loadOne');
export const loadPromo = createAction<Promos>('products/loadPromo');
export const setDataLoadingStatus = createAction<boolean>('products/setLoadingStatus');

