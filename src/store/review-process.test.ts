import { Reviews } from '../types/review';
import { makeFakeReview } from '../utils/mocks';
import { fetchReviewsAction, sendReviewAction } from './api-actions';
import { reviewProcess, setReviewModalVisibleStatus, setSuccessModalVisibleStatus } from './review-process';

describe('Review reducers', () => {
  const initialState = reviewProcess.getInitialState();
  const emptyAction = { type: '' };

  it('should return initial state', () => {
    const result = reviewProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = reviewProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should show review modal', () => {
    const expected = true;
    const result = reviewProcess.reducer(initialState, setReviewModalVisibleStatus(expected));
    expect(result.isReviewModalVisible).toEqual(expected);
  });

  it('should show review posted success modal', () => {
    const expected = true;
    const result = reviewProcess.reducer(initialState, setSuccessModalVisibleStatus(expected));
    expect(result.isSuccessModalVisible).toEqual(expected);
  });

  it('should add review and show success modal', () => {
    const expectedReview = makeFakeReview();
    const expectedState = {
      isDataLoading: false,
      isReviewAdded: true,
      isReviewModalVisible: false,
      isSuccessModalVisible: true,
      productReviews: []
    };
    const result = reviewProcess.reducer(initialState, sendReviewAction.fulfilled(expectedReview, '', expectedReview));
    expect(result).toEqual(expectedState);
  });

  it('should set data loading flag', () => {
    const expectedState = {
      isDataLoading: true,
      isReviewAdded: false,
      isReviewModalVisible: false,
      isSuccessModalVisible: false,
      productReviews: []
    };
    const result = reviewProcess.reducer(initialState, fetchReviewsAction.pending('', ''));
    expect(result).toEqual(expectedState);
  });

  it('should return reviews and clear data loading flag', () => {
    const mockReviews = new Array(3).fill(makeFakeReview()) as Reviews;
    const expectedState = {
      isDataLoading: false,
      isReviewAdded: false,
      isReviewModalVisible: false,
      isSuccessModalVisible: false,
      productReviews: mockReviews
    };
    const result = reviewProcess.reducer(initialState, fetchReviewsAction.fulfilled(mockReviews, '', ''));
    expect(result).toEqual(expectedState);
  });

});
