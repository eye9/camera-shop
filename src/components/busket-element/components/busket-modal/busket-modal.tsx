import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectOrderStatus } from '../../../../store/selectors';
import { AppRoutes, OrderStatuses } from '../../../../const';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/hooks';
import { setOrderStatus } from '../../../../store/busket-process';

export function BusketModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectOrderStatus);
  const text =
    status === OrderStatuses.Success ? 'Спасибо за покупку' : 'Ошибка';

  return (
    <div
      className={cn('modal modal--narrow', {
        'is-active': status !== OrderStatuses.Unknown,
      })}
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => dispatch(setOrderStatus(OrderStatuses.Unknown))}
        />
        <div className="modal__content">
          <p className="title title--h4">{text}</p>
          {status === OrderStatuses.Success ? (
            <svg
              className="modal__icon"
              width={80}
              height={78}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-review-success" />
            </svg>
          ) : (
            <p>Что-то пошло не так...</p>
          )}
          <div className="modal__buttons">
            <button
              onClick={() => {
                dispatch(setOrderStatus(OrderStatuses.Unknown));
                navigate(AppRoutes.Main);
              }}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            onClick={() => dispatch(setOrderStatus(OrderStatuses.Unknown))}
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
