/**
 * Navegador para telas de autenticação
 * Inclui welcome, login, verificação e escolha de perfil
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '@/screens/auth/WelcomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import VerificationScreen from '@/screens/auth/VerificationScreen';
import ProfileChoiceScreen from '@/screens/auth/ProfileChoiceScreen';
import ClientNameScreen from '@/screens/auth/ClientNameScreen';
import TransporterApplicationScreen from '@/screens/auth/TransporterApplicationScreen';
import WaitingContactScreen from '@/screens/auth/WaitingContactScreen';
import PartnershipAgreementScreen from '@/screens/auth/PartnershipAgreementScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Verification: undefined;
  ProfileChoice: undefined;
  ClientName: undefined;
  TransporterApplication: undefined;
  WaitingContact: undefined;
  PartnershipAgreement: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="ProfileChoice" component={ProfileChoiceScreen} />
      <Stack.Screen name="ClientName" component={ClientNameScreen} />
      <Stack.Screen name="TransporterApplication" component={TransporterApplicationScreen} />
      <Stack.Screen name="WaitingContact" component={WaitingContactScreen} />
      <Stack.Screen name="PartnershipAgreement" component={PartnershipAgreementScreen} />
    </Stack.Navigator>
  );
}