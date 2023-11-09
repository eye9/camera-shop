import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { PaginatorElement } from './paginator-element';

describe('Component: Paginator Element', () => {
  it('should render properly', () => {
    const {withStoreComponent} = withStore(<PaginatorElement currentPage={1} pagesCount={5} onPageChange={() => undefined}/>);
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
