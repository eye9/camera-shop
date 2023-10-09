import { Product } from '../../types/product';
import { RatingElement } from './rating-element';

export type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return price.toLocaleString();
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card" key={product.id}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
          />
          <img
            src={`${product.previewImg}`}
            srcSet={`${product.previewImg} 2x`}
            width={280}
            height={240}
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <RatingElement rating={product.rating} reviewCount={product.reviewCount}/>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formatPrice(product.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a
          className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
          href="#"
        >
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          В корзине
        </a>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
}
