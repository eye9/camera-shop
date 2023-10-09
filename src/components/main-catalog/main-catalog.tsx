import { products } from '../../mocks/products';
import { PaginatorElement } from './paginator-element';
import { CardsList } from './cards-list';
import { CatalogSort } from './catalog-sort';
import { CatalogFilter } from './catalog-filter';
import { BreadcrumbsElement } from './breadcrumbs-element';

export function MainCatalog() {
  return (
    <div className="page-content">
      <BreadcrumbsElement />
      <section className="catalog">
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <CatalogFilter />
            <div className="catalog__content">
              <CatalogSort />
              <CardsList products={products}/>
              <PaginatorElement />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
