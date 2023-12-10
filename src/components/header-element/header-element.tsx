import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { SearchForm } from './components/search-form/search-form';
import { useSelector } from 'react-redux';
import { selectBusket } from '../../store/selectors';

export function HeaderElement() {
  const busket = useSelector(selectBusket);
  const busketItemsCount = busket.itemsCount && busket.itemsCount.reduce((acc, curr) => acc + curr, 0);
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
        <SearchForm />
        <Link className="header__basket-link" to={AppRoutes.Busket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {busketItemsCount > 0 && <span className="header__basket-count">{busketItemsCount}</span>}
        </Link>
      </div>
    </header>
  );
}
