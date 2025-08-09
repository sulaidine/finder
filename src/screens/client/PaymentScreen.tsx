/**
 * Tela de pagamento moderna
 * Interface elegante com breakdown detalhado
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
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ClientStackParamList } from '@/navigation/MainNavigator';
import { RootState } from '@/store';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '@/constants/Colors';

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
  const serviceFeePct = 5;
  const serviceFee = Math.round(totalAmount * serviceFeePct / 100);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Cartão de Crédito/Débito',
      description: 'Visa, Mastercard, American Express',
      icon: 'card' as keyof typeof Ionicons.glyphMap,
      color: '#6366F1',
    },
    {
      id: 'mobile',
      name: 'Dinheiro Móvel',
      description: 'M-Pesa, E-Mola, Mkesh',
      icon: 'phone-portrait' as keyof typeof Ionicons.glyphMap,
      color: '#10B981',
    },
    {
      id: 'bank',
      name: 'Transferência Bancária',
      description: 'BCI, Standard Bank, BIM',
      icon: 'business' as keyof typeof Ionicons.glyphMap,
      color: '#F59E0B',
    },
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      Alert.alert('Método de pagamento', 'Por favor, selecione um método de pagamento');
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

  const PaymentMethodCard = ({ method }: { method: typeof paymentMethods[0] }) => {
    const isSelected = paymentMethod === method.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.paymentMethodCard,
          {
            backgroundColor: isSelected ? method.color + '10' : colors.surface,
            borderColor: isSelected ? method.color : colors.border,
            ...Shadows.small,
          },
        ]}
        onPress={() => setPaymentMethod(method.id)}
        activeOpacity={0.8}
      >
        <View style={styles.paymentMethodContent}>
          <View style={[styles.paymentMethodIcon, { backgroundColor: method.color + '15' }]}>
            <Ionicons name={method.icon} size={24} color={method.color} />
          </View>
          <View style={styles.paymentMethodText}>
            <Text style={[styles.paymentMethodName, { color: colors.text }]}>
              {method.name}
            </Text>
            <Text style={[styles.paymentMethodDescription, { color: colors.textSecondary }]}>
              {method.description}
            </Text>
          </View>
          {isSelected && (
            <View style={[styles.selectedIndicator, { backgroundColor: method.color }]}>
              <Ionicons name="checkmark" size={16} color={colors.white} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>
              Pagamento
            </Text>
            <Text style={styles.headerSubtitle}>
              Confirme e efetue o pagamento
            </Text>
          </LinearGradient>

          <View style={styles.bodyContent}>
            {/* Amount Card */}
            <Card variant="elevated" style={styles.amountCard}>
              <LinearGradient
                colors={colors.gradientSuccess}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.amountGradient}
              >
                <View style={styles.amountContent}>
                  <Text style={styles.amountLabel}>
                    Total a pagar agora
                  </Text>
                  <Text style={styles.amountValue}>
                    {advancePayment} MT
                  </Text>
                  <Text style={styles.amountNote}>
                    50% antecipado • Restante na entrega
                  </Text>
                </View>
              </LinearGradient>
            </Card>

            {/* Breakdown */}
            <Card style={styles.breakdownCard}>
              <Text style={[styles.breakdownTitle, { color: colors.text }]}>
                Detalhamento
              </Text>
              <View style={styles.breakdownContent}>
                <BreakdownRow
                  label="Valor do frete"
                  value={`${totalAmount} MT`}
                  colors={colors}
                />
                <BreakdownRow
                  label={`Taxa de serviço (${serviceFeePct}%)`}
                  value={`${serviceFee} MT`}
                  colors={colors}
                />
                <View style={[styles.separator, { backgroundColor: colors.border }]} />
                <BreakdownRow
                  label="Pagamento antecipado (50%)"
                  value={`${advancePayment} MT`}
                  colors={colors}
                  isTotal
                />
                <BreakdownRow
                  label="Restante na entrega"
                  value={`${totalAmount - advancePayment} MT`}
                  colors={colors}
                  isSecondary
                />
              </View>
            </Card>

            {/* Payment Methods */}
            <View style={styles.paymentMethodsContainer}>
              <Text style={[styles.paymentMethodsTitle, { color: colors.text }]}>
                Método de pagamento
              </Text>
              <View style={styles.paymentMethodsList}>
                {paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </View>
            </View>

            {/* Security Note */}
            <View style={[styles.securityNote, { backgroundColor: colors.surface }]}>
              <Ionicons name="shield-checkmark" size={16} color={colors.success} />
              <Text style={[styles.securityText, { color: colors.textSecondary }]}>
                Seus dados estão protegidos com criptografia de ponta a ponta
              </Text>
            </View>

            {/* Payment Button */}
            <Button
              title={`Pagar ${advancePayment} MT`}
              onPress={handlePayment}
              variant="gradient"
              loading={loading}
              disabled={!paymentMethod}
              size="large"
              icon={<Ionicons name="card" size={20} color={colors.white} />}
              style={styles.paymentButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BreakdownRow = ({ label, value, colors, isTotal = false, isSecondary = false }: any) => (
  <View style={styles.breakdownRow}>
    <Text style={[
      styles.breakdownLabel,
      {
        color: isTotal ? colors.text : isSecondary ? colors.textSecondary : colors.textSecondary,
        fontFamily: isTotal ? 'Poppins-SemiBold' : 'Poppins-Regular',
      }
    ]}>
      {label}
    </Text>
    <Text style={[
      styles.breakdownValue,
      {
        color: isTotal ? colors.primary : isSecondary ? colors.textSecondary : colors.text,
        fontFamily: isTotal ? 'Poppins-Bold' : 'Poppins-SemiBold',
      }
    ]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.xxxl,
  },
  header: {
    borderBottomLeftRadius: BorderRadius.xxxl,
    borderBottomRightRadius: BorderRadius.xxxl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.xxl,
    marginBottom: Spacing.xxl,
  },
  headerTitle: {
    fontSize: FontSizes.xxxxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  bodyContent: {
    paddingHorizontal: Spacing.xxl,
  },
  amountCard: {
    padding: 0,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  amountGradient: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  amountContent: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: Spacing.sm,
  },
  amountValue: {
    fontSize: FontSizes.xxxxxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  amountNote: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  breakdownCard: {
    marginBottom: Spacing.xl,
  },
  breakdownTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.lg,
  },
  breakdownContent: {
    gap: Spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: FontSizes.md,
  },
  breakdownValue: {
    fontSize: FontSizes.md,
  },
  separator: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  paymentMethodsContainer: {
    marginBottom: Spacing.xl,
  },
  paymentMethodsTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.lg,
  },
  paymentMethodsList: {
    gap: Spacing.md,
  },
  paymentMethodCard: {
    borderWidth: 2,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodText: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs,
  },
  paymentMethodDescription: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
  },
  securityText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  paymentButton: {
    width: '100%',
  },
});