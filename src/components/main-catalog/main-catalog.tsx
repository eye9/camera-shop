import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { selectDataStatus, selectProducts } from '../../store/selectors';
import { useAppSelector } from '../../hooks/hooks';
import { PaginatorElement } from '../paginator-element/paginator-element';
import { CardsList } from './components/card-list/cards-list';
import { CatalogSort } from './components/catalog-sort/catalog-sort';
import { CatalogFilter } from './components/catalog-filter/catalog-filter';
import { BreadcrumbsElement } from '../breadcrumbs-element/breadcrumbs-element';
import { MainCatalogSettings } from '../../const';
import {
  AppParams,
  FilterCategories,
  FilterTypes,
  FilterLevels,
  SortOrders,
  SortTypes,
} from './const';
import { priceSorter, popularitySorter } from '../../utils/utils';
import { Products } from '../../types/product';
import { LoadingElement } from '../loading-element/loading-element';
import { useState } from 'react';

export function MainCatalog() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const products = useAppSelector(selectProducts);
  const isDataLoading = useAppSelector(selectDataStatus);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get(AppParams.Page)) || 1;
  let filteredProducts = products;
  const sortType = searchParams.get(AppParams.SortType);
  const sortOrder = searchParams.get(AppParams.SortOrder);
  const isSorted =
    sortOrder === SortOrders.Asc || sortOrder === SortOrders.Desc;

  const productCategory = searchParams.get(AppParams.Category)?.split(',');
  const productType = searchParams.get(AppParams.Type)?.split(',');
  const productLevel = searchParams.get(AppParams.Level)?.split(',');

  if (productCategory && productCategory[0] === '') {
    productCategory?.shift();
  }
  if (productType && productType[0] === '') {
    productType?.shift();
  }
  if (productLevel && productLevel[0] === '') {
    productLevel?.shift();
  }

  const isFilteredCategory = productCategory && productCategory.length !== 0;
  const isFilteredType = productType && productType.length !== 0;
  const isFilteredLevel = productLevel && productLevel.length !== 0;

  if (isFilteredCategory) {
    const category = FilterCategories.filter((item) =>
      productCategory.includes(item.name)
    ).map((item) => item.dbName);
    filteredProducts = filteredProducts.filter((product) =>
      category.includes(product.category)
    );
  }

  if (isFilteredType) {
    const type = FilterTypes.filter((item) =>
      productType.includes(item.name)
    ).map((item) => item.dbName);
    filteredProducts = filteredProducts.filter((product) =>
      type.includes(product.type)
    );
  }

  if (isFilteredLevel) {
    const level = FilterLevels.filter((item) =>
      productLevel.includes(item.name)
    ).map((item) => item.dbName);
    filteredProducts = filteredProducts.filter((product) =>
      level.includes(product.level)
    );
  }

  const minMax = (items: Products) =>
    items.reduce((acc, val) => {
      acc[0] = acc[0] === undefined || val.price < acc[0] ? val.price : acc[0];
      acc[1] = acc[1] === undefined || val.price > acc[1] ? val.price : acc[1];
      return acc;
    }, [] as number[]);

  const [minPrice = 0, maxPrice = 0] = minMax(filteredProducts);

  if (min !== 0 && max !== 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  let sortedProducts = filteredProducts;
  if (isSorted) {
    if (sortType === SortTypes.Price) {
      sortedProducts = sortedProducts.slice().sort(priceSorter(sortOrder));
    } else if (sortType === SortTypes.Popularity) {
      sortedProducts = sortedProducts.slice().sort(popularitySorter(sortOrder));
    }
  }

  const pagesCount =
    Math.floor(filteredProducts.length / MainCatalogSettings.CardsPerPage) +
    (filteredProducts.length % MainCatalogSettings.CardsPerPage > 0 ? 1 : 0);

  const handlePriceChange = (minFilter: number, maxFilter: number) => {
    setMin(minFilter);
    setMax(maxFilter);
  };

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
            <CatalogFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
            />
            <div className="catalog__content">
              <CatalogSort />
              {isDataLoading ? (
                <LoadingElement />
              ) : (
                <CardsList
                  products={sortedProducts.slice(
                    (currentPage - 1) * MainCatalogSettings.CardsPerPage,
                    currentPage * MainCatalogSettings.CardsPerPage
                  )}
                />
              )}
              <PaginatorElement
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
