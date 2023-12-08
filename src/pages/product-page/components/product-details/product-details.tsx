import cn from 'classnames';
import { useState } from 'react';
import { ProductProps } from '../../product-page';
import { useSearchParams } from 'react-router-dom';
import { RatingElement } from '../../../../components/rating-element/rating-element';
import { AddToBusketButton } from '../add-to-busket-button/add-to-busket-button';

const PageTabs = {
  Features: 'features',
  Description: 'description',
} as const;

export function ProductDetails({ product }: ProductProps) {
  const [searchParams, setSearchParams] = useSearchParams({
    tab: PageTabs.Description,
  });
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || PageTabs.Description
  );

  function activateFeatureTab() {
    setActiveTab(PageTabs.Features);
    setSearchParams({ tab: PageTabs.Features });
  }

  function activateDescriptionTab() {
    setSearchParams({ tab: PageTabs.Description });
    setActiveTab(PageTabs.Description);
  }

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
            <AddToBusketButton product={product} />
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button
                  className={cn('tabs__control', {
                    'is-active': activeTab === PageTabs.Features,
                  })}
                  type="button"
                  onClick={activateFeatureTab}
                >
                  Характеристики
                </button>
                <button
                  className={cn('tabs__control', {
                    'is-active': activeTab !== PageTabs.Features,
                  })}
                  type="button"
                  onClick={activateDescriptionTab}
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
                    'is-active': activeTab !== PageTabs.Features,
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
