import { GradeElement } from '../../components/main-catalog/rating-element';
import { Review } from '../../types/review';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

export type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  dayjs.locale('ru-ru');

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={dayjs(review.createAt).format('YYYY-MM-DD')}>
          {dayjs(review.createAt).format('DD MMMM')}
        </time>
      </div>
      <GradeElement rating={review.rating} />
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
