import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortTypes, SortOrders } from '../../const';

export function CatalogSort() {
  const [filterType, setFilterType] = useState(SortTypes.Price as string);
  const [filterOrder, setFilterOrder] = useState(SortOrders.Any as string);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      page: searchParams.get('page') || '',
      sort: filterType,
      order: filterOrder,
    });
  }, [filterType, filterOrder, setSearchParams, searchParams]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={filterType === SortTypes.Price}
                onChange={() => {
                  setFilterType(SortTypes.Price);
                }}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={filterType === SortTypes.Popularity}
                onChange={() => setFilterType(SortTypes.Popularity)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={filterOrder === SortOrders.Asc}
                onChange={() => setFilterOrder(SortOrders.Asc)}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={filterOrder === SortOrders.Desc}
                onChange={() => setFilterOrder(SortOrders.Desc)}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
