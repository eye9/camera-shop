import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Product, Products } from '../types/product';

export type Busket = { items: Products; itemsCount: number[] };

type BusketProcess = {
  currentBusketItem: Product | null;
  isAddBusketVisible: boolean;
  isSuccessVisible: boolean;
  busket: Busket;
};

const initialState: BusketProcess = {
  currentBusketItem: null,
  isAddBusketVisible: false,
  isSuccessVisible: false,
  busket: {
    items: [],
    itemsCount: [],
  },
};

function addToBusket(state: BusketProcess, product: Product) {
  const index = state.busket.items.findIndex((item) => item.id === product.id);
  if (index === -1) {
    state.busket.items.push(product);
    state.busket.itemsCount.push(1);
  } else {
    const count = state.busket.itemsCount[index];
    state.busket.itemsCount[index] = count + 1;
  }
}

export const busketProcess = createSlice({
  name: NameSpace.Busket,
  initialState,
  reducers: {
    busketAdd: (state, action: PayloadAction<Product>) => {
      state.isAddBusketVisible = false;
      state.isSuccessVisible = true;
      addToBusket(state, action.payload);
    },
    addingToBusket: (state, action: PayloadAction<Product>) => {
      state.isAddBusketVisible = true;
      state.currentBusketItem = action.payload;
    },
    setBusketModalVisibleStatus: (state, action: PayloadAction<boolean>) => {
      state.isAddBusketVisible = action.payload;
    },
  },
});

export const { addingToBusket, setBusketModalVisibleStatus, busketAdd } =
  busketProcess.actions;
