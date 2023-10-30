import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productProcess } from './product-process';
import { busketProcess } from './busket-process';
import { reviewProcess } from './review-process';


export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Busket]: busketProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
});
