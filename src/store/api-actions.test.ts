import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import {
  extractActionsTypes,
  makeFakeProduct,
  makeFakePromo,
  makeFakeReview,
  makeFakeStore,
} from '../utils/mocks';
import {
  fetchProductAction,
  fetchProductsAction,
  fetchPromoAction,
  fetchReviewsAction,
  fetchSimilarProductsAction,
  sendReviewAction,
} from './api-actions';
import { APIRoutes } from '../const';

describe('Async actions', () => {
  const axios = createApi();
  const mockAxios = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(makeFakeStore());
  });

  describe('fetchProductsAction', () => {
    it('shouls dispath .pending and .fullfilled and return Products', async () => {
      const mockProducts = new Array(3).fill(makeFakeProduct());
      mockAxios.onGet(APIRoutes.Products).reply(200, mockProducts);

      await store.dispatch(fetchProductsAction());

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchFullfilled = actions.at(1) as ReturnType<
        typeof fetchProductsAction.fulfilled
      >;

      expect(actionTypes).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type,
      ]);
      expect(fetchFullfilled.payload).toEqual(mockProducts);
    });

    it('shouls dispath .pending and .reject on server error', async () => {
      mockAxios.onGet(APIRoutes.Products).reply(400);

      await store.dispatch(fetchProductsAction());

      const actionTypes = extractActionsTypes(store.getActions());
      expect(actionTypes).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchProductAction', () => {
    it('shouls dispath .pending and .fullfilled and return Product', async () => {
      const mockProduct = makeFakeProduct();
      const productId = 1;
      mockAxios
        .onGet(`${APIRoutes.Products}/${productId}`)
        .reply(200, mockProduct);

      await store.dispatch(fetchProductAction(String(productId)));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchFullfilled = actions.at(1) as ReturnType<
        typeof fetchProductAction.fulfilled
      >;

      expect(actionTypes).toEqual([
        fetchProductAction.pending.type,
        fetchProductAction.fulfilled.type,
      ]);
      expect(fetchFullfilled.payload).toEqual(mockProduct);
    });

    it('shouls dispath .pending and .rejected', async () => {
      const productId = 1;
      mockAxios.onGet(`${APIRoutes.Products}/${productId}`).reply(400, {});

      await store.dispatch(fetchProductAction(String(productId)));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchProductAction.pending.type,
        fetchProductAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarProductsAction', () => {
    it('shouls dispath .pending and .fullfilled and return Products', async () => {
      const mockProducts = new Array(3).fill(makeFakeProduct());
      const productId = 1;
      mockAxios
        .onGet(`${APIRoutes.Products}/${productId}/similar`)
        .reply(200, mockProducts);

      await store.dispatch(fetchSimilarProductsAction(String(productId)));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchFullfilled = actions.at(1) as ReturnType<
        typeof fetchSimilarProductsAction.fulfilled
      >;

      expect(actionTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.fulfilled.type,
      ]);
      expect(fetchFullfilled.payload).toEqual(mockProducts);
    });

    it('shouls dispath .pending and .rejected', async () => {
      const productId = 1;
      mockAxios
        .onGet(`${APIRoutes.Products}/${productId}/similar`)
        .reply(400, {});

      await store.dispatch(fetchSimilarProductsAction(String(productId)));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoAction', () => {
    it('shouls dispath .pending and .fullfilled and return Promo Products', async () => {
      const mockProducts = new Array(3).fill(makeFakePromo());
      mockAxios.onGet(`${APIRoutes.Promo}`).reply(200, mockProducts);

      await store.dispatch(fetchPromoAction());

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchFullfilled = actions.at(1) as ReturnType<
        typeof fetchPromoAction.fulfilled
      >;

      expect(actionTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type,
      ]);
      expect(fetchFullfilled.payload).toEqual(mockProducts);
    });

    it('shouls dispath .pending and .rejected', async () => {
      mockAxios.onGet(`${APIRoutes.Promo}`).reply(400);

      await store.dispatch(fetchPromoAction());

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type,
      ]);
    });
  });

  describe('sendReviewAction', () => {
    it('shouls dispath .pending and .fullfilled and return Review', async () => {
      const mockReview = makeFakeReview();
      mockAxios.onPost(`${APIRoutes.Reviews}`).reply(200, mockReview);

      await store.dispatch(sendReviewAction(mockReview));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchFullfilled = actions.at(1) as ReturnType<
        typeof sendReviewAction.fulfilled
      >;

      expect(actionTypes).toEqual([
        sendReviewAction.pending.type,
        sendReviewAction.fulfilled.type,
      ]);
      expect(fetchFullfilled.payload).toEqual(mockReview);
    });

    it('shouls dispath .pending and .rejected', async () => {
      const mockReview = makeFakeReview();
      mockAxios.onPost(`${APIRoutes.Reviews}`).reply(400);

      await store.dispatch(sendReviewAction(mockReview));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        sendReviewAction.pending.type,
        sendReviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('shouls dispath .pending and .fullfilled and return Reviews', async () => {
      const mockReviews = new Array(3).fill(makeFakeReview());
      const productId = 1;
      mockAxios
        .onGet(`${APIRoutes.Products}/${productId}/reviews`)
        .reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(String(productId)));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchFullfilled = actions.at(1) as ReturnType<
        typeof fetchReviewsAction.fulfilled
      >;

      expect(actionTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
      expect(fetchFullfilled.payload).toEqual(mockReviews);
    });

    it('shouls dispath .pending and .rejected', async () => {
      const productId = 1;
      mockAxios.onGet(`${APIRoutes.Products}/${productId}/reviews`).reply(400);

      await store.dispatch(fetchReviewsAction(String(productId)));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);

      expect(actionTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });
});
