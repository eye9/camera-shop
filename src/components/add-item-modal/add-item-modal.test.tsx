import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { AddItemModal } from './add-item-modal';
import { makeFakeProduct } from '../../utils/mocks';

describe('Component: Add To Busket Modal ', () => {
  it('should render properly', () => {
    const product = makeFakeProduct();
    const { withStoreComponent } = withStore(<AddItemModal />, {BUSKET: {currentBusketItem: product, isAddBusketVisible: true}});

    render(withStoreComponent);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
