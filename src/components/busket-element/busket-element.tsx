import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { selectBusket } from '../../store/selectors';
import { BreadcrumbsElement } from '../breadcrumbs-element/breadcrumbs-element';
import { BusketItem } from './components/busket-item/busket-item';
import { RemoveItemModal } from '../remove-item-modal/remove-item-modal';

export function BusketElement() {
  const busket = useSelector(selectBusket);
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
                <form action="#">
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Промокод</span>
                      <input
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
                  {busket.items
                    .reduce(
                      (prev, curr, i) =>
                        prev + curr.price * busket.itemsCount[i],
                      0
                    )
                    .toLocaleString()}{' '}
                  ₽
                </span>
              </p>
              <p className="basket__summary-item">
                <span className="basket__summary-text">Скидка:</span>
                <span className="basket__summary-value basket__summary-value--bonus">
                  0 ₽
                </span>
              </p>
              <p className="basket__summary-item">
                <span className="basket__summary-text basket__summary-text--total">
                  К оплате:
                </span>
                <span className="basket__summary-value basket__summary-value--total">
                  {busket.items
                    .reduce(
                      (prev, curr, i) =>
                        prev + curr.price * busket.itemsCount[i],
                      0
                    )
                    .toLocaleString()}{' '}
                  ₽
                </span>
              </p>
              <button className="btn btn--purple" type="submit">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </section>
      <RemoveItemModal />
    </div>
  );
}
