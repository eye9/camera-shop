import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SortTypes, SortOrders, AppParams } from '../../const';

export function CatalogSort() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [sortType, setFilterType] = useState(queryParams.get(AppParams.SortType) || SortTypes.Price);
  const [sortOrder, setFilterOrder] = useState(queryParams.get(AppParams.SortOrder) || SortOrders.Any);

  useEffect(() => {
    queryParams.set(AppParams.SortType, sortType);
    queryParams.set(AppParams.SortOrder, sortOrder);
    navigate({ search: queryParams.toString() });
  }, [sortType, sortOrder, navigate, location.search, queryParams]);

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
                checked={sortType === SortTypes.Price}
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
                checked={sortType === SortTypes.Popularity}
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
                checked={sortOrder === SortOrders.Asc}
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
                checked={sortOrder === SortOrders.Desc}
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
