/**
 * Tela de pagamento
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ClientStackParamList } from '@/navigation/MainNavigator';
import { RootState } from '@/store';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type PaymentScreenNavigationProp = StackNavigationProp<ClientStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<ClientStackParamList, 'Payment'>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
}

export default function PaymentScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { orderData } = route.params;
  const { currentDriver } = useSelector((state: RootState) => state.driver);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const totalAmount = orderData.amount || 2500;
  const advancePayment = totalAmount / 2;

  const paymentMethods = [
    {
      id: 'card',
      name: 'Cartão de Crédito/Débito',
      description: 'Visa, Mastercard',
      icon: 'card' as keyof typeof Ionicons.glyphMap,
    },
    {
      id: 'mobile',
      name: 'Dinheiro Móvel',
      description: 'M-Pesa, E-Mola',
      icon: 'phone-portrait' as keyof typeof Ionicons.glyphMap,
    },
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      Alert.alert('Erro', 'Por favor, selecione um método de pagamento');
      return;
    }

    setLoading(true);
    
    // Simula processamento do pagamento
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OrderStatus', { 
        orderData, 
        driverData: currentDriver 
      });
    }, 2000);
  };

  const PaymentMethodOption = ({ method }: { method: typeof paymentMethods[0] }) => (
    <TouchableOpacity
      style={[
        styles.paymentOption,
        {
          backgroundColor: colors.surface,
          borderColor: paymentMethod === method.id ? colors.primary : colors.border,
        },
      ]}
      onPress={() => setPaymentMethod(method.id)}
      activeOpacity={0.8}
    >
      <View style={styles.paymentOptionContent}>
        <Ionicons name={method.icon} size={24} color={colors.textSecondary} />
        <View style={styles.paymentOptionText}>
          <Text style={[styles.paymentOptionName, { color: colors.text }]}>
            {method.name}
          </Text>
          <Text style={[styles.paymentOptionDescription, { color: colors.textSecondary }]}>
            {method.description}
          </Text>
        </View>
        {paymentMethod === method.id && (
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Pagamento
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Confirme os detalhes e efetue o pagamento
            </Text>
          </View>

          {/* Price Breakdown */}
          <Card style={styles.breakdownCard}>
            <Text style={[styles.breakdownTitle, { color: colors.text }]}>
              Resumo do pagamento
            </Text>
            <View style={styles.breakdownContent}>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
                  Valor do frete:
                </Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>
                  {totalAmount} MT
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
                  Taxa de serviço:
                </Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>
                  Incluída
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownTotal, { color: colors.text }]}>
                  Total a pagar agora (50%):
                </Text>
                <Text style={[styles.breakdownTotalValue, { color: colors.primary }]}>
                  {advancePayment} MT
                </Text>
              </View>
              <Text style={[styles.breakdownNote, { color: colors.textSecondary }]}>
                Restante será pago na entrega
              </Text>
            </View>
          </Card>

          {/* Payment Methods */}
          <View style={styles.paymentMethodsContainer}>
            <Text style={[styles.paymentMethodsTitle, { color: colors.text }]}>
              Método de pagamento
            </Text>
            <View style={styles.paymentMethodsList}>
              {paymentMethods.map((method) => (
                <PaymentMethodOption key={method.id} method={method} />
              ))}
            </View>
          </View>

          {/* Payment Button */}
          <View style={styles.buttonContainer}>
            <Button
              title={`Pagar ${advancePayment} MT`}
              onPress={handlePayment}
              loading={loading}
              disabled={!paymentMethod}
              size="large"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  breakdownCard: {
    marginBottom: Spacing.lg,
  },
  breakdownTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  breakdownContent: {
    gap: Spacing.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  breakdownValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: Spacing.xs,
  },
  breakdownTotal: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  breakdownTotalValue: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  breakdownNote: {
    fontSize: FontSizes.xs,
    fontFamily: 'Poppins-Regular',
    marginTop: Spacing.xs,
  },
  paymentMethodsContainer: {
    marginBottom: Spacing.xl,
  },
  paymentMethodsTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.md,
  },
  paymentMethodsList: {
    gap: Spacing.md,
  },
  paymentOption: {
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  paymentOptionText: {
    flex: 1,
  },
  paymentOptionName: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  paymentOptionDescription: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    paddingTop: Spacing.md,
  },
});