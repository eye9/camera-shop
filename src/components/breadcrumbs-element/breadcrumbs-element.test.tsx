import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';
import { BreadcrumbsElement } from './breadcrumbs-element';

describe('Component: Breadcrumbs Element', () => {
  it('should render properly', () => {
    const product = makeFakeProduct();
    const withRouterComponent = withRouter(<BreadcrumbsElement lastElement={product.name} />);

    render(withRouterComponent);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});
