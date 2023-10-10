import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Products, PromoProduct } from '../types/product';
import { APIRoutes } from '../const';
import { loadProducts, loadPromo, setDataLoadingStatus } from './actions';

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
  const { data } = await api.get<PromoProduct>(APIRoutes.Promo);
  dispatch(setDataLoadingStatus(false));
  dispatch(loadPromo(data));
});
