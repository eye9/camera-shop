import { Busket } from '../store/busket-process';

export const emptyBusket: Busket = {
  items: [],
  itemsCount: [],
  discount: 0,
  coupon: null
};

export function loadBusket(): Busket {
  return JSON.parse(
    localStorage.getItem('busket') || JSON.stringify(emptyBusket)
  ) as Busket;
}
export function saveBusket(busket: Busket) {
  localStorage.setItem('busket', JSON.stringify(busket));
}
export function resetBusket() {
  localStorage.removeItem('busket');
}
