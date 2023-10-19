import { useEffect, useState } from 'react';
import { Reviews } from '../../types/review';
import { ReviewCard } from './review-card';

const INIT_REVIEWS = 3;
const READY_TO_LOAD_PX = 100;

export type ProductReviewsProps = {
  reviews: Reviews;
};

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [reviewsShown, setReviewsShown] = useState(INIT_REVIEWS);

  useEffect(() => {
    const handleDocumentScroll = () => {
      if (
        reviewsShown < reviews.length &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - READY_TO_LOAD_PX
      ) {
        setReviewsShown(reviewsShown + INIT_REVIEWS);
      }
    };

    window.addEventListener('scroll', handleDocumentScroll);

    return () => window.removeEventListener('scroll', handleDocumentScroll);
  });

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {reviews.slice(0, reviewsShown).map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </ul>
        {reviewsShown < reviews.length ? (
          <div className="review-block__buttons">
            <button
              className="btn btn--purple"
              type="button"
              onClick={() => setReviewsShown(reviewsShown + INIT_REVIEWS)}
            >
              Показать больше отзывов
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}
