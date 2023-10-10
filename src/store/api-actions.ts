import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Products } from '../types/product';
import { APIRoutes } from '../const';
import { loadProducts, setDataLoadingStatus } from './actions';

export const fetchProductsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('quests/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Products>(APIRoutes.Products);
  dispatch(setDataLoadingStatus(false));
  dispatch(loadProducts(data));
});
