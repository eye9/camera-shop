import { HelmetProvider } from 'react-helmet-async';
import { MainPage } from '../../pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { ProductPage } from '../../pages/product-page/product-page';
import { BasketPage } from '../../pages/basket-page';
import ScrollToTop from '../scroll-top';
import { NotFound } from '../../pages/not-found';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main} element={<MainPage />} />
          <Route path={AppRoutes.Busket} element={<BasketPage />} />
          <Route path={`${AppRoutes.Product}/:id`} element={<ProductPage />} />
          <Route path={AppRoutes.Any} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
