import { render, screen } from '@testing-library/react';
import { BusketItem } from './busket-item';
import { withStore } from '../../../../utils/mock-component';
import { makeFakeProduct, makeFakeStore } from '../../../../utils/mocks';

describe('Component: AddItemSuccess ', () => {
  it('should render properly', () => {
    const product = makeFakeProduct();
    const count = 3;
    const store = makeFakeStore();
    const { withStoreComponent } = withStore(
      <BusketItem item={product} count={count} />,
      store
    );

    render(withStoreComponent);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    expect(
      screen.getByText(`${product.type} ${product.category.toLowerCase()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${product.price.toLocaleString()} ₽`)
    ).toBeInTheDocument();
  });
});
