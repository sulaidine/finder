/**
 * Tipos principais da aplicação
 */

export type UserType = 'client' | 'transporter' | null;

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: UserType;
  createdAt: string;
}

export interface OrderData {
  id?: string;
  pickupAddress: string;
  deliveryAddress: string;
  date: string;
  time: string;
  description: string;
  clientId?: string;
  status?: OrderStatus;
  amount?: number;
  distance?: string;
}

export interface DriverData {
  id: string;
  name: string;
  phone: string;
  truckType: string;
  license: string;
  eta: string;
  rating: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'driver_assigned'
  | 'pickup_in_progress'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export interface TransporterApplication {
  companyName: string;
  contactPerson: string;
  email: string;
  license: string;
  truckType: string;
  phone: string;
}

export interface AppState {
  currentScreen: string;
  userType: UserType;
  phoneNumber: string;
  verificationCode: string;
  clientName: string;
  orderData: OrderData | null;
  driverData: DriverData | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  white: string;
  black: string;
}

export type Theme = 'light' | 'dark';