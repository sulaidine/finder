/**
 * Tela de recebimento de pedidos para transportadoras
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
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type OrderReceivingScreenNavigationProp = StackNavigationProp<TransporterStackParamList, 'OrderReceiving'>;

interface Props {
  navigation: OrderReceivingScreenNavigationProp;
}

export default function OrderReceivingScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const mockOrder = {
    id: 'ORD-001',
    pickupAddress: 'Av. Julius Nyerere, 123',
    deliveryAddress: 'Av. Eduardo Mondlane, 456',
    date: '2024-12-20',
    time: '14:30',
    description: 'Caixas de produtos eletrónicos',
    amount: 2500,
    distance: '15 km',
    commission: 375, // 15% of 2500
  };

  const handleAcceptOrder = () => {
    navigation.navigate('CommissionPayment');
  };

  const handleRejectOrder = () => {
    // Em um app real, rejeitaria o pedido e buscaria outro
    console.log('Order rejected');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Novo Pedido
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Pedido #{mockOrder.id}
            </Text>
          </View>

          {/* Order Details */}
          <Card style={styles.orderCard}>
            <View style={styles.orderDetail}>
              <Ionicons name="location" size={20} color={colors.success} />
              <View style={styles.orderDetailText}>
                <Text style={[styles.orderDetailLabel, { color: colors.text }]}>
                  Coleta
                </Text>
                <Text style={[styles.orderDetailValue, { color: colors.textSecondary }]}>
                  {mockOrder.pickupAddress}
                </Text>
              </View>
            </View>
            
            <View style={styles.orderDetail}>
              <Ionicons name="location" size={20} color={colors.error} />
              <View style={styles.orderDetailText}>
                <Text style={[styles.orderDetailLabel, { color: colors.text }]}>
                  Entrega
                </Text>
                <Text style={[styles.orderDetailValue, { color: colors.textSecondary }]}>
                  {mockOrder.deliveryAddress}
                </Text>
              </View>
            </View>
            
            <View style={styles.orderDetail}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text style={[styles.orderDetailValue, { color: colors.textSecondary }]}>
                {mockOrder.date} às {mockOrder.time}
              </Text>
            </View>
            
            <View style={styles.orderDetail}>
              <Ionicons name="cube" size={20} color="#8B5CF6"} />
              <View style={styles.orderDetailText}>
                <Text style={[styles.orderDetailLabel, { color: colors.text }]}>
                  Carga
                </Text>
                <Text style={[styles.orderDetailValue, { color: colors.textSecondary }]}>
                  {mockOrder.description}
                </Text>
              </View>
            </View>
          </Card>

          {/* Payment Info */}
          <Card style={[styles.paymentCard, { backgroundColor: colors.success + '20', borderColor: colors.success + '40' }]}>
            <View style={styles.paymentHeader}>
              <Ionicons name="cash" size={20} color={colors.success} />
              <Text style={[styles.paymentTitle, { color: colors.text }]}>
                Informações de pagamento
              </Text>
            </View>
            <View style={styles.paymentDetails}>
              <View style={styles.paymentRow}>
                <Text style={[styles.paymentLabel, { color: colors.textSecondary }]}>
                  Valor total:
                </Text>
                <Text style={[styles.paymentValue, { color: colors.text }]}>
                  {mockOrder.amount} MT
                </Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={[styles.paymentLabel, { color: colors.textSecondary }]}>
                  Sua comissão (15%):
                </Text>
                <Text style={[styles.paymentValue, { color: colors.success }]}>
                  {mockOrder.commission} MT
                </Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={[styles.paymentLabel, { color: colors.textSecondary }]}>
                  Distância:
                </Text>
                <Text style={[styles.paymentValue, { color: colors.text }]}>
                  {mockOrder.distance}
                </Text>
              </View>
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Button
              title="Aceitar Pedido"
              onPress={handleAcceptOrder}
              size="large"
              style={[styles.acceptButton, { backgroundColor: colors.success }]}
            />
            
            <Button
              title="Recusar Pedido"
              onPress={handleRejectOrder}
              variant="outline"
              size="large"
              style={[styles.rejectButton, { borderColor: colors.error }]}
              textStyle={{ color: colors.error }}
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
  orderCard: {
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  orderDetailText: {
    flex: 1,
  },
  orderDetailLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  orderDetailValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  paymentCard: {
    marginBottom: Spacing.lg,
    borderWidth: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  paymentTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  paymentDetails: {
    gap: Spacing.xs,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  paymentValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  actionsContainer: {
    gap: Spacing.sm,
  },
  acceptButton: {
    // Custom green color for accept button
  },
  rejectButton: {
    borderWidth: 2,
  },
});