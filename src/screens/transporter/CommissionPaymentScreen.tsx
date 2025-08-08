/**
 * Tela de pagamento de comissão
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TransporterStackParamList } from '@/navigation/MainNavigator';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type CommissionPaymentScreenNavigationProp = StackNavigationProp<TransporterStackParamList, 'CommissionPayment'>;

interface Props {
  navigation: CommissionPaymentScreenNavigationProp;
}

export default function CommissionPaymentScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const mockPayment = {
    amount: 375, // 15% of 2500
    week: 'Semana de 16-22 Dezembro',
    orders: 1,
    totalEarnings: 2125, // 2500 - 375
    totalRevenue: 2500,
  };

  const handlePaymentSent = () => {
    // Em um app real, processaria o pagamento
    console.log('Commission payment sent');
    // Volta para o sistema de gestão
    navigation.navigate('Management');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Pagamento de Comissão
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {mockPayment.week}
            </Text>
          </View>

          {/* Payment Amount */}
          <Card style={[styles.amountCard, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
            <View style={styles.amountContent}>
              <Ionicons name="cash" size={48} color={colors.primary} />
              <Text style={[styles.amountValue, { color: colors.text }]}>
                {mockPayment.amount} MT
              </Text>
              <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>
                Comissão a pagar
              </Text>
            </View>
          </Card>

          {/* Weekly Summary */}
          <Card style={styles.summaryCard}>
            <Text style={[styles.summaryTitle, { color: colors.text }]}>
              Resumo semanal
            </Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                  Pedidos completados:
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {mockPayment.orders}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                  Total faturado:
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {mockPayment.totalRevenue} MT
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                  Seus ganhos:
                </Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>
                  {mockPayment.totalEarnings} MT
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                  Comissão (15%):
                </Text>
                <Text style={[styles.summaryValue, { color: colors.primary }]}>
                  {mockPayment.amount} MT
                </Text>
              </View>
            </View>
          </Card>

          {/* Payment Method */}
          <View style={styles.paymentMethodContainer}>
            <Text style={[styles.paymentMethodTitle, { color: colors.text }]}>
              Método de pagamento
            </Text>
            <Card style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodContent}>
                <View style={[styles.paymentMethodIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Ionicons name="phone-portrait" size={20} color={colors.primary} />
                </View>
                <View style={styles.paymentMethodText}>
                  <Text style={[styles.paymentMethodName, { color: colors.text }]}>
                    M-Pesa
                  </Text>
                  <Text style={[styles.paymentMethodNumber, { color: colors.textSecondary }]}>
                    84 123 4567
                  </Text>
                </View>
              </View>
            </Card>
          </View>

          {/* Schedule */}
          <Card style={[styles.scheduleCard, { backgroundColor: colors.primary + '20' }]}>
            <View style={styles.scheduleContent}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <Text style={[styles.scheduleTitle, { color: colors.text }]}>
                Próximo pagamento
              </Text>
            </View>
            <Text style={[styles.scheduleDate, { color: colors.textSecondary }]}>
              Segunda-feira, 23 de Dezembro às 09:00
            </Text>
          </Card>

          {/* Confirm Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="✓ Confirmar Pagamento"
              onPress={handlePaymentSent}
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
  },
  amountCard: {
    marginBottom: Spacing.lg,
    borderWidth: 2,
  },
  amountContent: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  amountValue: {
    fontSize: FontSizes.xxxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
  },
  amountLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  summaryCard: {
    marginBottom: Spacing.lg,
  },
  summaryTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  summaryContent: {
    gap: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  summaryValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  paymentMethodContainer: {
    marginBottom: Spacing.lg,
  },
  paymentMethodTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  paymentMethodCard: {
    padding: Spacing.md,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodText: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  paymentMethodNumber: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  scheduleCard: {
    marginBottom: Spacing.xl,
  },
  scheduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  scheduleTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  scheduleDate: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    paddingTop: Spacing.md,
  },
});