import { Products } from '../../../../types/product';
import { ProductCard } from '../../../product-card/product-card';

type CardsListProps = {
  products: Products;
};

export function CardsList({ products }: CardsListProps) {
  if (products && products.length > 0) {
    return (
      <div className="cards catalog__cards">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    );
  } else {
    return <p>по вашему запросу ничего не найдено</p>;
  }
}
