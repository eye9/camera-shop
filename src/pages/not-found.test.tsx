import { render, screen } from '@testing-library/react';
import { withRouter } from '../utils/mock-component';
import { NotFound } from './not-found';

describe('Component: Not Found Page', () => {
  it('should render properly', () => {
    const messageText = '404 Not Found';
    const linkText = 'На главную';
    render(withRouter(<NotFound />));
    expect(screen.getByText(messageText)).toBeInTheDocument();
    expect(screen.getByText(linkText)).toBeInTheDocument();
  });
});
