import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Product, Products } from '../types/product';

export type Busket = { items: Products; itemsCount: number[] };

type BusketProcess = {
  currentBusketItem: Product | null;
  isAddBusketVisible: boolean;
  isRemoveBusketVisible: boolean;
  isSuccessVisible: boolean;
  busket: Busket;
};

const initialState: BusketProcess = {
  currentBusketItem: null,
  isAddBusketVisible: false,
  isRemoveBusketVisible: false,
  isSuccessVisible: false,
  busket: {
    items: [],
    itemsCount: [],
  },
};

function addToBusket(state: BusketProcess, product: Product) {
  const index = state.busket.items.findIndex((item) => item.id === product.id);
  const isInBusket = index === -1;
  if (isInBusket) {
    state.busket.items.push(product);
    state.busket.itemsCount.push(1);
  } else {
    const count = state.busket.itemsCount[index];
    state.busket.itemsCount[index] = count + 1;
  }
}

function removeFromBusket(state: BusketProcess, product: Product) {
  const index = state.busket.items.findIndex((item) => item.id === product.id);
  const isInBusket = index !== -1;
  if (isInBusket) {
    state.busket.items = state.busket.items.filter((_, i) => i !== index);
    state.busket.itemsCount = state.busket.itemsCount.filter(
      (_, i) => i !== index
    );
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
    busketRemove: (state, action: PayloadAction<Product>) => {
      state.isRemoveBusketVisible = false;
      removeFromBusket(state, action.payload);
    },
    addingToBusket: (state, action: PayloadAction<Product>) => {
      state.isAddBusketVisible = true;
      state.currentBusketItem = action.payload;
    },
    removingFromBusket: (state, action: PayloadAction<Product>) => {
      state.isRemoveBusketVisible = true;
      state.currentBusketItem = action.payload;
    },
    setAddBusketModalVisibleStatus: (state, action: PayloadAction<boolean>) => {
      state.isAddBusketVisible = action.payload;
    },
    setRemoveBusketModalVisibleStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isRemoveBusketVisible = action.payload;
    },
    setBusketSuccessModalVisibleStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isSuccessVisible = action.payload;
    },
  },
});

export const {
  addingToBusket,
  removingFromBusket,
  setAddBusketModalVisibleStatus,
  setRemoveBusketModalVisibleStatus,
  busketAdd,
  busketRemove,
  setBusketSuccessModalVisibleStatus,
} = busketProcess.actions;
