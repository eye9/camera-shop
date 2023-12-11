import { Busket } from '../store/busket-process';

const emptyBusket: Busket = {
  items: [],
  itemsCount: [],
  discount: 0,
};

export function loadBusket(): Busket {
  return JSON.parse(
    localStorage.getItem('busket') || JSON.stringify(emptyBusket)
  ) as Busket;
}
export function saveBusket(busket: Busket) {
  localStorage.setItem('busket', JSON.stringify(busket));
}
