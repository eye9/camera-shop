import { Link } from 'react-router-dom';
import { PaginatorButtonProps } from '../../types';

export function BackButton({
  onClick,
  linkPage,
}: PaginatorButtonProps): JSX.Element {
  return (
    <li className="pagination__item">
      <Link
        to={linkPage === 2 ? '' : `/?page=${linkPage - 1}`}
        className="pagination__link pagination__link--text"
        onClick={onClick()}
      >
        Назад
      </Link>
    </li>
  );
}
