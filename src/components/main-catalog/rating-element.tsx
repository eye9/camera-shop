type RatingElementProps = {
  rating: number;
  reviewCount: number;
};

export function RatingElement({ rating, reviewCount }: RatingElementProps) {
  return (
    <div className="rate product-card__rate">
      {[1, 2, 3, 4, 5].map((_, i) => {
        let link = '#icon-full-star';
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

      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>
        {reviewCount}
      </p>
    </div>
  );
}
