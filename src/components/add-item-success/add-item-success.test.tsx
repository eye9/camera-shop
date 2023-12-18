import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AddItemSuccess } from './add-item-success';

describe('Component: AddItemSuccess ', () => {
  it('should render properly', () => {
    const store = makeFakeStore();
    const { withStoreComponent } = withStore(<AddItemSuccess />, store);

    render(withRouter(withStoreComponent));

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });
});
