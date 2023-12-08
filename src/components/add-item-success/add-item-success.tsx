import cn from 'classnames';
import { useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useEscHandle,
  useFocus,
  useScrollDisabler,
} from '../../hooks/hooks';
import { setBusketSuccessModalVisibleStatus } from '../../store/busket-process';
import { selectAddBusketSuccessStatus } from '../../store/selectors';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

export function AddItemSuccess() {
  const dispatch = useAppDispatch();
  const busketButtonRef = useRef<HTMLAnchorElement>(null);

  const isVisible = useAppSelector(selectAddBusketSuccessStatus);

  useFocus(busketButtonRef.current);
  useEscHandle(() => dispatch(setBusketSuccessModalVisibleStatus(false)));
  useScrollDisabler(isVisible);

  return (
    <div className={cn('modal modal--narrow', { 'is-active': isVisible })}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg
            className="modal__icon"
            width={86}
            height={80}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <a
              className="btn btn--transparent modal__btn"
              onClick={() => {
                dispatch(setBusketSuccessModalVisibleStatus(false));
              }}
            >
              Продолжить покупки
            </a>
            <Link
              to={`${AppRoutes.Busket }`}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              ref={busketButtonRef}
            >
              Перейти в корзину
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
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
