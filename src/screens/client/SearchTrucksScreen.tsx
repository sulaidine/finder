/**
 * Tela de busca de motoristas
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ClientStackParamList } from '@/navigation/MainNavigator';
import { setCurrentDriver } from '@/store/slices/driverSlice';
import { DriverData } from '@/types';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type SearchTrucksScreenNavigationProp = StackNavigationProp<ClientStackParamList, 'SearchTrucks'>;
type SearchTrucksScreenRouteProp = RouteProp<ClientStackParamList, 'SearchTrucks'>;

interface Props {
  navigation: SearchTrucksScreenNavigationProp;
  route: SearchTrucksScreenRouteProp;
}

export default function SearchTrucksScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { orderData } = route.params;
  const [searching, setSearching] = useState(true);
  const [driverFound, setDriverFound] = useState(false);

  const mockDriver: DriverData = {
    id: '1',
    name: 'João Silva',
    phone: '+258 84 123 4567',
    truckType: 'Caminhão Médio',
    license: 'TRK-1234',
    eta: '15 minutos',
    rating: 4.8,
  };

  useEffect(() => {
    // Simula busca por motoristas
    const timer = setTimeout(() => {
      setSearching(false);
      setDriverFound(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptDriver = () => {
    dispatch(setCurrentDriver(mockDriver));
    navigation.navigate('Payment', { orderData });
  };

  const handleCallDriver = () => {
    // Em um app real, abriria o app de telefone
    console.log('Calling driver:', mockDriver.phone);
  };

  if (searching) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Procurando Motoristas
            </Text>
          </View>

          {/* Loading */}
          <LoadingSpinner message="Aguardando motoristas disponíveis..." />

          {/* Order Summary */}
          <Card style={styles.summaryCard}>
            <Text style={[styles.summaryTitle, { color: colors.text }]}>
              Resumo do pedido
            </Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryItem}>
                <Ionicons name="location" size={16} color={colors.primary} />
                <View style={styles.summaryText}>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                    De: {orderData.pickupAddress}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                    Para: {orderData.deliveryAddress}
                  </Text>
                </View>
              </View>
              {orderData.date && orderData.time && (
                <View style={styles.summaryItem}>
                  <Ionicons name="time" size={16} color={colors.primary} />
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                    {orderData.date} às {orderData.time}
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerWithIcon}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            <Text style={[styles.title, { color: colors.text }]}>
              Motorista Encontrado!
            </Text>
          </View>
        </View>

        {/* Driver Card */}
        <Card style={[styles.driverCard, { backgroundColor: colors.surface }]}>
          <View style={styles.driverHeader}>
            <View style={[styles.driverAvatar, { backgroundColor: colors.primary }]}>
              <Ionicons name="car" size={24} color={colors.white} />
            </View>
            <View style={styles.driverInfo}>
              <Text style={[styles.driverName, { color: colors.text }]}>
                {mockDriver.name}
              </Text>
              <Text style={[styles.driverType, { color: colors.textSecondary }]}>
                {mockDriver.truckType}
              </Text>
            </View>
          </View>

          <View style={styles.driverDetails}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Matrícula:
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {mockDriver.license}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Tempo estimado:
              </Text>
              <Text style={[styles.detailValue, { color: colors.primary }]}>
                {mockDriver.eta}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Avaliação:
              </Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={colors.warning} />
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {mockDriver.rating}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Contact Button */}
        <Button
          title="📞 Ligar para Motorista"
          onPress={handleCallDriver}
          variant="outline"
          size="large"
          style={styles.contactButton}
        />

        {/* Accept Button */}
        <Button
          title="Aceitar Motorista"
          onPress={handleAcceptDriver}
          size="large"
          style={styles.acceptButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  headerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  summaryCard: {
    marginTop: Spacing.xl,
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
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  driverCard: {
    marginBottom: Spacing.lg,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  driverType: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
  },
  driverDetails: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  detailValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  contactButton: {
    marginBottom: Spacing.md,
  },
  acceptButton: {
    marginBottom: Spacing.xl,
  },
});