import { render, screen } from '@testing-library/react';
import { RatingElement } from './rating-element';
import { MAX_STARS } from './rating-element-utils';

describe('Component: Raiting', () => {
  it('should render component properly', () => {
    const raiting = 3;
    const totalReviews = 123;

    render(<RatingElement rating={raiting} reviewCount={totalReviews} />);

    expect(screen.getAllByTestId('#icon-full-star')).toHaveLength(raiting);
    expect(screen.getAllByTestId('#icon-star')).toHaveLength(
      MAX_STARS - raiting
    );
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(`${totalReviews}`)).toBeInTheDocument();
  });
});
