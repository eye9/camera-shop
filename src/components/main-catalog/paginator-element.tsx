import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import cn from 'classnames';

type PaginatorElementProps = {
  pagesCount: number;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
};

export function PaginatorElement({
  pagesCount,
  currentPage,
  onPageChange,
}: PaginatorElementProps) {
  const [activePage, setActivePage] = useState(currentPage);
  const pages = Array.from({ length: pagesCount }, (_, k) => k + 1);
  const [firstPage, setFirstPage] = useState(currentPage);
  const lastPage = Math.min(firstPage + 2, pagesCount);
  const shownPages = pages.slice(firstPage - 1, lastPage);

  function backButtonClickHandler():
    | MouseEventHandler<HTMLAnchorElement>
    | undefined {
    return () => {
      setFirstPage(firstPage - 1);
      setActivePage(firstPage - 1);
      onPageChange(firstPage - 1);
    };
  }
  function nextButtonClickHandler():
    | MouseEventHandler<HTMLAnchorElement>
    | undefined {
    return () => {
      setFirstPage(firstPage + 1);
      setActivePage(lastPage + 1);
      onPageChange(lastPage + 1);
    };
  }

  function pageButtonClickHandler(
    page: number
  ): MouseEventHandler<HTMLAnchorElement> | undefined {
    return () => {
      setActivePage(page);
      onPageChange(page);
    };
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {firstPage === 1 ? (
          ''
        ) : (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={backButtonClickHandler()}
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
                onClick={pageButtonClickHandler(page)}
                className={cn('pagination__link', {
                  'pagination__link--active': activePage === page,
                })}
              >
                {page}
              </a>
            </li>
          );
        })}
        {lastPage === pagesCount ? (
          ''
        ) : (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={nextButtonClickHandler()}
            >
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
