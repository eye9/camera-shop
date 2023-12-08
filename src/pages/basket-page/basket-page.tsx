import { BusketElement } from '../../components/busket-element/busket-element';
import { FooterElement } from '../../components/footer-element/footer-element';
import { HeaderElement } from '../../components/header-element/header-element';

export function BasketPage() {
  return (
    <>
      <HeaderElement />
      <BusketElement />
      <FooterElement />
    </>
  );
}
