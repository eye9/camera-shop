import { products } from '../../mocks/products';
import { PaginatorElement } from './paginator-element';
import { CardsList } from './cards-list';
import { CatalogSort } from './catalog-sort';
import { CatalogFilter } from './catalog-filter';
import { BreadcrumbsElement } from './breadcrumbs-element';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CARDS_PER_PAGE = 9;

export function MainCatalog() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [currentPage, setPage] = useState(Number(query.get('page')) || 1);
  const pagesCount = Math.floor(products.length / CARDS_PER_PAGE) + (products.length % CARDS_PER_PAGE > 0 ? 1 : 0);

  return (
    <div className="page-content">
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
              <PaginatorElement onPageChange={setPage} pagesCount={pagesCount} currentPage={currentPage}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
