import { render, screen } from '@testing-library/react';
import { withHistory, withRouter, withStore } from '../../utils/mock-component';
import { makeFakeProduct, makeFakeStore } from '../../utils/mocks';
import { BusketElement } from './busket-element';

describe('Component: Busket Page ', () => {
  it('should render properly', () => {
    const store = makeFakeStore();
    const { withStoreComponent } = withStore(<BusketElement />, store);

    render(withRouter(withStoreComponent));

    expect(
      screen.getByText(
        'Если у вас есть промокод на скидку, примените его в этом поле'
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите промокод')).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });

  it('should show busket items', () => {
    const products = new Array(3).fill({}).map(makeFakeProduct);
    const store = makeFakeStore();
    store.BUSKET = {
      ...store.BUSKET,
      busket: {
        items: products,
        itemsCount: [1, 2, 3],
        coupon: null,
        discount: 0,
      },
    };
    const { withStoreComponent } = withStore(<BusketElement />, store);
    const component = withHistory(withStoreComponent);

    render(component);

    products.forEach((item) => {
      expect(screen.getByTestId(item.id)).toBeInTheDocument();
    });
  });
});
