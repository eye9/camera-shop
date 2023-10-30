import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  reducers: {
    addToBusket: (state, action: PayloadAction<Product>) => {
      state.isAddBusketVisible = true;
      state.currentBusketItem = action.payload;
    },
    setBusketModalVisibleStatus: (state, action: PayloadAction<boolean>) => {
      state.isAddBusketVisible = action.payload;
    }
  },
});

export const { addToBusket, setBusketModalVisibleStatus } = busketProcess.actions;
