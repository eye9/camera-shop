
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';
import {initialState} from '../../store/review-process';
import { AddReviewModal } from './add-review-modal';

describe('Component: Add To Busket Modal ', () => {
  it('should render properly', () => {
    const product = makeFakeProduct();
    const { withStoreComponent } = withStore(<AddReviewModal product={product} />, {REVIEW: {...initialState, isReviewModalVisible: true}});

    render(withStoreComponent);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });
});
