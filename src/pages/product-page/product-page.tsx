import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FooterElement } from '../../components/footer-element/footer-element';
import { HeaderElement } from '../../components/header-element/header-element';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectDataStatus,
  selectProduct,
  selectProductReviews,
  selectSimilarProducts,
} from '../../store/selectors';
import {
  fetchProductAction,
  fetchReviewsAction,
  fetchSimilarProductsAction,
} from '../../store/api-actions';
import { BreadcrumbsElement } from '../../components/breadcrumbs-element/breadcrumbs-element';
import { Product } from '../../types/product';
import { AddItemModal } from '../../components/add-item-modal/add-item-modal';
import { ProductDetails } from './product-details';
import { SimilarProducts } from './similar-products';
import { ProductReviews } from './product-reviews';
import { NotFound } from '../not-found';
import { LoadingElement } from '../../components/loading-element';
import { AddReviewModal } from '../../components/add-review-modal/add-review-modal';
import { Helmet } from 'react-helmet-async';
import ReviewSuccess from '../../components/add-review-modal/review-success';

export type ProductProps = {
  product: Product;
};

export function ProductPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isDataLoading = useAppSelector(selectDataStatus);
  const product = useAppSelector(selectProduct);
  const similarProducts = useAppSelector(selectSimilarProducts);
  const reviews = useAppSelector(selectProductReviews);

  useEffect(() => {
    let shouldUpdate = true;
    if (id && shouldUpdate) {
      dispatch(fetchProductAction(id));
      dispatch(fetchSimilarProductsAction(id));
      dispatch(fetchReviewsAction(id));
    }
    return () => {
      shouldUpdate = false;
    };
  }, [dispatch, id]);

  if (!id) {
    return <NotFound />;
  }

  if (isDataLoading || !product) {
    return <LoadingElement />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Продукт - Фотошоп</title>
      </Helmet>
      <HeaderElement />
      <main>
        <div className="page-content">
          <BreadcrumbsElement lastElement={product.name} />
          <ProductDetails product={product} />
          <div className="page-content__section">
            <SimilarProducts products={similarProducts} />
          </div>
          <div className="page-content__section">
            <ProductReviews reviews={reviews} />
          </div>
        </div>
        <AddItemModal />
        <AddReviewModal product={product} />
        <ReviewSuccess />
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
