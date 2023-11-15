import { render, screen } from '@testing-library/react';
import { SearchForm } from './search-form';
import { withRouter, withStore } from '../../../../utils/mock-component';
import { makeFakeStore } from '../../../../utils/mocks';

describe('Component: Search Form', () => {
  it('should render properly', () => {
    const { withStoreComponent } = withStore(<SearchForm />, makeFakeStore());

    render(withRouter(withStoreComponent));

    expect(screen.getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
