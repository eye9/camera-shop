import { FooterElement } from '../components/footer-element/footer-element';
import { BannerElement } from '../components/banner-element/banner-element';
import { HeaderElement } from '../components/header-element/header-element';
import { MainCatalog } from '../components/main-catalog/main-catalog';
import { AddItemModal } from '../components/add-item-modal/add-item-modal';

export function MainPage() {
  return (
    <div className="wrapper">
      <HeaderElement />
      <main>
        <BannerElement />
        <MainCatalog />
        <AddItemModal />
      </main>
      <FooterElement />
    </div>
  );
}
