import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Product } from '../types/product';

type BusketProcess = {
  currentBusketItem: Product | null;
  isAddBusketVisible: boolean;
};

const initialState: BusketProcess = {
  currentBusketItem: null,
  isAddBusketVisible: false,
};

export const busketProcess = createSlice({
  name: NameSpace.Busket,
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
