import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../../../utils/mock-component';
import { makeFakeStore } from '../../../../utils/mocks';
import { BusketModal } from './busket-modal';
import { OrderStatuses } from '../../../../const';

describe('Component: BusketModal ', () => {
  it('should render properly with success message', () => {
    const store = makeFakeStore();
    store.BUSKET.orderStatus = OrderStatuses.Success;
    const { withStoreComponent } = withStore(
      <BusketModal />,
      store
    );

    render(withRouter(withStoreComponent));

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });

  it('should render properly with error', () => {
    const store = makeFakeStore();
    store.BUSKET.orderStatus = OrderStatuses.Error;
    const { withStoreComponent } = withStore(
      <BusketModal />,
      store
    );

    render(withRouter(withStoreComponent));

    expect(screen.getByText('Ошибка')).toBeInTheDocument();
  });
});
