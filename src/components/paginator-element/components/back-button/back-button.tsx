import { PaginatorButtonProps } from '../../types';

export function BackButton({
  onClick,
}: Omit<PaginatorButtonProps, 'linkPage'>): JSX.Element {
  return (
    <li className="pagination__item">
      <a
        className="pagination__link pagination__link--text"
        onClick={onClick()}
      >
        Назад
      </a>
    </li>
  );
}
