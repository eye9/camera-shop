import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Product, Products, Promos } from '../types/product';
import { APIRoutes } from '../const';
import { AddReview, Review, Reviews } from '../types/review';
import { setCoupon } from './busket-process';

export const TIMEOUT_SHOW_ERROR = 2000;

export const sendOrder = createAsyncThunk<
  undefined,
  { ids: number[]; coupon: string | null },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('busket/sendOrder', async ({ids, coupon}, { extra: api }) => {
  await api.post(`${APIRoutes.Order}`, {camerasIds: ids, coupon});
  return undefined;
});
export const fetchCouponDiscount = createAsyncThunk<
  number,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchDiscount', async (coupon, { dispatch, extra: api }) => {
  const { data } = await api.post<number>(APIRoutes.Coupones, {coupon});
  dispatch(setCoupon(coupon));
  return data;
});
export const fetchProductsActionWithPrice = createAsyncThunk<
  Products,
  { min: number; max: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchWithPrice', async ({min, max}, { extra: api }) => {
  const { data } = await api.get<Products>(`${APIRoutes.Products}/?price_gte=${min}&price_lte=${max}`);
  return data;
});
export const fetchProductsAction = createAsyncThunk<
  Products,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetch', async (_arg, { extra: api }) => {
  const { data } = await api.get<Products>(APIRoutes.Products);
  return data;
});

export const fetchProductAction = createAsyncThunk<
  Product,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('product/fetch', async (id, { extra: api }) => {
  const { data } = await api.get<Product>(`${APIRoutes.Products}/${id}`);
  return data;
});

export const fetchSimilarProductsAction = createAsyncThunk<
  Products,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchSimilar', async (id, { extra: api }) => {
  const { data } = await api.get<Products>(
    `${APIRoutes.Products}/${id}/similar`
  );
  return data;
});

export const fetchPromoAction = createAsyncThunk<
  Promos,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchPromo', async (_arg, { extra: api }) => {
  const { data } = await api.get<Promos>(APIRoutes.Promo);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Reviews,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('products/fetchReviews', async (id, { extra: api }) => {
  const { data } = await api.get<Reviews>(
    `${APIRoutes.Products}/${id}/reviews`
  );
  return data;
});

export const sendReviewAction = createAsyncThunk<
  Review,
  AddReview,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('reviews/add', async (review, { extra: api }) => {
  const { data } = await api.post<Review>(APIRoutes.Reviews, review);
  return data;
});
