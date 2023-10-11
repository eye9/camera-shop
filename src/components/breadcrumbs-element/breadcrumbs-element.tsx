import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

type BreadcrumbsElementProps = {
  productName?: string;
};

export function BreadcrumbsElement({ productName }: BreadcrumbsElementProps) {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoutes.Main}>
              Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          {!productName ? (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
              </span>
            </li>
          ) : (
            <>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoutes.Main}>
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {productName}
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
