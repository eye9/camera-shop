import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, OrderStatuses } from '../const';
import { Product, Products } from '../types/product';
import { emptyBusket, loadBusket, resetBusket as resetSavedBusket, saveBusket } from '../utils/storage';
import { fetchCouponDiscount, sendOrder } from './api-actions';


export type Busket = {
  items: Products;
  itemsCount: number[];
  discount: number;
  coupon: string | null;
};
export type SetBusketItemPayload = {
  item: Product;
  count: number;
};

type BusketProcess = {
  currentBusketItem: Product | null;
  isAddBusketVisible: boolean;
  isRemoveBusketVisible: boolean;
  isSuccessVisible: boolean;
  isDataLoading: boolean;
  orderStatus: OrderStatuses;
  isCouponValid: boolean | undefined;
  busket: Busket;
};

const initialState: BusketProcess = {
  currentBusketItem: null,
  isAddBusketVisible: false,
  isRemoveBusketVisible: false,
  isSuccessVisible: false,
  isDataLoading: false,
  orderStatus: OrderStatuses.Unknown,
  isCouponValid: undefined,
  busket: loadBusket(),
};

function addToBusket(state: BusketProcess, product: Product) {
  const index = state.busket.items.findIndex((item) => item.id === product.id);
  const isNotInBusket = index === -1;
  if (isNotInBusket) {
    state.busket.items.push(product);
    state.busket.itemsCount.push(1);
  } else {
    const count = state.busket.itemsCount[index];
    state.busket.itemsCount[index] = count + 1;
  }
  saveBusket(state.busket);
}
function subFromBusket(state: BusketProcess, product: Product) {
  const index = state.busket.items.findIndex((item) => item.id === product.id);
  const isInBusket = index !== -1;
  if (isInBusket) {
    const count = state.busket.itemsCount[index];
    state.busket.itemsCount[index] = count > 1 ? count - 1 : 1;
    saveBusket(state.busket);
  }
}
function setBusketItem(state: BusketProcess, product: Product, count: number) {
  const index = state.busket.items.findIndex((item) => item.id === product.id);
  const isInBusket = index !== -1;
  if (isInBusket) {
    state.busket.itemsCount[index] = count;
    saveBusket(state.busket);
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
    saveBusket(state.busket);
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
    busketSub: (state, action: PayloadAction<Product>) => {
      subFromBusket(state, action.payload);
    },
    busketSet: (state, action: PayloadAction<SetBusketItemPayload>) => {
      setBusketItem(state, action.payload.item, action.payload.count);
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
    setCouponValidStatusStatus: (state, action: PayloadAction<boolean | undefined>) => {
      state.isCouponValid = action.payload;
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
    setCoupon: (
      state,
      action: PayloadAction<string>
    ) => {
      state.busket.coupon = action.payload;
    },
    setOrderStatus: (
      state,
      action: PayloadAction<OrderStatuses>
    ) => {
      state.orderStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCouponDiscount.pending, (state) => {
        state.isDataLoading = true;
        state.isCouponValid = undefined;
      })
      .addCase(fetchCouponDiscount.fulfilled, (state, action) => {
        state.busket.discount = action.payload;
        state.isCouponValid = true;
        state.isDataLoading = false;
      })
      .addCase(fetchCouponDiscount.rejected, (state) => {
        state.isCouponValid = false;
        state.busket.coupon = null;
        state.busket.discount = 0;
        state.isDataLoading = false;
      })
      .addCase(sendOrder.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.orderStatus = OrderStatuses.Success;
        state.isDataLoading = false;
        state.busket = emptyBusket;
        state.busket.coupon = null;
        resetSavedBusket();
      })
      .addCase(sendOrder.rejected, (state) => {
        state.orderStatus = OrderStatuses.Error;
        state.isDataLoading = false;
      });
  },
});

export const {
  addingToBusket,
  removingFromBusket,
  setAddBusketModalVisibleStatus,
  setRemoveBusketModalVisibleStatus,
  busketAdd,
  busketSet,
  busketSub,
  busketRemove,
  setCoupon,
  setOrderStatus,
  setCouponValidStatusStatus,
  setBusketSuccessModalVisibleStatus,
} = busketProcess.actions;
