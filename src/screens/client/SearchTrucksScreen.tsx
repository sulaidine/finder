/**
 * Tela de busca de motoristas moderna
 * Animações fluidas e interface intuitiva
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ClientStackParamList } from '@/navigation/MainNavigator';
import { setCurrentDriver } from '@/store/slices/driverSlice';
import { DriverData } from '@/types';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '@/constants/Colors';

type SearchTrucksScreenNavigationProp = StackNavigationProp<ClientStackParamList, 'SearchTrucks'>;
type SearchTrucksScreenRouteProp = RouteProp<ClientStackParamList, 'SearchTrucks'>;

interface Props {
  navigation: SearchTrucksScreenNavigationProp;
  route: SearchTrucksScreenRouteProp;
}

const { width } = Dimensions.get('window');

export default function SearchTrucksScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { orderData } = route.params;
  const [searching, setSearching] = useState(true);
  const [driverFound, setDriverFound] = useState(false);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
    // Animação de busca
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    // Simula busca por motoristas
    const timer = setTimeout(() => {
      pulseAnimation.stop();
      setSearching(false);
      setDriverFound(true);
      
      // Animação de entrada do motorista
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 4000);

    return () => {
      clearTimeout(timer);
      pulseAnimation.stop();
    };
  }, []);

  const handleAcceptDriver = () => {
    dispatch(setCurrentDriver(mockDriver));
    navigation.navigate('Payment', { orderData });
  };

  if (searching) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[colors.background, colors.surface]}
          style={styles.gradient}
        >
          <View style={styles.searchingContent}>
            {/* Animated Search Icon */}
            <Animated.View 
              style={[
                styles.searchIconContainer,
                { 
                  backgroundColor: colors.primary + '15',
                  transform: [{ scale: pulseAnim }],
                }
              ]}
            >
              <Ionicons name="search" size={48} color={colors.primary} />
            </Animated.View>
            
            <Text style={[styles.searchingTitle, { color: colors.text }]}>
              Procurando motoristas
            </Text>
            <Text style={[styles.searchingSubtitle, { color: colors.textSecondary }]}>
              Encontrando os melhores motoristas próximos a você
            </Text>

            {/* Progress Dots */}
            <View style={styles.progressContainer}>
              {[0, 1, 2].map((index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.progressDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              ))}
            </View>

            {/* Order Summary */}
            <Card style={styles.summaryCard}>
              <Text style={[styles.summaryTitle, { color: colors.text }]}>
                Resumo do pedido
              </Text>
              <View style={styles.summaryContent}>
                <SummaryItem
                  icon="location"
                  label="De"
                  value={orderData.pickupAddress}
                  colors={colors}
                />
                <SummaryItem
                  icon="location"
                  label="Para"
                  value={orderData.deliveryAddress}
                  colors={colors}
                />
                <SummaryItem
                  icon="calendar"
                  label="Quando"
                  value={`${orderData.date} às ${orderData.time}`}
                  colors={colors}
                />
              </View>
            </Card>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Success Header */}
          <Animated.View 
            style={[
              styles.successHeader,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={[styles.successIcon, { backgroundColor: colors.success + '15' }]}>
              <Ionicons name="checkmark-circle" size={48} color={colors.success} />
            </View>
            <Text style={[styles.successTitle, { color: colors.text }]}>
              Motorista Encontrado!
            </Text>
            <Text style={[styles.successSubtitle, { color: colors.textSecondary }]}>
              Encontramos o motorista perfeito para você
            </Text>
          </Animated.View>

          {/* Driver Card */}
          <Animated.View 
            style={[
              styles.driverCardContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Card variant="elevated" style={styles.driverCard}>
              <LinearGradient
                colors={['#FFFFFF', colors.surface]}
                style={styles.driverCardGradient}
              >
                <View style={styles.driverHeader}>
                  <View style={[styles.driverAvatar, { backgroundColor: colors.primary }]}>
                    <Text style={styles.driverInitials}>
                      {mockDriver.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <View style={styles.driverInfo}>
                    <Text style={[styles.driverName, { color: colors.text }]}>
                      {mockDriver.name}
                    </Text>
                    <Text style={[styles.driverType, { color: colors.textSecondary }]}>
                      {mockDriver.truckType}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color={colors.warning} />
                      <Text style={[styles.rating, { color: colors.text }]}>
                        {mockDriver.rating}
                      </Text>
                      <Text style={[styles.ratingLabel, { color: colors.textSecondary }]}>
                        (127 avaliações)
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.etaBadge, { backgroundColor: colors.success + '15' }]}>
                    <Text style={[styles.etaText, { color: colors.success }]}>
                      {mockDriver.eta}
                    </Text>
                  </View>
                </View>

                <View style={styles.driverDetails}>
                  <DetailItem
                    icon="car"
                    label="Matrícula"
                    value={mockDriver.license}
                    colors={colors}
                  />
                  <DetailItem
                    icon="shield-checkmark"
                    label="Verificado"
                    value="Documentos OK"
                    colors={colors}
                  />
                  <DetailItem
                    icon="time"
                    label="Experiência"
                    value="5+ anos"
                    colors={colors}
                  />
                </View>
              </LinearGradient>
            </Card>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View 
            style={[
              styles.actionsContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Button
              title="Aceitar Motorista"
              onPress={handleAcceptDriver}
              variant="gradient"
              size="large"
              style={styles.acceptButton}
            />
            
            <Button
              title="📞 Ligar para Motorista"
              onPress={() => console.log('Calling driver')}
              variant="outline"
              size="large"
              style={styles.callButton}
            />
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const SummaryItem = ({ icon, label, value, colors }: any) => (
  <View style={styles.summaryItem}>
    <Ionicons name={icon} size={16} color={colors.primary} />
    <View style={styles.summaryItemText}>
      <Text style={[styles.summaryItemLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.summaryItemValue, { color: colors.text }]}>
        {value}
      </Text>
    </View>
  </View>
);

const DetailItem = ({ icon, label, value, colors }: any) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={16} color={colors.textSecondary} />
    <View style={styles.detailItemText}>
      <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.detailValue, { color: colors.text }]}>
        {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  searchingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  searchIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  searchingTitle: {
    fontSize: FontSizes.xxxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  searchingSubtitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: Spacing.xxxl,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xxxl,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryCard: {
    width: '100%',
  },
  summaryTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  summaryContent: {
    gap: Spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  summaryItemText: {
    flex: 1,
  },
  summaryItemLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  summaryItemValue: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  successHeader: {
    alignItems: 'center',
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  successTitle: {
    fontSize: FontSizes.xxxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  successSubtitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  driverCardContainer: {
    marginBottom: Spacing.xxl,
  },
  driverCard: {
    padding: 0,
    overflow: 'hidden',
  },
  driverCardGradient: {
    padding: Spacing.xxl,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInitials: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: FontSizes.xl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  driverType: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    marginBottom: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rating: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  ratingLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  etaBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  etaText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  driverDetails: {
    gap: Spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  detailItemText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  detailValue: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  actionsContainer: {
    gap: Spacing.lg,
  },
  acceptButton: {
    width: '100%',
  },
  callButton: {
    width: '100%',
  },
});