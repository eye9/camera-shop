import { Products } from '../types/product';
import { State } from '../types/state';

export const selectProducts = (state: State): Products => state.products;
