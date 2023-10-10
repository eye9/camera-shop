import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { selectPromo } from '../../store/selectors';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper.css';

export function BannerElement() {
  const promo = useAppSelector(selectPromo);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop
      centeredSlides
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
    >
      {promo.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${item.previewImgWebp}, ${item.previewImgWebp2x} 2x`}
              />
              <img
                src={item.previewImg}
                srcSet={`${item.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt={item.name}
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">
                {item.name}
              </span>
              <span className="banner__text">
                Профессиональная камера от&nbsp;известного производителя
              </span>
              <Link className="btn" to={`${AppRoutes.Product}/${item.id}`}>
                Подробнее
              </Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
