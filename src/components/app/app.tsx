import { HelmetProvider } from 'react-helmet-async';
import { MainPage } from '../../pages/main-page/main-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { ProductPage } from '../../pages/product-page/product-page';
import { BasketPage } from '../../pages/basket-page/basket-page';
import ScrollToTop from '../../utils/scroll-top';
import { NotFound } from '../../pages/not-found/not-found';

export function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoutes.Main} element={<MainPage />} />
        <Route path={AppRoutes.Busket} element={<BasketPage />} />
        <Route path={`${AppRoutes.Product}/:id`} element={<ProductPage />} />
        <Route path={AppRoutes.Any} element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  );
}
