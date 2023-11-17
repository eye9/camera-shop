import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppParams,
  FilterCategory,
  FilterLevel,
  FilterType,
} from '../../const';

type FilterItem = {
  label: string;
  name: string;
  isChecked?: boolean;
  isDisabled?: boolean;
};

const filterCategories: FilterItem[] = [
  {
    label: 'Фотокамера',
    name: FilterCategory.Photo,
    isChecked: false,
    isDisabled: false,
  },
  {
    label: 'Видеокамера',
    name: FilterCategory.Video,
    isChecked: false,
    isDisabled: false,
  },
];
const filterTypes: FilterItem[] = [
  {
    label: 'Цифровая',
    name: FilterType.Digital,
    isChecked: false,
    isDisabled: false,
  },
  {
    label: 'Плёночная',
    name: FilterType.Film,
    isChecked: false,
    isDisabled: false,
  },
  {
    label: 'Моментальная',
    name: FilterType.Snapshot,
    isChecked: false,
    isDisabled: false,
  },
  {
    label: 'Коллекционная',
    name: FilterType.Collectible,
    isChecked: false,
    isDisabled: false,
  },
];
const filterLevels: FilterItem[] = [
  {
    label: 'Нулевой',
    name: FilterLevel.Zero,
    isChecked: false,
    isDisabled: false,
  },
  {
    label: 'Любительский',
    name: FilterLevel.Amateur,
    isChecked: false,
    isDisabled: false,
  },
  {
    label: 'Профессиональный',
    name: FilterLevel.Professional,
    isChecked: false,
    isDisabled: false,
  },
];

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
    queryParams.get(AppParams.Level)?.split(',') || ([] as Array<string>)
  );
  const [typeFilter, setTypeFilter] = useState(
    queryParams.get(AppParams.Type)?.split(',') || ([] as Array<string>)
  );

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
    } else {
      setCategoryFilter('');
    }
  };

  const isFilterDisabled = (filterName: string) =>
    categoryFilter === FilterCategory.Video &&
    (filterName === FilterType.Snapshot || filterName === FilterType.Film);

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
            {filterCategories.map((item) => (
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
            {filterTypes.map((item) => (
              <div
                className="custom-checkbox catalog-filter__item"
                key={item.name}
              >
                <label>
                  <input
                    type="checkbox"
                    name={item.name}
                    disabled={isFilterDisabled(item.name)}
                    checked={typeFilter.includes(item.name) && !isFilterDisabled(item.name)}
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
            {filterLevels.map((item) => (
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
          <button className="btn catalog-filter__reset-btn" type="reset" onClick={resetFilters}>
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}
