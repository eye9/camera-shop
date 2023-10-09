import { Products } from '../../types/product';
import { ProductCard } from './product-card';

type CardsListProps = {
  products: Products;
};

export function CardsList({ products }: CardsListProps) {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
