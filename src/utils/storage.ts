import { Busket } from '../store/busket-process';

const emptyBusket = {
  items: [],
  itemsCount: [],
};

export function loadBusket(): Busket {
  return JSON.parse(
    localStorage.getItem('busket') || JSON.stringify(emptyBusket)
  ) as Busket;
}
export function saveBusket(busket: Busket) {
  localStorage.setItem('busket', JSON.stringify(busket));
}
