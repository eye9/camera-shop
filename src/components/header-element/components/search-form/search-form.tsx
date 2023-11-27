import cn from 'classnames';
import { useSelector } from 'react-redux';
import { ChangeEvent, useState, useRef } from 'react';
import { LETTERS_TO_OPEN_SEARCH } from '../../const';
import { selectProducts } from '../../../../store/selectors';
import { SearchItem } from './components/search-item/search-item';

export function SearchForm() {
  const [isListOpened, setOpenedList] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef(null);
  const products = useSelector(selectProducts);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenedList(e.target.value.length >= LETTERS_TO_OPEN_SEARCH);
    setSearchText(e.target.value);
  };

  return (
    <div className={cn('form-search', { 'list-opened': isListOpened })}>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            ref={searchRef}
            onChange={handleSearchChange}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchText}
            data-testid='search'
          />
        </label>
        <ul className="form-search__select-list scroller">
          {isListOpened &&
            searchRef.current !== null &&
            products
              .filter((product) => product.name.match(searchText))
              .map((product) => (
                <SearchItem product={product} key={product.id} />
              ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={() => {
          setSearchText('');
          setOpenedList(false);
        }}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
