import { generateLinkNames } from './rating-element-utils';

type RatingElementProps = {
  rating?: number;
  reviewCount: number;
};

const MAX_STARS = 5;

export function RatingElement({ rating, reviewCount }: RatingElementProps) {
  if (!rating) {
    rating = 0;
  }
  const linkNames = generateLinkNames(rating);
  return (
    <div className="rate product-card__rate">
      {linkNames.map((link, i) => {
        const key = `${link}-${i}`;
        return (
          <svg
            width={17}
            height={16}
            aria-hidden="true"
            key={key}
            data-testid={link}
          >
            <use xlinkHref={link} />
          </svg>
        );
      })}

      <p className="visually-hidden">Рейтинг: {rating}</p>
      {reviewCount >= 0 && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>
          {reviewCount}
        </p>
      )}
    </div>
  );
}
export type GradeElementProps = Omit<RatingElementProps, 'reviewCount'>;

export function GradeElement({ rating }: GradeElementProps) {
  return (
    <div className="rate review-card__rate">
      {Array.from({ length: MAX_STARS }).map((_, i) => {
        let link = '#icon-full-star';
        if (!rating) {
          rating = 0;
        }
        if (i + 1 > rating) {
          link = '#icon-star';
        }
        const key = `star-${i}`;
        return (
          <svg width={17} height={16} aria-hidden="true" key={key}>
            <use xlinkHref={link} />
          </svg>
        );
      })}

      <p className="visually-hidden">Оценка: {rating}</p>
    </div>
  );
}
