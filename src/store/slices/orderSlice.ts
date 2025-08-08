/**
 * Slice para gerenciamento de pedidos
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderData, OrderStatus } from '@/types';

interface OrderState {
  currentOrder: OrderData | null;
  orders: OrderData[];
  isSearchingDrivers: boolean;
  isLoading: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  isSearchingDrivers: false,
  isLoading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<OrderData>) => {
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<OrderStatus>) => {
      if (state.currentOrder) {
        state.currentOrder.status = action.payload;
      }
    },
    setSearchingDrivers: (state, action: PayloadAction<boolean>) => {
      state.isSearchingDrivers = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderData>) => {
      state.orders.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  setCurrentOrder,
  updateOrderStatus,
  setSearchingDrivers,
  addOrder,
  setLoading,
  clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;