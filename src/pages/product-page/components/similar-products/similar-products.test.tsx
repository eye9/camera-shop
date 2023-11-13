import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../../../utils/mock-component';
import { makeFakeProduct } from '../../../../utils/mocks';
import { SimilarProducts } from './similar-products';

describe('Component: Product Card', () => {
  it('should render properly', () => {
    const similarCount = 5;
    const products = new Array(similarCount).fill(makeFakeProduct());
    const { withStoreComponent } = withStore(
      <SimilarProducts products={products} />
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.queryAllByTestId('similarProductSlide')).toHaveLength(
      similarCount
    );
    expect(screen.queryAllByRole('button')).toHaveLength(similarCount + 2);
  });
});
