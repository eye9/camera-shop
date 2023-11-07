import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import {initialState} from '../../store/review-process';
import ReviewSuccess from './review-success';

describe('Component: Review success Modal ', () => {
  it('should render properly', () => {
    const { withStoreComponent } = withStore(<ReviewSuccess />, {REVIEW: {...initialState, isSuccessModalVisible: true}});

    render(withStoreComponent);

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
});
