import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { store } from '../store/store';
import { createApi } from '../services/api';

export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;
export type State = ReturnType<typeof store.getState>;
