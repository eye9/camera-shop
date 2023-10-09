import { FooterElement } from '../components/footer-element/footer-element';
import { BannerElement } from '../components/banner-element/banner-element';
import { HeaderElement } from '../components/header-element/header-element';
import { MainCatalog } from '../components/main-catalog/main-catalog';

export function MainPage() {
  return (
    <div className="wrapper">
      <HeaderElement />
      <main>
        <BannerElement />
        <MainCatalog />
      </main>
      <FooterElement />
    </div>
  );
}
