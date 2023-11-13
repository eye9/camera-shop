import { useEffect, useState } from 'react';
import { Reviews } from '../../../../types/review';
import { ReviewCard } from '../../../../components/review-card/review-card';
import { useAppDispatch } from '../../../../hooks/hooks';
import { setReviewModalVisibleStatus } from '../../../../store/review-process';
import { reviewSorter } from '../../../../utils/utils';
import { INIT_REVIEWS_COUNT, READY_TO_LOAD_PX } from './const';

export type ProductReviewsProps = {
  reviews: Reviews;
};

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [reviewsShown, setReviewsShown] = useState(INIT_REVIEWS_COUNT);
  const sortedReviews = reviews.slice().sort(reviewSorter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleDocumentScroll = () => {
      if (
        reviewsShown < reviews.length &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - READY_TO_LOAD_PX
      ) {
        setReviewsShown(reviewsShown + INIT_REVIEWS_COUNT);
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
          <button className="btn" type="button" onClick={() => dispatch(setReviewModalVisibleStatus(true))}>
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {sortedReviews.slice(0, reviewsShown).map((review) => (
            <ReviewCard review={review} key={review.id}/>
          ))}
        </ul>
        {reviewsShown < reviews.length ? (
          <div className="review-block__buttons">
            <button
              className="btn btn--purple"
              type="button"
              onClick={() => setReviewsShown(reviewsShown + INIT_REVIEWS_COUNT)}
              data-testid="showMoreButton"
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
