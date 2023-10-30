import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Product, Products, Promos } from '../types/product';
import { APIRoutes } from '../const';
import { AddReview, Review, Reviews } from '../types/review';

export const TIMEOUT_SHOW_ERROR = 2000;

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
  void,
  AddReview,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('reviews/add', async (review, { extra: api }) => {
  await api.post<Review>(APIRoutes.Reviews, review);
});
