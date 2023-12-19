import cn from 'classnames';
import {
  useRef,
} from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useEscHandle,
  useFocus,
  useScrollDisabler,
} from '../../hooks/hooks';
import { Product } from '../../types/product';
import { selectReviewModalStatus } from '../../store/selectors';
import { setReviewModalVisibleStatus } from '../../store/review-process';
import { ReviewForm } from './components/review-form/review-form';

type AddReviewModalProps = {
  product: Product;
};

export function AddReviewModal({ product }: AddReviewModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(selectReviewModalStatus);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  useFocus(userNameRef.current);
  useEscHandle(() => dispatch(setReviewModalVisibleStatus(false)));
  useScrollDisabler(isVisible);

  return (
    <div className={cn('modal', { 'is-active': isVisible })}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => dispatch(setReviewModalVisibleStatus(false))}
        />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <ReviewForm product={product} focusOn={userNameRef} />
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setReviewModalVisibleStatus(false))}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
