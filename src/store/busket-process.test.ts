import { Product } from '../types/product';
import { makeFakeProduct } from '../utils/mocks';
import { addToBusket, busketProcess, setBusketModalVisibleStatus } from './busket-process';

describe('Busket reducers', () => {
  const initialState = busketProcess.getInitialState();
  const emptyAction = { type: '' };

  it('should return initial state', () => {
    const result = busketProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = busketProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should make busket visible', () => {
    const expected = true;
    const result = busketProcess.reducer(initialState, setBusketModalVisibleStatus(expected));
    expect(result.isAddBusketVisible).toEqual(expected);

  });

  it('should add product to busket and make busket visible', () => {
    const expectedProduct = makeFakeProduct();
    const expectedState = {
      currentBusketItem: expectedProduct,
      isAddBusketVisible: true
    };
    const result = busketProcess.reducer(initialState, addToBusket(expectedProduct));
    expect(result).toEqual(expectedState);
  });
});
