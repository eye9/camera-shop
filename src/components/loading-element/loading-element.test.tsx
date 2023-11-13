import { render, screen } from '@testing-library/react';
import { LoadingElement } from './loading-element';

describe('Component: Loading Screen', () => {
  it('should render correctly', () => {
    const expectedText = /Loading/i;

    render(<LoadingElement />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
