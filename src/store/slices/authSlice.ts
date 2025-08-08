/**
 * Slice para gerenciamento de autenticação
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserType } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  phoneNumber: string;
  verificationCode: string;
  userType: UserType;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  phoneNumber: '',
  verificationCode: '',
  userType: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setVerificationCode: (state, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.phoneNumber = '';
      state.verificationCode = '';
      state.userType = null;
    },
  },
});

export const {
  setPhoneNumber,
  setVerificationCode,
  setUserType,
  setUser,
  setLoading,
  logout,
} = authSlice.actions;

export default authSlice.reducer;