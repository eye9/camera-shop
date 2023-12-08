import { useAppDispatch } from '../../../../hooks/hooks';
import { addingToBusket } from '../../../../store/busket-process';
import { ProductProps } from '../../product-page';


export function AddToBusketButton({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  return (
    <button
      className="btn btn--purple"
      type="button"
      onClick={() => dispatch(addingToBusket(product))}
    >
      <svg width={24} height={16} aria-hidden="true">
        <use xlinkHref="#icon-add-basket" />
      </svg>
      Добавить в корзину
    </button>
  );
}
