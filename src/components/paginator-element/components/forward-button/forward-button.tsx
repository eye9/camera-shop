import { Link } from 'react-router-dom';
import { PaginatorButtonProps } from '../../types';

export function ForwardButton({
  onClick,
  linkPage,
}: PaginatorButtonProps): JSX.Element {
  return (
    <li className="pagination__item">
      <Link
        to={`/?page=${linkPage}`}
        className="pagination__link pagination__link--text"
        onClick={onClick()}
      >
        Далее
      </Link>
    </li>
  );
}
