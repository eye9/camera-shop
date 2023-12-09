import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { selectBusket } from '../../store/selectors';
import { BreadcrumbsElement } from '../breadcrumbs-element/breadcrumbs-element';

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
              <li className="basket-item" key={item.id}>
                <div className="basket-item__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${item.previewImgWebp}, ${item.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`${item.previewImg}`}
                      srcSet={`${item.previewImg2x} 2x`}
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
                      <span className="basket-item__number">
                        {item.vendorCode}
                      </span>
                    </li>
                    <li className="basket-item__list-item">
                      {item.type} {item.category.toLowerCase()}
                    </li>
                    <li className="basket-item__list-item">
                      {item.level} уровень
                    </li>
                  </ul>
                </div>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>
                  {item.price.toLocaleString()} ₽
                </p>
                <div className="quantity">
                  <button
                    className="btn-icon btn-icon--prev"
                    aria-label="уменьшить количество товара"
                  >
                    <svg width={7} height={12} aria-hidden="true">
                      <use xlinkHref="#icon-arrow" />
                    </svg>
                  </button>
                  <label className="visually-hidden" htmlFor="counter1" />
                  <input
                    type="number"
                    id="counter1"
                    value={busket.itemsCount[i]}
                    min={1}
                    max={99}
                    aria-label="количество товара"
                  />
                  <button
                    className="btn-icon btn-icon--next"
                    aria-label="увеличить количество товара"
                  >
                    <svg width={7} height={12} aria-hidden="true">
                      <use xlinkHref="#icon-arrow" />
                    </svg>
                  </button>
                </div>
                <div className="basket-item__total-price">
                  <span className="visually-hidden">Общая цена:</span>
                  {(busket.itemsCount[i] * item.price).toLocaleString()}₽
                </div>
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Удалить товар"
                >
                  <svg width={10} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-close" />
                  </svg>
                </button>
              </li>
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
    </div>
  );
}
