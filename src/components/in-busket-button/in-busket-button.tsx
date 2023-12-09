import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

export function InBusketButton() {
  return (
    <Link className="btn btn--purple-border" to={`${AppRoutes.Busket}`}>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      В корзине
    </Link>
  );
}
