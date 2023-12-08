import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { RatingElement } from '../rating-element/rating-element';
import { AppRoutes } from '../../const';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks/hooks';
import { formatPrice } from '../../utils/utils';
import { addingToBusket } from '../../store/busket-process';

export type ProductCardProps = {
  product: Product;
  activeClass?: string;
};

export function ProductCard({ product, activeClass }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={cn('product-card', activeClass)} key={product.id}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${product.previewImg}`}
            srcSet={`/${product.previewImg} 2x`}
            width={280}
            height={240}
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <RatingElement
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formatPrice(product.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => dispatch(addingToBusket(product))}>
          Купить
        </button>
        <Link
          className="btn btn--transparent"
          to={`${AppRoutes.Product}/${product.id}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
