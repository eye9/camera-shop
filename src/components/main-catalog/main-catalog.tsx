import { PaginatorElement } from './paginator-element';
import { CardsList } from './cards-list';
import { CatalogSort } from './catalog-sort';
import { CatalogFilter } from './catalog-filter';
import { BreadcrumbsElement } from '../breadcrumbs-element/breadcrumbs-element';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { selectProducts } from '../../store/selectors';
import { useAppSelector } from '../../hooks/hooks';
import { Helmet } from 'react-helmet-async';

const CARDS_PER_PAGE = 9;
const AppParams = {
  Page: 'page',
} as const;

export function MainCatalog() {
  const [search] = useSearchParams();
  const [currentPage, setPage] = useState(Number(search.get(AppParams.Page)) || 1);

  const products = useAppSelector(selectProducts);
  const pagesCount =
    Math.floor(products.length / CARDS_PER_PAGE) +
    (products.length % CARDS_PER_PAGE > 0 ? 1 : 0);

  return (
    <div className="page-content">
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <BreadcrumbsElement />
      <section className="catalog">
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <CatalogFilter />
            <div className="catalog__content">
              <CatalogSort />
              <CardsList
                products={products.slice(
                  (currentPage - 1) * CARDS_PER_PAGE,
                  currentPage * CARDS_PER_PAGE
                )}
              />
              <PaginatorElement
                onPageChange={setPage}
                pagesCount={pagesCount}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
