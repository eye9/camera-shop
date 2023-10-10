import { createReducer } from '@reduxjs/toolkit';
import { loadProducts, loadPromo, setDataLoadingStatus } from './actions';
import { State } from '../types/state';

const initialState: State = {
  products: [],
  promo: [],
  isDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    });
});
