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
  setDataLoadingStatus,
} from './actions';
import { Reviews } from '../types/review';

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
  const { data } = await api.get<Reviews>(`${APIRoutes.Products}/${id}/reviews`);
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
