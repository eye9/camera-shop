import { createReducer } from '@reduxjs/toolkit';
import { loadProducts, setDataLoadingStatus } from './actions';
import { State } from '../types/state';

const initialState: State = {
  products: [],
  isDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    });
});
