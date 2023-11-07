import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakePromo } from '../../utils/mocks';
import { BannerElement } from './banner-element';
import { initialState } from '../../store/product-process';

describe('Component: Add To Busket Modal ', () => {
  it('should render properly', () => {
    const promos = Array.from({length: 3}, () => makeFakePromo());
    const { withStoreComponent } = withStore(<BannerElement />, {PRODUCT: {...initialState, promo: promos}});
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(promos[0].name)).toBeInTheDocument();
    expect(screen.getByAltText(promos[0].name)).toBeInTheDocument();
    expect(screen.getByText(promos[1].name)).toBeInTheDocument();
    expect(screen.getByAltText(promos[1].name)).toBeInTheDocument();
    expect(screen.getByText(promos[2].name)).toBeInTheDocument();
    expect(screen.getByAltText(promos[2].name)).toBeInTheDocument();
  });
});
