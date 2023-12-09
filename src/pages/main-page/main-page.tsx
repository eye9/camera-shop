import { FooterElement } from '../../components/footer-element/footer-element';
import { BannerElement } from '../../components/banner-element/banner-element';
import { HeaderElement } from '../../components/header-element/header-element';
import { MainCatalog } from '../../components/main-catalog/main-catalog';
import { AddItemModal } from '../../components/add-item-modal/add-item-modal';
import { AddItemSuccess } from '../../components/add-item-success/add-item-success';

export function MainPage() {
  return (
    <div className="wrapper">
      <HeaderElement />
      <main>
        <BannerElement />
        <MainCatalog />
        <AddItemModal />
        <AddItemSuccess />
      </main>
      <FooterElement />
    </div>
  );
}
