import { HelmetProvider } from 'react-helmet-async';
import { MainPage } from '../../pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { ProductPage } from '../../pages/product-page';
import ScrollToTop from '../scroll-top';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main} element={<MainPage />} />
          <Route path={`${AppRoutes.Product}/:id`} element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
