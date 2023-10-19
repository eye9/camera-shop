import { useRef, useState } from 'react';
import { ProductCard } from '../../components/main-catalog/product-card';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Products } from '../../types/product';

import 'swiper/css';
import 'swiper/css/navigation';
import './similar-products.css';

export type SimilarProductsProps = {
  products: Products;
}

export function SimilarProducts({products: similarProducts} : SimilarProductsProps) {
  const ITEMS_PER_PAGE = 3;
  const [page, setPage] = useState(1);
  const sw = useSwiper();
  const swiperRef = useRef(sw);

  const isFirstPage = () => page === 1;
  const isLastPage = () => similarProducts.length <= page * ITEMS_PER_PAGE;

  const nextPage = () => {
    if (isLastPage()) {
      return;
    }
    setPage(page + 1);
    swiperRef.current.slideNext();
    swiperRef.current.slideNext();
    swiperRef.current.slideNext();
  };

  const prevPage = () => {
    if (isFirstPage()) {
      return;
    }
    setPage(page - 1);
    swiperRef.current.slidePrev();
    swiperRef.current.slidePrev();
    swiperRef.current.slidePrev();
  };

  const isInVisibleRange = (i: number): boolean =>
    i >= (page - 1) * ITEMS_PER_PAGE && i < page * ITEMS_PER_PAGE;

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider-list">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            freeMode={false}
            allowTouchMove={false}
            slidesPerView={3}
            spaceBetween={30}
            className="mySwiper"
          >
            <div className="product-similar__slider">
              {similarProducts.map((item, i) => (
                <SwiperSlide key={item.id}>
                  <ProductCard
                    product={item}
                    activeClass={isInVisibleRange(i) ? 'is-active' : ''}
                    // activeClass={'is-active'}
                    key={item.id}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
        <button
          className="slider-controls slider-controls--prev"
          type="button"
          aria-label="Предыдущий слайд"
          disabled={isFirstPage()}
          onClick={prevPage}
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
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
    </section>
  );
}
