import { HelmetProvider } from 'react-helmet-async';
import { MainPage } from '../../pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
