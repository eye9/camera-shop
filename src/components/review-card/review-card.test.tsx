import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeReview } from '../../utils/mocks';
import { ReviewCard } from './review-card';

describe('Component: Review Card', () => {
  it('should render properly', () => {
    const mockReview = makeFakeReview();
    const {withStoreComponent} = withStore(<ReviewCard review={mockReview} />);
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockReview.userName || '')).toBeInTheDocument();
    expect(screen.getByText(mockReview.advantage || '')).toBeInTheDocument();
    expect(screen.getByText(mockReview.disadvantage || '')).toBeInTheDocument();
    expect(screen.getByText(mockReview.review || '')).toBeInTheDocument();
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
    expect(screen.getByText(/Оценка:/i)).toBeInTheDocument();
  });
});
