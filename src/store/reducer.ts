import { createReducer } from '@reduxjs/toolkit';
import { addToBusket, closeModal, loadProduct, loadProductReviews, loadProducts, loadPromo, loadSimilarProducts, setDataLoadingStatus } from './actions';
import { State } from '../types/state';

const initialState: State = {
  products: [],
  currentProduct: null,
  similarProducts: [],
  productReviews: [],
  currentBusketItem: null,
  isAddBusketVisible: false,
  promo: [],
  isDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(closeModal, (state) => {
      state.isAddBusketVisible = false;
    })
    .addCase(addToBusket, (state, action) => {
      state.isAddBusketVisible = true;
      state.currentBusketItem = action.payload;
    })
    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(loadSimilarProducts, (state, action) => {
      state.similarProducts = action.payload;
    })
    .addCase(loadProduct, (state, action) => {
      state.currentProduct = action.payload;
    })
    .addCase(loadProductReviews, (state, action) => {
      state.productReviews = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    });
});
