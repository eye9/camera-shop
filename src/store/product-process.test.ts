import { Products, Promos } from '../types/product';
import { makeFakeProduct, makeFakePromo } from '../utils/mocks';
import { fetchProductAction, fetchProductsAction, fetchPromoAction, fetchSimilarProductsAction } from './api-actions';
import { productProcess } from './product-process';

describe('Product reducers', () => {
  const initialState = productProcess.getInitialState();
  const emptyAction = { type: '' };

  it('should return initial state', () => {
    const result = productProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = productProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('fetchPromoAction should set data loading flag', () => {
    const expected = true;
    const result = productProcess.reducer(initialState, fetchPromoAction.pending('', undefined));
    expect(result.isDataLoading).toEqual(expected);
  });
  it('fetchSimilarProductsAction should set data loading flag', () => {
    const expected = true;
    const result = productProcess.reducer(initialState, fetchSimilarProductsAction.pending('', ''));
    expect(result.isDataLoading).toEqual(expected);
  });
  it('fetchProductsAction should set data loading flag', () => {
    const expected = true;
    const result = productProcess.reducer(initialState, fetchProductsAction.pending('', undefined));
    expect(result.isDataLoading).toEqual(expected);
  });

  it('should load promo and clear data loading flag', () => {
    const expected = new Array(3).fill(makeFakePromo()) as Promos;
    const expectedState = {
      products: [],
      currentProduct: null,
      isDataLoading: false,
      promo: expected,
      similarProducts: []
    };
    const result = productProcess.reducer(initialState, fetchPromoAction.fulfilled(expected, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should load similar products and clear data loading flag', () => {
    const expected = new Array(3).fill(makeFakeProduct()) as Products;
    const expectedState = {
      products: [],
      currentProduct: null,
      isDataLoading: false,
      promo: [],
      similarProducts: expected
    };
    const result = productProcess.reducer(initialState, fetchSimilarProductsAction.fulfilled(expected, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should load products and clear data loading flag', () => {
    const expected = new Array(3).fill(makeFakeProduct()) as Products;
    const expectedState = {
      products: expected,
      currentProduct: null,
      isDataLoading: false,
      promo: [],
      similarProducts: []
    };
    const result = productProcess.reducer(initialState, fetchProductsAction.fulfilled(expected, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should load product and clear data loading flag', () => {
    const expected = makeFakeProduct();
    const expectedState = {
      products: [],
      currentProduct: expected,
      isDataLoading: false,
      promo: [],
      similarProducts: []
    };
    const result = productProcess.reducer(initialState, fetchProductAction.fulfilled(expected, '', ''));
    expect(result).toEqual(expectedState);
  });

});
