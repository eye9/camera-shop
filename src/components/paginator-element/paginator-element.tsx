import { MouseEventHandler, useState, useEffect } from 'react';
import { BackButton } from './components/back-button/back-button';
import { PageButton } from './components/page-button/page-button';
import { ForwardButton } from './components/forward-button/forward-button';
import { useSearchParams } from 'react-router-dom';
import { AppParams } from '../main-catalog/const';
import { MainCatalogSettings } from '../../const';

import './style.css';

type PaginatorElementProps = {
  pagesCount: number;
};

export function PaginatorElement({ pagesCount }: PaginatorElementProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activePage, setActivePage] = useState(
    Number(searchParams.get(AppParams.Page)) || 1
  );
  const [firstPage, setFirstPage] = useState(
    Number(searchParams.get(AppParams.Page)) || 1
  );
  const lastPage = Math.min(
    firstPage + MainCatalogSettings.MaxPagesVisible - 1,
    pagesCount
  );
  const pagesList = Array.from({ length: pagesCount }, (_, k) => k + 1);
  const shownPages = pagesList.slice(firstPage - 1, lastPage);

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
      setFirstPage(firstPage - 1);
      setActivePage(firstPage - 1);
    };
  }
  function nextButtonClickHandler():
    | MouseEventHandler<HTMLAnchorElement>
    | undefined {
    return () => {
      setFirstPage(firstPage + 1);
      setActivePage(lastPage + 1);
    };
  }
  function pageButtonClickHandler(
    page: number
  ): MouseEventHandler<HTMLAnchorElement> | undefined {
    return () => {
      setActivePage(page);
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
