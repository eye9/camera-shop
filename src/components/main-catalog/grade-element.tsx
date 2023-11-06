import {RatingElementProps, generateLinkNames} from './rating-element-utils';

type GradeElementProps = Omit<RatingElementProps, 'reviewCount'>;

export function GradeElement({ rating }: GradeElementProps) {
  if (!rating) {
    rating = 0;
  }
  const linkNames = generateLinkNames(rating);
  return (
    <div className="rate review-card__rate">
      {linkNames.map((link, i) => {
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
