/**
 * Navegador principal após autenticação
 * Inclui navegação por tabs e stacks específicos para cliente e transportadora
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { useTheme } from '@/contexts/ThemeContext';

// Client Screens
import CreateOrderScreen from '@/screens/client/CreateOrderScreen';
import SearchTrucksScreen from '@/screens/client/SearchTrucksScreen';
import PaymentScreen from '@/screens/client/PaymentScreen';
import OrderStatusScreen from '@/screens/client/OrderStatusScreen';
import ClientProfileScreen from '@/screens/client/ClientProfileScreen';

// Transporter Screens
import ManagementSystemScreen from '@/screens/transporter/ManagementSystemScreen';
import OrderReceivingScreen from '@/screens/transporter/OrderReceivingScreen';
import CommissionPaymentScreen from '@/screens/transporter/CommissionPaymentScreen';
import TransporterProfileScreen from '@/screens/transporter/TransporterProfileScreen';

export type ClientStackParamList = {
  CreateOrder: undefined;
  SearchTrucks: { orderData: any };
  Payment: { orderData: any };
  OrderStatus: { orderData: any; driverData: any };
};

export type TransporterStackParamList = {
  Management: undefined;
  OrderReceiving: undefined;
  CommissionPayment: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const ClientStack = createStackNavigator<ClientStackParamList>();
const TransporterStack = createStackNavigator<TransporterStackParamList>();

function ClientNavigator() {
  return (
    <ClientStack.Navigator screenOptions={{ headerShown: false }}>
      <ClientStack.Screen name="CreateOrder" component={CreateOrderScreen} />
      <ClientStack.Screen name="SearchTrucks" component={SearchTrucksScreen} />
      <ClientStack.Screen name="Payment" component={PaymentScreen} />
      <ClientStack.Screen name="OrderStatus" component={OrderStatusScreen} />
    </ClientStack.Navigator>
  );
}

function TransporterNavigator() {
  return (
    <TransporterStack.Navigator screenOptions={{ headerShown: false }}>
      <TransporterStack.Screen name="Management" component={ManagementSystemScreen} />
      <TransporterStack.Screen name="OrderReceiving" component={OrderReceivingScreen} />
      <TransporterStack.Screen name="CommissionPayment" component={CommissionPaymentScreen} />
    </TransporterStack.Navigator>
  );
}

export function MainNavigator() {
  const { userType } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={userType === 'client' ? ClientNavigator : TransporterNavigator}
        options={{ tabBarLabel: 'Início' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={userType === 'client' ? ClientProfileScreen : TransporterProfileScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}