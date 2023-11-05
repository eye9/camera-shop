import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Reviews } from '../types/review';
import { fetchReviewsAction, sendReviewAction } from './api-actions';

type ReviewProcess = {
  productReviews: Reviews;
  isDataLoading: boolean;
  isReviewAdded: boolean;
  isReviewModalVisible: boolean;
  isSuccessModalVisible: boolean;
};

const initialState: ReviewProcess = {
  productReviews: [],
  isDataLoading: false,
  isReviewAdded: false,
  isReviewModalVisible: false,
  isSuccessModalVisible: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setReviewModalVisibleStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalVisible = action.payload;
    },
    setSuccessModalVisibleStatus: (state, action: PayloadAction<boolean>) => {
      state.isSuccessModalVisible = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isReviewAdded = true;
        state.isReviewModalVisible = false;
        state.isSuccessModalVisible = true;
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

export const { setReviewModalVisibleStatus, setSuccessModalVisibleStatus } = reviewProcess.actions;
