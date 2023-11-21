import { MouseEventHandler, useEffect } from 'react';
import { BackButton } from './components/back-button/back-button';
import { PageButton } from './components/page-button/page-button';
import { ForwardButton } from './components/forward-button/forward-button';
import { MainCatalogSettings } from '../../const';
import { useSearchParams } from 'react-router-dom';
import { AppParams } from '../main-catalog/const';

import './style.css';

type PaginatorElementProps = {
  pagesCount: number;
  currentPage: number;
};

export function PaginatorElement({
  pagesCount, currentPage
}: PaginatorElementProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  let activePage = currentPage;
  let firstPage = currentPage;
  const lastPage = Math.min(
    firstPage + MainCatalogSettings.MaxPagesVisible - 1,
    pagesCount
  );
  const pagesList = Array.from({ length: pagesCount }, (_p, k) => k + 1);
  const shownPages = pagesList.slice(firstPage - 1, lastPage);

  function setPage() {
    setSearchParams((prevParams) => {
      prevParams.set(AppParams.Page, String(activePage));
      return prevParams;
    },);
  }

  useEffect(() => {
    setSearchParams((prevParams) => {
      prevParams.set(AppParams.Page, String(activePage));
      return prevParams;
    },);
  }, [activePage, setSearchParams]);

  function backButtonClickHandler():
    | MouseEventHandler<HTMLAnchorElement>
    | undefined {
    return () => {
      firstPage--;
      activePage = firstPage - 1;
      setPage();
    };
  }
  function nextButtonClickHandler():
    | MouseEventHandler<HTMLAnchorElement>
    | undefined {
    return () => {
      firstPage++;
      activePage = lastPage + 1;
      setPage();
    };
  }
  function pageButtonClickHandler(
    page: number
  ): MouseEventHandler<HTMLAnchorElement> | undefined {
    return () => {
      activePage = (page);
      setPage();
    };
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {firstPage !== 1 && <BackButton onClick={backButtonClickHandler} />}
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
          <ForwardButton onClick={nextButtonClickHandler} />
        )}
      </ul>
    </div>
  );
}
