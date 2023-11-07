import { render, screen } from '@testing-library/react';
import { GradeElement } from './rating-element';
import { MAX_STARS } from './rating-element-utils';

describe('Component: GradeElemr=ent', () => {
  it('should render component properly', () => {
    const raiting = 3;

    render(<GradeElement rating={raiting} />);

    expect(screen.getAllByTestId('#icon-full-star')).toHaveLength(raiting);
    expect(screen.getAllByTestId('#icon-star')).toHaveLength(
      MAX_STARS - raiting
    );
    expect(screen.getByText(`Оценка: ${raiting}`)).toBeInTheDocument();
  });
});
