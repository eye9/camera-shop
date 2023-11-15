import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../../../const';
import { Product } from '../../../../../../types/product';

type SearchItemProps = {
  product: Product;
};

export function SearchItem({ product }: SearchItemProps) {
  const navigate = useNavigate();
  return (
    <li
      className="form-search__select-item"
      tabIndex={0}
      onClick={() => navigate(`${AppRoutes.Product}/${product.id}`)}
    >
      {product.name}
    </li>
  );
}
