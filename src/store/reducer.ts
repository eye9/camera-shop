import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  addToBusket,
  setBusketModalVisibleStatus,
  loadProductReviews,
  loadPromo,
  loadSimilarProducts,
  setReviewAddedStatus,
  setReviewModalVisibleStatus,
} from './actions';
import { Product, Products, Promos } from '../types/product';
import { Reviews } from '../types/review';
import { NameSpace } from '../const';
import { productProcess } from './product-process';
import { busketProcess } from './busket-process';
import { reviewProcess } from './review-process';

export type InitialState = {
  currentBusketItem: Product | null;
  isAddBusketVisible: boolean;
  currentProduct: Product | null;
  similarProducts: Products;
  productReviews: Reviews;
  promo: Promos;
  isReviewAdded: boolean;
  isReviewModalVisible: boolean;
};

const initialState: InitialState = {
  currentProduct: null,
  similarProducts: [],
  productReviews: [],
  currentBusketItem: null,
  isAddBusketVisible: false,
  promo: [],
  isReviewAdded: false,
  isReviewModalVisible: false,
};

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Busket]: busketProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
});

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBusketModalVisibleStatus, (state) => {
      state.isAddBusketVisible = false;
    })
    .addCase(setReviewModalVisibleStatus, (state, action) => {
      state.isReviewModalVisible = action.payload;
    })
    .addCase(addToBusket, (state, action) => {
      state.isAddBusketVisible = true;
      state.currentBusketItem = action.payload;
    })
    // .addCase(loadProducts, (state, action) => {
    //   state.products = action.payload;
    // })
    // .addCase(loadSimilarProducts, (state, action) => {
    //   state.similarProducts = action.payload;
    // })
    // .addCase(loadProduct, (state, action) => {
    //   state.currentProduct = action.payload;
    // })
    .addCase(loadProductReviews, (state, action) => {
      state.productReviews = action.payload;
    })
    // .addCase(loadPromo, (state, action) => {
    //   state.promo = action.payload;
    // })
    // .addCase(setDataLoadingStatus, (state, action) => {
    //   state.isDataLoading = action.payload;
    // })
    .addCase(setReviewAddedStatus, (state, action) => {
      state.isReviewAdded = action.payload;
      state.isReviewModalVisible = false;
    });
});
