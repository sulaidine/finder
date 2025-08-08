import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { VerificationScreen } from './components/VerificationScreen';
import { ProfileChoiceScreen } from './components/ProfileChoiceScreen';
import { ClientNameScreen } from './components/ClientNameScreen';
import { CreateOrderScreen } from './components/CreateOrderScreen';
import { SearchTrucksScreen } from './components/SearchTrucksScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { OrderStatusScreen } from './components/OrderStatusScreen';
import { TransporterApplicationScreen } from './components/TransporterApplicationScreen';
import { WaitingContactScreen } from './components/WaitingContactScreen';
import { PartnershipAgreementScreen } from './components/PartnershipAgreementScreen';
import { ManagementSystemScreen } from './components/ManagementSystemScreen';
import { OrderReceivingScreen } from './components/OrderReceivingScreen';
import { CommissionPaymentScreen } from './components/CommissionPaymentScreen';

export type UserType = 'client' | 'transporter' | null;

export interface AppState {
  currentScreen: string;
  userType: UserType;
  phoneNumber: string;
  verificationCode: string;
  clientName: string;
  orderData: any;
  driverData: any;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'welcome',
    userType: null,
    phoneNumber: '',
    verificationCode: '',
    clientName: '',
    orderData: null,
    driverData: null,
  });

  const [navigationHistory, setNavigationHistory] = useState<string[]>(['welcome']);

  const updateState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const navigateTo = (screen: string) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }));
    setNavigationHistory(prev => [...prev, screen]);
  };

  const goBack = () => {
    if (navigationHistory.length <= 1) return;
    
    const newHistory = [...navigationHistory];
    newHistory.pop(); // Remove current screen
    const previousScreen = newHistory[newHistory.length - 1];
    
    setAppState(prev => ({ ...prev, currentScreen: previousScreen }));
    setNavigationHistory(newHistory);
  };

  const renderScreen = () => {
    const pageVariants = {
      initial: {
        opacity: 0,
        x: 50,
      },
      in: {
        opacity: 1,
        x: 0,
      },
      out: {
        opacity: 0,
        x: -50,
      },
    };

    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.4,
    };

    const screenContent = (() => {
      switch (appState.currentScreen) {
        case 'welcome':
          return <WelcomeScreen onContinue={() => navigateTo('login')} />;
        
        case 'login':
          return (
            <LoginScreen
              phoneNumber={appState.phoneNumber}
              onPhoneChange={(phone) => updateState({ phoneNumber: phone })}
              onSendCode={() => navigateTo('verification')}
            />
          );
        
        case 'verification':
          return (
            <VerificationScreen
              code={appState.verificationCode}
              onCodeChange={(code) => updateState({ verificationCode: code })}
              onConfirm={() => navigateTo('profile-choice')}
              onResend={() => console.log('Resend code')}
            />
          );
        
        case 'profile-choice':
          return (
            <ProfileChoiceScreen
              onSelectProfile={(type) => {
                updateState({ userType: type });
                if (type === 'client') {
                  navigateTo('client-name');
                } else {
                  navigateTo('transporter-application');
                }
              }}
            />
          );
        
        // Client Flow
        case 'client-name':
          return (
            <ClientNameScreen
              name={appState.clientName}
              onNameChange={(name) => updateState({ clientName: name })}
              onContinue={() => navigateTo('create-order')}
            />
          );
        
        case 'create-order':
          return (
            <CreateOrderScreen
              onOrderCreate={(orderData) => {
                updateState({ orderData });
                navigateTo('search-trucks');
              }}
            />
          );
        
        case 'search-trucks':
          return (
            <SearchTrucksScreen
              orderData={appState.orderData}
              onDriverFound={(driverData) => {
                updateState({ driverData });
                navigateTo('payment');
              }}
            />
          );
        
        case 'payment':
          return (
            <PaymentScreen
              orderData={appState.orderData}
              onPaymentSent={() => navigateTo('order-status')}
            />
          );
        
        case 'order-status':
          return (
            <OrderStatusScreen
              orderData={appState.orderData}
              driverData={appState.driverData}
            />
          );
        
        // Transporter Flow
        case 'transporter-application':
          return (
            <TransporterApplicationScreen
              onSubmitApplication={() => navigateTo('waiting-contact')}
            />
          );
        
        case 'waiting-contact':
          return (
            <WaitingContactScreen
              onContactReceived={() => navigateTo('partnership-agreement')}
            />
          );
        
        case 'partnership-agreement':
          return (
            <PartnershipAgreementScreen
              onAgree={() => navigateTo('management-system')}
            />
          );
        
        case 'management-system':
          return (
            <ManagementSystemScreen
              onSetupComplete={() => navigateTo('order-receiving')}
            />
          );
        
        case 'order-receiving':
          return (
            <OrderReceivingScreen
              onAcceptOrder={() => navigateTo('commission-payment')}
            />
          );
        
        case 'commission-payment':
          return (
            <CommissionPaymentScreen
              onPaymentSent={() => console.log('Commission paid')}
            />
          );
        
        default:
          return <WelcomeScreen onContinue={() => navigateTo('login')} />;
      }
    })();

    return (
      <motion.div
        key={appState.currentScreen}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {screenContent}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg overflow-hidden relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
        
        {/* Back Button - Show on screens other than welcome */}
        {appState.currentScreen !== 'welcome' && navigationHistory.length > 1 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            onClick={goBack}
            className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
          >
            <svg
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </div>
    </div>
  );
}