import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../../../utils/mock-component';
import { makeFakeStore } from '../../../../utils/mocks';
import { CatalogFilter } from './catalog-filter';

describe('Component: CatalogSort', () => {
  it('should render properly', () => {
    const {withStoreComponent} = withStore(<CatalogFilter minPrice={0} maxPrice={100}/>, makeFakeStore());
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox').length).toBe(9);
  });
});
