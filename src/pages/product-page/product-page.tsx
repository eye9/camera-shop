import { useParams } from 'react-router-dom';
import { FooterElement } from '../../components/footer-element/footer-element';
import { HeaderElement } from '../../components/header-element/header-element';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectProduct } from '../../store/selectors';
import { fetchProductAction } from '../../store/api-actions';
import { BreadcrumbsElement } from '../../components/breadcrumbs-element/breadcrumbs-element';
import { Product } from '../../types/product';
import { AddItemModal } from '../../components/add-item-modal/add-item-modal';
import { ProductDetails } from './product-details';
import { SimilarProducts } from './similar-products';
import { ProductReviews } from './product-reviews';
import { reviews } from '../../mock';

export type ProductProps = {
  product: Product;
};

export function ProductPage() {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isDataLoading = useAppSelector(selectDataStatus);
  const { id } = useParams();
  const product = useAppSelector(selectProduct);

  useEffect(() => {
    let shouldUpdate = true;
    if (id && shouldUpdate) {
      dispatch(fetchProductAction(id));
    }
    return () => {
      shouldUpdate = false;
    };
  }, [dispatch, id]);

  // if (!id) {
  //   return <NotFound />;
  // }

  // if (isDataLoading || !product) {
  //   return <LoadingElement />;
  // }

  // DELETE this guard
  if (!product) {
    return '';
  }

  return (
    <div className="wrapper">
      <HeaderElement />
      <main>
        <div className="page-content">
          <BreadcrumbsElement productName={product.name} />
          <ProductDetails product={product} />
          <div className="page-content__section">
            <SimilarProducts />
          </div>
          <div className="page-content__section">
            <ProductReviews reviews={reviews}/>
          </div>
        </div>
        <AddItemModal />
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <FooterElement />
    </div>
  );
}
