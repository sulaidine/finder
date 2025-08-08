/**
 * Slice para gerenciamento de motoristas
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriverData } from '@/types';

interface DriverState {
  currentDriver: DriverData | null;
  availableDrivers: DriverData[];
  isLoading: boolean;
}

const initialState: DriverState = {
  currentDriver: null,
  availableDrivers: [],
  isLoading: false,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setCurrentDriver: (state, action: PayloadAction<DriverData>) => {
      state.currentDriver = action.payload;
    },
    setAvailableDrivers: (state, action: PayloadAction<DriverData[]>) => {
      state.availableDrivers = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearCurrentDriver: (state) => {
      state.currentDriver = null;
    },
  },
});

export const {
  setCurrentDriver,
  setAvailableDrivers,
  setLoading,
  clearCurrentDriver,
} = driverSlice.actions;

export default driverSlice.reducer;