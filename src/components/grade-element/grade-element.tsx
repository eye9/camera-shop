import {RatingElementProps, generateLinkNames} from '../rating-element/rating-element-utils';

type GradeElementProps = Omit<RatingElementProps, 'reviewCount'>;

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

      <p className="visually-hidden">Оценка: {rating}</p>
    </div>
  );
}
