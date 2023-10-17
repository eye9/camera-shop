import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { RatingElement } from '../../components/main-catalog/rating-element';
import cn from 'classnames';
import { addToBusket } from '../../store/actions';
import { ProductProps, PageTabs } from './product-page';

export function ProductDetails({ product }: ProductProps) {
  const [activeTab, setActiveTab] = useState('');
  const dispatch = useAppDispatch();
  // setActiveTab(PageTabs.Description);
  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}
              />
              <img
                src={product.previewImg}
                srcSet={`/${product.previewImgWebp2x} 2x`}
                width={560}
                height={480}
                alt={product.name}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{product.name}</h1>
            <RatingElement
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
            <p className="product__price">
              <span className="visually-hidden">Цена:</span>
              {product.price.toLocaleString()} ₽
            </p>
            <button
              className="btn btn--purple"
              type="button"
              onClick={() => dispatch(addToBusket(product))}
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button
                  className={cn('tabs__control', {
                    'is-active':
                      activeTab === PageTabs.Features,
                  })}
                  type="button"
                  onClick={() => setActiveTab(PageTabs.Features)}
                >
                  Характеристики
                </button>
                <button
                  className={cn('tabs__control', {
                    'is-active': activeTab === PageTabs.Description || activeTab === '',
                  })}
                  type="button"
                  onClick={() => setActiveTab(PageTabs.Description)}
                >
                  Описание
                </button>
              </div>
              <div className="tabs__content">
                <div
                  className={cn('tabs__element', {
                    'is-active': activeTab === PageTabs.Features,
                  })}
                >
                  <ul className="product__tabs-list">
                    <li className="item-list">
                      <span className="item-list__title">Артикул:</span>
                      <p className="item-list__text">{product.vendorCode}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{product.category}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{product.type}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{product.level}</p>
                    </li>
                  </ul>
                </div>
                <div
                  className={cn('tabs__element', {
                    'is-active':
                      activeTab === PageTabs.Description || activeTab === '',
                  })}
                >
                  <div className="product__tabs-text">
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
