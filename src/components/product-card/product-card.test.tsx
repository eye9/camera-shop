import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeProduct, makeFakeStore } from '../../utils/mocks';
import { ProductCard } from './product-card';

describe('Component: Product Card', () => {
  it('should render properly', () => {
    const product = makeFakeProduct();
    const {withStoreComponent} = withStore(<ProductCard product={product} />, makeFakeStore());
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
  });
});
