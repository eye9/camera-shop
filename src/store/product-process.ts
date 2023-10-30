import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { fetchProductAction, fetchProductsAction, fetchPromoAction, fetchSimilarProductsAction } from './api-actions';
import { Product, Products, Promos } from '../types/product';

type ProductProcess = {
  products: Products;
  currentProduct: Product | null;
  isDataLoading: boolean;
  similarProducts: Products;
  promo: Promos;
};

const initialState: ProductProcess = {
  products: [],
  currentProduct: null,
  isDataLoading: false,
  promo: [],
  similarProducts: [],
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isDataLoading = false;
      });
  },
});

