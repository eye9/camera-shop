import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Product, Products, Promos } from '../types/product';
import { APIRoutes } from '../const';
import {
  loadProduct,
  loadProductReviews,
  loadProducts,
  loadPromo,
  loadSimilarProducts,
  setDataLoadingStatus,
  setReviewAdded,
} from './actions';
import { AddReview, Review, Reviews } from '../types/review';

export const TIMEOUT_SHOW_ERROR = 2000;

export const fetchProductsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Products>(APIRoutes.Products);
  dispatch(setDataLoadingStatus(false));
  dispatch(loadProducts(data));
});

export const fetchProductAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('product/fetch', async (id, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Product>(`${APIRoutes.Products}/${id}`);
  dispatch(setDataLoadingStatus(false));
  dispatch(loadProduct(data));
});

export const fetchSimilarProductsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchSimilar', async (id, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Products>(
    `${APIRoutes.Products}/${id}/similar`
  );
  dispatch(setDataLoadingStatus(false));
  dispatch(loadSimilarProducts(data));
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchReviews', async (id, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Reviews>(
    `${APIRoutes.Products}/${id}/reviews`
  );
  dispatch(setDataLoadingStatus(false));
  dispatch(loadProductReviews(data));
});

export const fetchPromoAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchPromo', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Promos>(APIRoutes.Promo);
  dispatch(setDataLoadingStatus(false));
  dispatch(loadPromo(data));
});

export const sendReviewAction = createAsyncThunk<
  void,
  AddReview,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('reviews/add', async (review, { dispatch, extra: api }) => {
  await api.post<Review>(APIRoutes.Reviews, review);
  dispatch(setReviewAdded(true));
  dispatch(fetchReviewsAction(String(review.cameraId)));
});
