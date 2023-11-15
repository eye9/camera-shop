import { PaginatorElement } from '../paginator-element/paginator-element';
import { CardsList } from './components/card-list/cards-list';
import { CatalogSort } from './components/catalog-sort/catalog-sort';
import { CatalogFilter } from './components/catalog-filter/catalog-filter';
import { BreadcrumbsElement } from '../breadcrumbs-element/breadcrumbs-element';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { selectProducts } from '../../store/selectors';
import { useAppSelector } from '../../hooks/hooks';
import { Helmet } from 'react-helmet-async';
import { MainCatalogSettings } from '../../const';
import { AppParams, SortOrders, SortTypes } from './const';
import { priceSorter, popularitySorter } from '../../utils/utils';

export function MainCatalog() {
  const products = useAppSelector(selectProducts);
  const [search] = useSearchParams();
  const [currentPage, setPage] = useState(
    Number(search.get(AppParams.Page)) || 1
  );
  const sortType = search.get(AppParams.SortType);
  const sortOrder = search.get(AppParams.SortOrder);
  const isSorted = sortOrder === SortOrders.Asc || sortOrder === SortOrders.Desc;

  let sortedProducts = products;
  if (isSorted) {
    if (sortType === SortTypes.Price) {
      sortedProducts = sortedProducts.slice().sort(priceSorter(sortOrder));
    } else if (sortType === SortTypes.Popularity) {
      sortedProducts = sortedProducts.slice().sort(popularitySorter(sortOrder));
    }
  }

  const pagesCount =
    Math.floor(products.length / MainCatalogSettings.CardsPerPage) +
    (products.length % MainCatalogSettings.CardsPerPage > 0 ? 1 : 0);

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
                products={sortedProducts.slice(
                  (currentPage - 1) * MainCatalogSettings.CardsPerPage,
                  currentPage * MainCatalogSettings.CardsPerPage
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
