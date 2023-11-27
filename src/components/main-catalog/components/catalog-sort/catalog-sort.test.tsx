import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../../utils/mock-component';
import { makeFakeStore } from '../../../../utils/mocks';
import { CatalogSort } from './catalog-sort';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Component: CatalogSort', () => {
  it('should render properly', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(<CatalogSort />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(4);
  });

  it('should set proper search params for ascending and descending sort', async () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(<CatalogSort />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('up'));
    expect(mockHistory.location.search).toMatch('order=asc');

    await userEvent.click(screen.getByTestId('down'));
    expect(mockHistory.location.search).toMatch('order=desc');
  });

  it('should set proper search params for price and popularity sort type', async () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(<CatalogSort />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('sortPopular'));
    expect(mockHistory.location.search).toMatch('sort=popular');

    await userEvent.click(screen.getByTestId('sortPrice'));
    expect(mockHistory.location.search).toMatch('sort=price');
  });
});
