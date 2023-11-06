export const MAX_STARS = 5;

export type RatingElementProps = {
  rating?: number;
  reviewCount: number;
};

export const generateLinkNames = (rating: number): string[] => {
  const names = Array.from({ length: MAX_STARS }).map((_, i) =>
    i < rating ? '#icon-full-star' : '#icon-star'
  );
  return names;
};
