import cn from 'classnames';
import { useSelector } from 'react-redux';
import { FormEvent, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  selectBusket,
  selectCouponValidStatus,
} from '../../store/selectors';
import { BreadcrumbsElement } from '../breadcrumbs-element/breadcrumbs-element';
import { BusketItem } from './components/busket-item/busket-item';
import { RemoveItemModal } from '../remove-item-modal/remove-item-modal';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchCouponDiscount, sendOrder } from '../../store/api-actions';
import { setCouponValidStatusStatus as setCouponValidStatus } from '../../store/busket-process';
import { BusketModal } from './components/busket-modal/busket-modal';

export function BusketElement() {
  const dispatch = useAppDispatch();
  const busket = useSelector(selectBusket);
  const isCouponValid = useSelector(selectCouponValidStatus);
  const couponRef = useRef<HTMLInputElement>(null);
  const discount = busket.discount;
  const total = busket.items.reduce(
    (prev, curr, i) => prev + curr.price * busket.itemsCount[i],
    0
  );

  let inputClassname = isCouponValid ? 'is-valid' : 'is-invalid';
  if (
    isCouponValid === undefined ||
    (couponRef.current && couponRef.current.value === '')
  ) {
    inputClassname = '';
  }

  const handleSubmitCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (couponRef.current) {
      const couponValue = String(couponRef.current.value).trim();
      if (couponValue.match(/^[\w-_]+$/)) {
        dispatch(fetchCouponDiscount(couponValue));
      } else {
        dispatch(setCouponValidStatus(false));
      }
    }
  };

  const handleOrderBottonClick = () => {
    const ids = busket.items.map((item) => item.id);
    const coupon = busket.coupon;
    dispatch(sendOrder({ ids, coupon }));
  };

  return (
    <div className="page-content">
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <BreadcrumbsElement lastElement="Корзина" />
      <section className="basket">
        <div className="container">
          <h1 className="title title--h2">Корзина</h1>
          <ul className="basket__list">
            {busket.items.map((item, i) => (
              <BusketItem
                item={item}
                count={busket.itemsCount[i]}
                key={item.id}
              />
            ))}
          </ul>
          <div className="basket__summary">
            <div className="basket__promo">
              <p className="title title--h4">
                Если у вас есть промокод на скидку, примените его в этом поле
              </p>
              <div className="basket-form">
                <form action="#" onSubmit={handleSubmitCoupon}>
                  <div className={`custom-input ${inputClassname}`}>
                    <label>
                      <span className="custom-input__label">Промокод</span>
                      <input
                        ref={couponRef}
                        type="text"
                        name="promo"
                        placeholder="Введите промокод"
                      />
                    </label>
                    <p className="custom-input__error">Промокод неверный</p>
                    <p className="custom-input__success">Промокод принят!</p>
                  </div>
                  <button className="btn" type="submit">
                    Применить
                  </button>
                </form>
              </div>
            </div>
            <div className="basket__summary-order">
              <p className="basket__summary-item">
                <span className="basket__summary-text">Всего:</span>
                <span className="basket__summary-value">
                  {total.toLocaleString()} ₽
                </span>
              </p>
              <p className="basket__summary-item">
                <span className="basket__summary-text">Скидка:</span>
                <span
                  className={cn('basket__summary-value ', {
                    'basket__summary-value--bonus': discount > 0,
                  })}
                >
                  {((total * discount) / 100).toLocaleString()} ₽
                </span>
              </p>
              <p className="basket__summary-item">
                <span className="basket__summary-text basket__summary-text--total">
                  К оплате:
                </span>
                <span className="basket__summary-value basket__summary-value--total">
                  {(total - (total * discount) / 100).toLocaleString()} ₽
                </span>
              </p>
              <button
                onClick={handleOrderBottonClick}
                className="btn btn--purple"
                type="submit"
                disabled={busket.items.length === 0}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </section>
      <RemoveItemModal />
      <BusketModal />
    </div>
  );
}
