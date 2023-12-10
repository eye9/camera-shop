import { useAppDispatch } from '../../../../hooks/hooks';
import { removingFromBusket } from '../../../../store/busket-process';
import { Product } from '../../../../types/product';

type BusketItemProps = {
  item: Product;
  count: number;
};
export function BusketItem({ item, count }: BusketItemProps) {
  const dispatch = useAppDispatch();

  return (
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
            <span className="basket-item__number">{item.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {item.type} {item.category.toLowerCase()}
          </li>
          <li className="basket-item__list-item">{item.level} уровень</li>
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
          value={count}
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
        {(count * item.price).toLocaleString()} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => {
          dispatch(removingFromBusket(item));
        }}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}
