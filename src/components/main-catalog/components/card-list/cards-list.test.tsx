import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../../../utils/mock-component';
import { makeFakeProduct } from '../../../../utils/mocks';
import { CardsList } from './cards-list';
import { Products } from '../../../../types/product';

describe('Component: Product Card List', () => {
  it('should render properly', () => {
    const products = Array.from({length: 3}, makeFakeProduct);
    const {withStoreComponent} = withStore(<CardsList products={products} />);
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByText(products[1].name)).toBeInTheDocument();
    expect(screen.getByText(products[2].name)).toBeInTheDocument();
  });


  it('should show message when no product founded', () => {
    const products = [] as Products;
    const {withStoreComponent} = withStore(<CardsList products={products} />);
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('по вашему запросу ничего не найдено')).toBeInTheDocument();
  });
});
