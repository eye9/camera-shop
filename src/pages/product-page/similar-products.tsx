import { useState } from 'react';
import { ProductCard } from '../../components/main-catalog/product-card';
import { similarProducts } from '../../mock';

import './similar-products.css';

export function SimilarProducts() {
  const ITEMS_PER_PAGE = 3;
  const [page, setPage] = useState(1);

  const isLastPage = () => similarProducts.length <= page * ITEMS_PER_PAGE;

  const nextPage = () => {
    if (isLastPage()) {
      return;
    }
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const isInVisibleRange = (i: number): boolean =>
    i >= (page - 1) * ITEMS_PER_PAGE && i < page * ITEMS_PER_PAGE;

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">
          <button onClick={prevPage}>{page}</button> Похожие товары{' '}
          <button onClick={nextPage}>{page}</button>
        </h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarProducts.map((item, i) => (
              <ProductCard
                product={item}
                activeClass={isInVisibleRange(i) ? 'is-active' : ''}
                key={item.id}
              />
            ))}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={page === 1}
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={isLastPage()}
            onClick={nextPage}
          >
            <svg width={7} height={12} aria-hidden="true" onClick={nextPage}>
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
