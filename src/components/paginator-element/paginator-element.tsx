import cn from 'classnames';
import { MainCatalogSettings } from '../../const';
import { useSearchParams } from 'react-router-dom';
import { AppParams } from '../main-catalog/const';

import './style.css';

type PaginatorElementProps = {
  pagesCount: number;
  currentPage: number;
};

export function PaginatorElement({
  pagesCount,
  currentPage,
}: PaginatorElementProps) {
  const setSearchParams = useSearchParams()[1];

  const activePage = currentPage;
  const firstPage =
    currentPage === pagesCount
      ? Math.max(currentPage - 2, 1)
      : Math.max(currentPage - 1, 1);
  const lastPage = Math.min(
    firstPage + MainCatalogSettings.MaxPagesVisible - 1,
    pagesCount
  );

  const pagesList = Array.from({ length: pagesCount }, (_p, k) => k + 1);
  const shownPages = pagesList.slice(firstPage - 1, lastPage);

  function setPage(page: number) {
    setSearchParams((prevParams) => {
      prevParams.set(AppParams.Page, String(page));
      return prevParams;
    });
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {lastPage > MainCatalogSettings.MaxPagesVisible && (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={() => setPage(firstPage - 1)}
            >
              Назад
            </a>
          </li>
        )}
        {shownPages.map((page) => {
          const key = `page-${page}`;
          return (
            <li className="pagination__item" key={key}>
              <a
                onClick={() => setPage(page)}
                className={cn('pagination__link', {
                  'pagination__link--active': activePage === page,
                })}
              >
                {page}
              </a>
            </li>
          );
        })}
        {lastPage !== pagesCount && (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={() => setPage(lastPage + 1)}
            >
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
