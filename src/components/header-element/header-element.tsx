import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChangeEvent, useState, useRef } from 'react';
import { AppRoutes } from '../../const';
import { LETTERS_TO_OPEN_SEARCH } from './const';
import { selectProducts } from '../../store/selectors';
import { SearchItem } from './components/search-item';

export function HeaderElement() {
  const [isListOpened, setOpenedList] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef(null);
  const products = useSelector(selectProducts);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenedList(e.target.value.length >= LETTERS_TO_OPEN_SEARCH);
    setSearchText(e.target.value);
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoutes.Main}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoutes.Main}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link">Гарантии</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link">Доставка</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link">О компании</a>
            </li>
          </ul>
        </nav>
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
        <Link className="header__basket-link" to={AppRoutes.Busket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
