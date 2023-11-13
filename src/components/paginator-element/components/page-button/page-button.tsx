import cn from 'classnames';
import { Link } from 'react-router-dom';
import { PaginatorButtonProps } from '../../types';

type PageButtonProps = PaginatorButtonProps & {
  isActive: boolean;
};
export function PageButton({
  isActive,
  linkPage,
  onClick,
}: PageButtonProps): JSX.Element {
  const queryPage = linkPage === 1 ? '' : `/?page=${linkPage}`;
  return (
    <li className="pagination__item">
      <Link
        to={queryPage}
        onClick={onClick()}
        className={cn('pagination__link', {
          'pagination__link--active': isActive,
        })}
      >
        {linkPage}
      </Link>
    </li>
  );
}
