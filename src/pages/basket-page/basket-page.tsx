import { Busket } from '../../components/busket/busket';
import { FooterElement } from '../../components/footer-element/footer-element';
import { HeaderElement } from '../../components/header-element/header-element';

export function BasketPage() {
  return (
    <>
      <HeaderElement />
      <Busket />
      <FooterElement />
    </>
  );
}
