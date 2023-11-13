import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { MainCatalogSettings } from '../../const';
import { BackButton } from './components/back-button/back-button';
import { PageButton } from './components/page-button/page-button';
import { ForwardButton } from './components/forward-button/forward-button';

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
  const [firstPage, setFirstPage] = useState(currentPage);
  const lastPage = Math.min(
    firstPage + MainCatalogSettings.MaxPagesVisible - 1,
    pagesCount
  );
  const pages = Array.from({ length: pagesCount }, (_, k) => k + 1);
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
        {firstPage !== 1 && (
          <BackButton onClick={backButtonClickHandler} linkPage={firstPage} />
        )}
        {shownPages.map((page) => {
          const key = `page-${page}`;
          return (
            <PageButton
              key={key}
              isActive={activePage === page}
              onClick={() => pageButtonClickHandler(page)}
              linkPage={page}
            />
          );
        })}
        {lastPage !== pagesCount && (
          <ForwardButton
            onClick={nextButtonClickHandler}
            linkPage={firstPage + MainCatalogSettings.MaxPagesVisible}
          />
        )}
      </ul>
    </div>
  );
}
