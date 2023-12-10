import cn from 'classnames';
import { useRef } from 'react';
import {
  busketRemove,
  setRemoveBusketModalVisibleStatus,
} from '../../store/busket-process';
import {
  selectCurrentBusketItem,
  selectRemoveBusketStatus,
} from '../../store/selectors';
import {
  useAppDispatch,
  useAppSelector,
  useEscHandle,
  useFocus,
  useScrollDisabler,
} from '../../hooks/hooks';

export function RemoveItemModal() {
  const dispatch = useAppDispatch();
  const removeButtonRef = useRef<HTMLButtonElement>(null);

  const item = useAppSelector(selectCurrentBusketItem);
  const isVisible = useAppSelector(selectRemoveBusketStatus);

  useFocus(removeButtonRef.current);
  useEscHandle(() => dispatch(setRemoveBusketModalVisibleStatus(false)));
  useScrollDisabler(isVisible);

  if (!item) {
    return null;
  }

  return (
    <div className={cn('modal', { 'is-active': isVisible })}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => {
            dispatch(setRemoveBusketModalVisibleStatus(false));
          }}
        />
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${item?.previewImgWebp}, /${item?.previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${item.previewImg}`}
                  srcSet={`/${item.previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={item.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{item.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{item.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{item?.type} камера</li>
                <li className="basket-item__list-item">{item.level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              onClick={() => {
                dispatch(busketRemove(item));
              }}
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
            >
              Удалить
            </button>
            <a
              onClick={() => {
                dispatch(setRemoveBusketModalVisibleStatus(false));
              }}
              className="btn btn--transparent modal__btn modal__btn--half-width"
              href="#"
            >
              Продолжить покупки
            </a>
          </div>
          <button
            onClick={() => {
              dispatch(setRemoveBusketModalVisibleStatus(false));
            }}
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
