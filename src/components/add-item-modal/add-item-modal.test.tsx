import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { AddItemModal } from './add-item-modal';
import { makeFakeProduct, makeFakeStore } from '../../utils/mocks';

describe('Component: Add To Busket Modal ', () => {
  it('should render properly', () => {
    const product = makeFakeProduct();
    const store = makeFakeStore();
    store.BUSKET = {...store.BUSKET, currentBusketItem: product, isAddBusketVisible: true};
    const { withStoreComponent } = withStore(<AddItemModal />, store);

    render(withStoreComponent);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
