/**
 * Tela de status do pedido
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ClientStackParamList } from '@/navigation/MainNavigator';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type OrderStatusScreenNavigationProp = StackNavigationProp<ClientStackParamList, 'OrderStatus'>;
type OrderStatusScreenRouteProp = RouteProp<ClientStackParamList, 'OrderStatus'>;

interface Props {
  navigation: OrderStatusScreenNavigationProp;
  route: OrderStatusScreenRouteProp;
}

export default function OrderStatusScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { orderData, driverData } = route.params;

  const handleCall = () => {
    if (driverData?.phone) {
      Linking.openURL(`tel:${driverData.phone}`);
    }
  };

  const handleSMS = () => {
    if (driverData?.phone) {
      Linking.openURL(`sms:${driverData.phone}`);
    }
  };

  const trackingSteps = [
    {
      id: 1,
      title: 'Pedido confirmado',
      time: '10:30',
      completed: true,
    },
    {
      id: 2,
      title: 'Motorista a caminho',
      time: '10:45',
      completed: true,
    },
    {
      id: 3,
      title: 'Coleta em andamento',
      time: 'Agora',
      completed: false,
      current: true,
    },
    {
      id: 4,
      title: 'Em trânsito',
      time: '',
      completed: false,
    },
    {
      id: 5,
      title: 'Entregue',
      time: '',
      completed: false,
    },
  ];

  const TrackingStep = ({ step, isLast }: { step: typeof trackingSteps[0]; isLast: boolean }) => (
    <View style={styles.trackingStep}>
      <View style={styles.trackingStepIndicator}>
        <View
          style={[
            styles.trackingStepCircle,
            {
              backgroundColor: step.completed 
                ? colors.success 
                : step.current 
                ? colors.primary 
                : colors.border,
            },
          ]}
        >
          {step.completed ? (
            <Ionicons name="checkmark" size={12} color={colors.white} />
          ) : step.current ? (
            <Ionicons name="time" size={12} color={colors.white} />
          ) : (
            <View style={[styles.trackingStepDot, { backgroundColor: colors.white }]} />
          )}
        </View>
        {!isLast && (
          <View
            style={[
              styles.trackingStepLine,
              {
                backgroundColor: step.completed ? colors.success : colors.border,
              },
            ]}
          />
        )}
      </View>
      <View style={styles.trackingStepContent}>
        <Text
          style={[
            styles.trackingStepTitle,
            {
              color: step.completed || step.current ? colors.text : colors.textSecondary,
              fontFamily: step.current ? 'Poppins-SemiBold' : 'Poppins-Medium',
            },
          ]}
        >
          {step.title}
        </Text>
        {step.time && (
          <Text style={[styles.trackingStepTime, { color: colors.textSecondary }]}>
            {step.time}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Status do Pedido
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
              <Text style={[styles.statusText, { color: colors.success }]}>
                Em andamento
              </Text>
            </View>
          </View>

          {/* Driver Info */}
          <Card style={styles.driverCard}>
            <Text style={[styles.driverCardTitle, { color: colors.text }]}>
              Seu motorista
            </Text>
            <View style={styles.driverInfo}>
              <View style={[styles.driverAvatar, { backgroundColor: colors.border }]}>
                <Text style={[styles.driverInitials, { color: colors.text }]}>
                  {driverData?.name?.split(' ').map(n => n[0]).join('') || 'JS'}
                </Text>
              </View>
              <View style={styles.driverDetails}>
                <Text style={[styles.driverName, { color: colors.text }]}>
                  {driverData?.name || 'João Silva'}
                </Text>
                <Text style={[styles.driverType, { color: colors.textSecondary }]}>
                  {driverData?.truckType || 'Caminhão Médio'}
                </Text>
              </View>
            </View>
            
            <View style={styles.driverActions}>
              <Button
                title="📞 Ligar"
                onPress={handleCall}
                variant="outline"
                size="small"
                style={styles.driverActionButton}
              />
              <Button
                title="💬 SMS"
                onPress={handleSMS}
                variant="outline"
                size="small"
                style={styles.driverActionButton}
              />
            </View>
          </Card>

          {/* Tracking */}
          <View style={styles.trackingContainer}>
            <Text style={[styles.trackingTitle, { color: colors.text }]}>
              Acompanhamento
            </Text>
            <View style={styles.trackingList}>
              {trackingSteps.map((step, index) => (
                <TrackingStep
                  key={step.id}
                  step={step}
                  isLast={index === trackingSteps.length - 1}
                />
              ))}
            </View>
          </View>

          {/* Route Info */}
          <Card style={styles.routeCard}>
            <Text style={[styles.routeTitle, { color: colors.text }]}>
              Rota
            </Text>
            <View style={styles.routeContent}>
              <View style={styles.routeItem}>
                <Ionicons name="location" size={16} color={colors.success} />
                <View style={styles.routeItemText}>
                  <Text style={[styles.routeItemLabel, { color: colors.text }]}>
                    Coleta
                  </Text>
                  <Text style={[styles.routeItemAddress, { color: colors.textSecondary }]}>
                    {orderData.pickupAddress}
                  </Text>
                </View>
              </View>
              <View style={styles.routeItem}>
                <Ionicons name="location" size={16} color={colors.error} />
                <View style={styles.routeItemText}>
                  <Text style={[styles.routeItemLabel, { color: colors.text }]}>
                    Entrega
                  </Text>
                  <Text style={[styles.routeItemAddress, { color: colors.textSecondary }]}>
                    {orderData.deliveryAddress}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
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
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },
  statusText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  driverCard: {
    marginBottom: Spacing.lg,
  },
  driverCardTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInitials: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  driverType: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  driverActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  driverActionButton: {
    flex: 1,
  },
  trackingContainer: {
    marginBottom: Spacing.lg,
  },
  trackingTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.md,
  },
  trackingList: {
    gap: Spacing.md,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  trackingStepIndicator: {
    alignItems: 'center',
  },
  trackingStepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingStepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  trackingStepLine: {
    width: 2,
    height: 24,
    marginTop: Spacing.xs,
  },
  trackingStepContent: {
    flex: 1,
    paddingTop: 2,
  },
  trackingStepTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  trackingStepTime: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  routeCard: {
    marginBottom: Spacing.lg,
  },
  routeTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  routeContent: {
    gap: Spacing.sm,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  routeItemText: {
    flex: 1,
  },
  routeItemLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  routeItemAddress: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
});