import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { MainCatalog } from './main-catalog';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Main Catalog', () => {
  it('should render properly', () => {
    const {withStoreComponent} = withStore(<MainCatalog />, makeFakeStore());
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });
});
