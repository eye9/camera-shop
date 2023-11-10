import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeReview } from '../../utils/mocks';
import { ProductReviews } from './product-reviews';
import userEvent from '@testing-library/user-event';

describe('Component: Product Reviews', () => {
  it('should render properly without "show more" button', () => {
    const reviewsCount = 3;
    const mockReview = new Array(reviewsCount).fill(makeFakeReview());
    const { withStoreComponent } = withStore(
      <ProductReviews reviews={mockReview} />
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.getAllByTestId('reviewCard')).toHaveLength(reviewsCount);
    expect(
      screen.queryByText('Показать больше отзывов')
    ).not.toBeInTheDocument();
  });

  it('should show 3 review max at start and "show more" button', () => {
    const maxReviewsCount = 3;
    const mockReview = new Array(10).fill(makeFakeReview());
    const { withStoreComponent } = withStore(
      <ProductReviews reviews={mockReview} />
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
    expect(screen.getAllByTestId('reviewCard')).toHaveLength(maxReviewsCount);
  });

  it('should show 3 more reviews on "show more" button click', async () => {
    const reviewsPerClick = 3;
    const mockReview = new Array(10).fill(makeFakeReview());
    const { withStoreComponent } = withStore(
      <ProductReviews reviews={mockReview} />
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
    expect(screen.getAllByTestId('reviewCard')).toHaveLength(reviewsPerClick);

    await userEvent.click(screen.getByTestId('showMoreButton'));
    expect(screen.getAllByTestId('reviewCard')).toHaveLength(
      reviewsPerClick * 2
    );
  });
});
