import { useEffect, useState, useRef, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AppParams,
  FilterCategory,
  FilterLevel,
  FilterType,
  FilterCategories,
  FilterLevels,
  FilterTypes,
} from '../../const';
import { useAppDispatch } from '../../../../hooks/hooks';
import {
  fetchProductsAction,
  fetchProductsActionWithPrice,
} from '../../../../store/api-actions';

type CatalogFilterProps = {
  minPrice: number;
  maxPrice: number;
};

export function CatalogFilter({ minPrice, maxPrice }: CatalogFilterProps) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get(AppParams.Category) || ''
  );
  const [levelFilter, setLevelFilter] = useState(
    searchParams.get(AppParams.Level)?.split(',') || ([] as FilterLevel[])
  );
  const [typeFilter, setTypeFilter] = useState(
    searchParams.get(AppParams.Type)?.split(',') || ([] as FilterType[])
  );
  const disabledVideoTypes = [FilterType.Snapshot, FilterType.Film];
  const [minValue, setMin] = useState(minPrice);
  const [maxValue, setMax] = useState(maxPrice);
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchParams((prevParams) => {
      prevParams.set(AppParams.Page, '1');
      prevParams.set(AppParams.Category, categoryFilter);
      prevParams.set(AppParams.Level, levelFilter.join());
      prevParams.set(AppParams.Type, typeFilter.join());
      return prevParams;
    });
  }, [categoryFilter, levelFilter, typeFilter, setSearchParams]);

  const resetFilters = () => {
    if (minRef.current) {
      minRef.current.value = '';
    }
    if (maxRef.current) {
      maxRef.current.value = '';
    }
    setCategoryFilter('');
    setLevelFilter([] as Array<string>);
    setTypeFilter([] as Array<string>);
    setSearchParams((prevParams) => {
      prevParams.set(AppParams.Page, '1');
      return prevParams;
    });
    dispatch(fetchProductsAction());
  };
  const handleFilterChange = (
    filter: string,
    filtersList: string[],
    filterSetter: (s: string[]) => void
  ) => {
    if (filtersList.includes(filter)) {
      filterSetter(filtersList.filter((item) => item !== filter));
    } else {
      const newFilter = filtersList.slice();
      newFilter.push(filter);
      filterSetter(newFilter);
    }
  };
  const handleTypeFilterChange = (type: string) => {
    handleFilterChange(type, typeFilter, setTypeFilter);
  };
  const handleLevelFilterChange = (level: string) => {
    handleFilterChange(level, levelFilter, setLevelFilter);
  };
  const handleCategoryFilterChange = (category: string) => {
    if (categoryFilter !== category) {
      setCategoryFilter(category);
      if (category === FilterCategory.Video) {
        setTypeFilter(
          typeFilter.filter(
            (filterName) =>
              !disabledVideoTypes.includes(filterName as FilterType)
          )
        );
      }
    } else {
      setCategoryFilter('');
    }
  };
  const gotoFirstPage = () => {
    setSearchParams((prevParams) => {
      prevParams.set(AppParams.Page, '1');
      return prevParams;
    });
  };
  const isTypesFilterItemDisabled = (filterName: FilterType) =>
    categoryFilter === FilterCategory.Video &&
    disabledVideoTypes.includes(filterName);

  const handleMinBlur = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && maxRef.current && minRef.current) {
      const currentMin = +minRef.current.value;
      const tempMin = Math.min(maxPrice, Math.max(0, minPrice, currentMin));

      if (currentMin !== tempMin) {
        setMin(tempMin);
        e.currentTarget.value = String(tempMin);

        if (maxRef.current.value !== '') {
          gotoFirstPage();
          dispatch(
            fetchProductsActionWithPrice({ min: tempMin, max: maxValue })
          );
        }
      }
    }
  };
  const handleMaxBlur = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && maxRef.current && minRef.current) {
      const currentMax = +maxRef.current.value;
      const tempMax = Math.max(minValue, Math.min(maxPrice, currentMax));
      if (currentMax !== tempMax) {
        setMax(tempMax);
        e.currentTarget.value = String(tempMax);

        if (minRef.current.value !== '') {
          gotoFirstPage();
          dispatch(
            fetchProductsActionWithPrice({ min: minValue, max: tempMax })
          );
        }
      }
    }
  };

  const handleMaxFocus = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && minRef.current && maxRef.current) {
      if (maxRef.current.value === '' && minRef.current.value !== '') {
        setMax(maxPrice);
        maxRef.current.value = String(maxPrice);
      }
    }
  };
  const handleMinFocus = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && minRef.current && maxRef.current) {
      if (minRef.current.value === '' && maxRef.current.value !== '') {
        minRef.current.value = String(minPrice);
        setMin(minPrice);
      }
    }
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    ref={minRef}
                    type="number"
                    name="price"
                    placeholder={String(minPrice)}
                    min={0}
                    onBlur={handleMinBlur}
                    onChange={(e) => setMin(+e.target.value)}
                    onFocus={handleMinFocus}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    ref={maxRef}
                    type="number"
                    name="priceUp"
                    placeholder={String(maxPrice)}
                    min={0}
                    onBlur={handleMaxBlur}
                    onChange={(e) => setMax(+e.target.value)}
                    onFocus={handleMaxFocus}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {FilterCategories.map((item) => (
              <div
                className="custom-checkbox catalog-filter__item"
                key={item.name}
              >
                <label>
                  <input
                    type="checkbox"
                    name={item.name}
                    data-testid={item.name}
                    disabled={
                      categoryFilter !== item.name && categoryFilter !== ''
                    }
                    checked={categoryFilter === item.name}
                    onChange={() => handleCategoryFilterChange(item.name)}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">{item.label}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {FilterTypes.map((item) => (
              <div
                className="custom-checkbox catalog-filter__item"
                key={item.name}
              >
                <label>
                  <input
                    type="checkbox"
                    name={item.name}
                    data-testid={item.name}
                    disabled={isTypesFilterItemDisabled(
                      item.name as FilterType
                    )}
                    checked={typeFilter.includes(item.name)}
                    onChange={() => handleTypeFilterChange(item.name)}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">{item.label}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {FilterLevels.map((item) => (
              <div
                className="custom-checkbox catalog-filter__item"
                key={item.name}
              >
                <label>
                  <input
                    type="checkbox"
                    name={item.name}
                    data-testid={item.name}
                    checked={levelFilter.includes(item.name)}
                    onChange={() => handleLevelFilterChange(item.name)}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">{item.label}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={resetFilters}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}
