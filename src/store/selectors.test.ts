import { NameSpace } from '../const';
import { Products, Promos } from '../types/product';
import { Reviews } from '../types/review';
import { makeFakeProduct, makeFakePromo, makeFakeReview } from '../utils/mocks';
import {
  selectAddBusketStatus,
  selectCurrentBusketItem,
  selectDataStatus,
  selectProduct,
  selectProductReviews,
  selectProducts,
  selectPromo,
  selectReviewModalStatus,
  selectSimilarProducts,
} from './selectors';

describe('Selectors tests, products process', () => {
  const products: Products = Array.from({ length: 3 }, makeFakeProduct);
  const promo: Promos = Array.from({ length: 3 }, makeFakePromo);
  const state = {
    [NameSpace.Product]: {
      products: products,
      currentProduct: products[0],
      isDataLoading: false,
      promo: promo,
      similarProducts: products,
    },
  };

  it('should return products', () => {
    const result = selectProducts(state);
    expect(result).toBe(products);
  });

  it('should return similar products', () => {
    const result = selectSimilarProducts(state);
    expect(result).toBe(products);
  });

  it('should return current product', () => {
    const result = selectProduct(state);
    expect(result).toBe(products[0]);
  });

  it('should return promo products', () => {
    const result = selectPromo(state);
    expect(result).toBe(promo);
  });

  it('should return promo products', () => {
    const expectedStatus = true;
    state[NameSpace.Product].isDataLoading = expectedStatus;
    const result = selectDataStatus(state);
    expect(result).toBe(expectedStatus);
  });
});

describe('Selectors tests, review process', () => {
  const reviews: Reviews = Array.from({ length: 3 }, makeFakeReview);
  const state = {
    [NameSpace.Review]: {
      productReviews: reviews,
      isDataLoading: false,
      isReviewAdded: false,
      isReviewModalVisible: false,
    },
  };

  it('should return reviews', () => {
    const result = selectProductReviews(state);
    expect(result).toBe(reviews);
  });

  it('should return review modal status', () => {
    const expectedStatus = true;
    state[NameSpace.Review].isReviewModalVisible = expectedStatus;

    const result = selectReviewModalStatus(state);
    expect(result).toBe(expectedStatus);
  });
});

describe('Selectors tests, busket process', () => {
  const busketItem = makeFakeProduct();
  const state = {
    [NameSpace.Busket]: {
      currentBusketItem: busketItem,
      isAddBusketVisible: false,
    },
  };

  it('should return current busket item', () => {
    const result = selectCurrentBusketItem(state);
    expect(result).toBe(busketItem);
  });

  it('should return busket modal status', () => {
    const expectedStatus = true;
    state[NameSpace.Busket].isAddBusketVisible = expectedStatus;

    const result = selectAddBusketStatus(state);
    expect(result).toBe(expectedStatus);
  });
});
