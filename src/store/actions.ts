import { createAction } from '@reduxjs/toolkit';
import { Products } from '../types/product';

export const loadProducts = createAction<Products>('products/load');
export const setDataLoadingStatus = createAction<boolean>('products/setLoadingStatus');

