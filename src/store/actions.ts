import { createAction } from '@reduxjs/toolkit';
import { Products, Promos } from '../types/product';

export const loadProducts = createAction<Products>('products/load');
export const loadPromo = createAction<Promos>('products/loadPromo');
export const setDataLoadingStatus = createAction<boolean>('products/setLoadingStatus');

