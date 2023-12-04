import cn from 'classnames';
import { useSelector } from 'react-redux';
import { ChangeEvent, useState, useRef } from 'react';
import { LETTERS_TO_OPEN_SEARCH } from '../../const';
import { selectProducts } from '../../../../store/selectors';
import { SearchItem } from './components/search-item/search-item';

import './style.css';

export function SearchForm() {
  const [isListOpened, setOpenedList] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
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
            data-testid="search"
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
        className={cn('form-search__reset', { 'visible': searchText.length > 0 })}
        type="reset"
        onClick={() => {
          setSearchText('');
          setOpenedList(false);
          if (searchRef) {
            searchRef.current?.focus();
          }
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
