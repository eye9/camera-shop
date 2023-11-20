import cn from 'classnames';
import { PaginatorButtonProps } from '../../types';

type PageButtonProps = PaginatorButtonProps & {
  isActive: boolean;
};
export function PageButton({
  isActive,
  linkPage,
  onClick,
}: PageButtonProps): JSX.Element {
  return (
    <li className="pagination__item">
      <a
        onClick={onClick()}
        className={cn('pagination__link', {
          'pagination__link--active': isActive,
        })}
      >
        {linkPage}
      </a>
    </li>
  );
}
