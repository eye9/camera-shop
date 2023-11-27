import { render, screen } from '@testing-library/react';
import { SearchForm } from './search-form';
import userEvent from '@testing-library/user-event';
import { withRouter, withStore } from '../../../../utils/mock-component';
import { makeFakeStore } from '../../../../utils/mocks';
import { LETTERS_TO_OPEN_SEARCH } from '../../const';

describe('Component: Search Form', () => {
  it('should render properly', () => {
    const { withStoreComponent } = withStore(<SearchForm />, makeFakeStore());

    render(withRouter(withStoreComponent));

    expect(screen.getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });

  it('should show search when > 3 letters typed', async () => {
    const store = makeFakeStore();
    const { withStoreComponent } = withStore(<SearchForm />, store);

    render(withRouter(withStoreComponent));
    await userEvent.type(
      screen.getByTestId('search'),
      store.PRODUCT.products[0].name
    );

    expect(screen.getAllByTestId('search-item').length).toBeGreaterThan(0);
  });

  it('should not show search items when < 3 letters typed', async () => {
    const store = makeFakeStore();
    const { withStoreComponent } = withStore(<SearchForm />, store);

    render(withRouter(withStoreComponent));
    await userEvent.type(
      screen.getByTestId('search'),
      store.PRODUCT.products[0].name.slice(0, LETTERS_TO_OPEN_SEARCH - 1)
    );

    expect(screen.queryByTestId('search-item')).not.toBeInTheDocument();
  });
});
