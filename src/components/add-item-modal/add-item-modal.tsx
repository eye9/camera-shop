import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectAddBusketStatus,
  selectCurrentBusketItem,
} from '../../store/selectors';
import { setBusketModalVisibleStatus } from '../../store/busket-process';
import { useEffect, useRef } from 'react';

export function AddItemModal() {
  const dispatch = useAppDispatch();
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const item = useAppSelector(selectCurrentBusketItem);
  const isVisible = useAppSelector(selectAddBusketStatus);

  useEffect(() => {
    setTimeout(() => addButtonRef.current?.focus(), 500);
  });

  if (!item) {
    return '';
  }

  return (
    <div className={cn('modal', { 'is-active': isVisible })}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => {
            dispatch(setBusketModalVisibleStatus(false));
          }}
        />
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${item?.previewImgWebp}, /${item?.previewImgWebp2x} 2x"`}
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
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>
                {item.price.toLocaleString()} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              ref={addButtonRef}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => {
              dispatch(setBusketModalVisibleStatus(false));
            }}
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
