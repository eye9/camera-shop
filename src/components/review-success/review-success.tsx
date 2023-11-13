import cn from 'classnames';
import { useRef } from 'react';
import {
  useFocus,
  useEscHandle,
  useScrollDisabler,
  useAppDispatch,
} from '../../hooks/hooks';
import { setSuccessModalVisibleStatus } from '../../store/review-process';
import { useSelector } from 'react-redux';
import { selectSuccessModalStatus } from '../../store/selectors';

export default function ReviewSuccess(): JSX.Element {
  const isVisible = useSelector(selectSuccessModalStatus);
  const closeButtonRef = useRef(null);
  const dispatch = useAppDispatch();

  useFocus(closeButtonRef.current);
  useEscHandle(() => dispatch(setSuccessModalVisibleStatus(false)));
  useScrollDisabler(isVisible);

  return (
    <div className={cn('modal modal--narrow', { 'is-active': isVisible })}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(setSuccessModalVisibleStatus(false))}/>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg
            className="modal__icon"
            width={80}
            height={78}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <button
              ref={closeButtonRef}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => dispatch(setSuccessModalVisibleStatus(false))}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setSuccessModalVisibleStatus(false))}
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
