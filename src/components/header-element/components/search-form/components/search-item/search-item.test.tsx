import { render, screen } from '@testing-library/react';
import { SearchItem } from './search-item';
import { withHistory, withStore } from '../../../../../../utils/mock-component';
import { makeFakeProduct, makeFakeStore } from '../../../../../../utils/mocks';
import userEvent from '@testing-library/user-event';

describe('Component: Header Search', () => {
  it('should render properly', () => {
    const product = makeFakeProduct();
    render(withHistory(<SearchItem product={product}/>));

    expect(screen.getByText(product.name)).toBeInTheDocument();
  });

  it('should navigate properly', async () => {
    const product = makeFakeProduct();
    const { withStoreComponent } = withStore(<SearchItem product={product}/>, makeFakeStore());

    render(withHistory(withStoreComponent));
    await userEvent.click(screen.getByText(product.name));

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.queryByText('Каталог фото- и видеотехники')).not.toBeInTheDocument();
  });

});
