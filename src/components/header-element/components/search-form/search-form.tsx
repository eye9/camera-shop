import cn from 'classnames';
import { useSelector } from 'react-redux';
import {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  useCallback,
} from 'react';
import { LETTERS_TO_OPEN_SEARCH } from '../../const';
import { selectProducts } from '../../../../store/selectors';
import { SearchItem } from './components/search-item/search-item';
import { Products } from '../../../../types/product';
import { useNavigate } from 'react-router-dom';

import './style.css';
import { AppRoutes } from '../../../../const';

export function SearchForm() {
  const navigate = useNavigate();
  const [isListOpened, setListOpened] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const products = useSelector(selectProducts);
  const filteredProducts: MutableRefObject<Products> = useRef([]);
  const selectedSearchItem = useRef(0);

  const setOpenedList = useCallback((isOpen: boolean) => {
    setListOpened(isOpen);
    selectedSearchItem.current = 0;
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('.form-search__select-list') === null) {
      return;
    }
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      selectedSearchItem.current = Math.min(selectedSearchItem.current + 1, filteredProducts.current.length - 1);
      if (listRef.current?.children && listRef.current?.children.length > selectedSearchItem.current) {
        (listRef.current?.children[selectedSearchItem.current] as HTMLLIElement).focus();
      }
    }
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      selectedSearchItem.current = Math.max(selectedSearchItem.current - 1, 0);
      if (listRef.current?.children && listRef.current?.children.length > 0) {
        (listRef.current?.children[selectedSearchItem.current] as HTMLLIElement).focus();
      }
    }
    if (e.code === 'Enter') {
      e.preventDefault();
      if (listRef.current?.children && listRef.current?.children.length > 0) {
        const id =
          (listRef.current?.children[selectedSearchItem.current] as HTMLLIElement).dataset.id || 0;
        navigate(`${AppRoutes.Product}/${id}`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });

  useEffect(() => {
    if (searchText.length >= LETTERS_TO_OPEN_SEARCH) {
      filteredProducts.current = products.filter((product) =>
        product.name.match(new RegExp(`${searchText}`, 'i'))
      );
      setOpenedList(filteredProducts.current.length > 0);
    } else {
      setOpenedList(false);
    }
  }, [products, searchText, setOpenedList]);

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
        <ul className="form-search__select-list scroller" ref={listRef}>
          {isListOpened &&
            searchRef.current !== null &&
            filteredProducts.current.map((product) => (
              <SearchItem product={product} key={product.id} />
            ))}
        </ul>
      </form>
      <button
        className={cn('form-search__reset', { visible: searchText.length > 0 })}
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
