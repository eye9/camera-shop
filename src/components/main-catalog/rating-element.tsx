import { generateLinkNames } from './rating-element-utils';

type RatingElementProps = {
  rating?: number;
  reviewCount: number;
};

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
  if (!rating) {
    rating = 0;
  }
  const linkNames = generateLinkNames(rating);

  return (
    <div className="rate review-card__rate">
      {linkNames.map((link, i) => {
        const key = `${link}-${i}`;
        return (
          <svg width={17} height={16} aria-hidden="true" key={key} data-testid={link}>
            <use xlinkHref={link} />
          </svg>
        );
      })}

      <p className="visually-hidden">Оценка: {rating}</p>
    </div>
  );
}
