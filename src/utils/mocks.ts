import { Product, Products, PromoProduct, Promos } from '../types/product';
import { system, name, datatype, lorem, commerce } from 'faker';
import { Review } from '../types/review';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';

export const makeFakeReview = (): Review => ({
  id: datatype.string(),
  cameraId: datatype.number(),
  userName: name.title(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.paragraph(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toDateString(),
});

export const makeFakePromo = (): PromoProduct => ({
  id: datatype.number(),
  name: name.title(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakeProduct = (): Product => ({
  id: datatype.number(),
  name: name.title(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  vendorCode: datatype.uuid(),
  type: datatype.string(),
  category: datatype.string(),
  description: lorem.paragraph(),
  level: datatype.string(),
  price: +commerce.price(),
  rating: datatype.number(5),
  reviewCount: datatype.number(),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  BUSKET: { currentBusketItem: null, isAddBusketVisible: false },
  PRODUCT: {
    currentProduct: makeFakeProduct(),
    isDataLoading: false,
    products: new Array(3).fill(makeFakeProduct()) as Products,
    promo: new Array(3).fill(makeFakePromo()) as Promos,
    similarProducts: new Array(3).fill(makeFakeProduct()) as Products,
  },
  REVIEW: {
    isDataLoading: false,
    isReviewAdded: false,
    isReviewModalVisible: false,
    isSuccessModalVisible: false,
    productReviews: new Array(3).fill(makeFakeReview()) as Review[],
  },
  ...(initialState ?? {}),
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
