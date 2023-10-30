import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Reviews } from '../types/review';
import { fetchReviewsAction, sendReviewAction } from './api-actions';

type ReviewProcess = {
  productReviews: Reviews;
  isDataLoading: boolean;
  isReviewAdded: boolean;
  isReviewModalVisible: boolean;
};

const initialState: ReviewProcess = {
  productReviews: [],
  isDataLoading: false,
  isReviewAdded: false,
  isReviewModalVisible: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setReviewModalVisibleStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalVisible = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isReviewAdded = true;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.productReviews = action.payload;
        state.isDataLoading = false;
      });
  },
});
