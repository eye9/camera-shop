import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

const MAX_PAGES_VISIBLE = 3;

type PaginatorElementProps = {
  pagesCount: number;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
};

type ButtonProps = {
  onClick: () => MouseEventHandler | undefined;
  linkPage: number;
};

function BackButton({ onClick, linkPage }: ButtonProps): JSX.Element {
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
function ForwardButton({ onClick, linkPage }: ButtonProps): JSX.Element {
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

type PageButtonProps = ButtonProps & {
  isActive: boolean;
};

function PageButton({ isActive, linkPage, onClick }: PageButtonProps): JSX.Element {
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

export function PaginatorElement({
  pagesCount,
  currentPage,
  onPageChange,
}: PaginatorElementProps) {
  const [activePage, setActivePage] = useState(currentPage);
  const [firstPage, setFirstPage] = useState(currentPage);
  const lastPage = Math.min(firstPage + MAX_PAGES_VISIBLE - 1, pagesCount);
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
            linkPage={firstPage + MAX_PAGES_VISIBLE}
          />
        )}
      </ul>
    </div>
  );
}
