import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppParams,
  FilterCategory,
  FilterLevel,
  FilterType,
  FilterCategories,
  FilterLevels,
  FilterTypes,
} from '../../const';

export function CatalogFilter() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [categoryFilter, setCategoryFilter] = useState(
    queryParams.get(AppParams.Category) || ''
  );
  const [levelFilter, setLevelFilter] = useState(
    queryParams.get(AppParams.Level)?.split(',') || ([] as FilterLevel[])
  );
  const [typeFilter, setTypeFilter] = useState(
    queryParams.get(AppParams.Type)?.split(',') || ([] as FilterType[])
  );
  const disabledVideoTypes = [FilterType.Snapshot, FilterType.Film];
  useEffect(() => {
    queryParams.set(AppParams.Category, categoryFilter);
    queryParams.set(AppParams.Level, levelFilter.join());
    queryParams.set(AppParams.Type, typeFilter.join());
    navigate({ search: queryParams.toString() });
  }, [categoryFilter, levelFilter, typeFilter, navigate, queryParams]);

  const resetFilters = () => {
    setCategoryFilter('');
    setLevelFilter([] as Array<string>);
    setTypeFilter([] as Array<string>);
  };

  const handleTypeFilterChange = (type: string) => {
    if (typeFilter.includes(type)) {
      setTypeFilter(typeFilter.filter((item) => item !== type));
    } else {
      const newFilter = typeFilter.slice();
      newFilter.push(type);
      setTypeFilter(newFilter);
    }
  };
  const handleLevelFilterChange = (level: string) => {
    if (levelFilter.includes(level)) {
      setLevelFilter(levelFilter.filter((item) => item !== level));
    } else {
      const newFilter = levelFilter.slice();
      newFilter.push(level);
      setLevelFilter(newFilter);
    }
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

  const isFilterDisabled = (filterName: FilterType) =>
    categoryFilter === FilterCategory.Video &&
    disabledVideoTypes.includes(filterName);

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
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
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
                    disabled={isFilterDisabled(item.name as FilterType)}
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
