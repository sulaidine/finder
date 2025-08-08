/**
 * Configuração do Redux Store
 * Gerencia o estado global da aplicação
 */

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import orderSlice from './slices/orderSlice';
import driverSlice from './slices/driverSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderSlice,
    driver: driverSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;