/**
 * Tela de criação de pedido moderna
 * Interface intuitiva com validação em tempo real
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ClientStackParamList } from '@/navigation/MainNavigator';
import { setCurrentOrder } from '@/store/slices/orderSlice';
import { OrderData } from '@/types';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type CreateOrderScreenNavigationProp = StackNavigationProp<ClientStackParamList, 'CreateOrder'>;

interface Props {
  navigation: CreateOrderScreenNavigationProp;
}

export default function CreateOrderScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<Partial<OrderData>>({
    pickupAddress: '',
    deliveryAddress: '',
    date: '',
    time: '',
    description: '',
  });

  const updateOrderData = (field: keyof OrderData, value: string) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof OrderData)[] = [
      'pickupAddress', 'deliveryAddress', 'date', 'time'
    ];
    
    for (const field of requiredFields) {
      if (!orderData[field]?.trim()) {
        Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos marcados com *');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simula criação do pedido
    setTimeout(() => {
      const completeOrderData: OrderData = {
        id: Date.now().toString(),
        ...orderData as OrderData,
        status: 'pending',
        amount: 2500,
        distance: '15 km',
      };
      
      dispatch(setCurrentOrder(completeOrderData));
      setLoading(false);
      navigation.navigate('SearchTrucks', { orderData: completeOrderData });
    }, 1000);
  };

  const QuickAddressButton = ({ icon, label, onPress }: { 
    icon: string; 
    label: string; 
    onPress: () => void;
  }) => (
    <TouchableOpacity 
      style={[styles.quickButton, { backgroundColor: colors.surface }]}
      onPress={onPress}
    >
      <Ionicons name={icon as any} size={16} color={colors.primary} />
      <Text style={[styles.quickButtonText, { color: colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
              Novo Pedido
            </Text>
            <Text style={styles.headerSubtitle}>
              Vamos encontrar o transporte perfeito
            </Text>
          </LinearGradient>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Pickup Section */}
            <Card variant="elevated" style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, { backgroundColor: colors.success + '15' }]}>
                  <Ionicons name="location" size={20} color={colors.success} />
                </View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Local de Coleta
                </Text>
              </View>
              
              <Input
                placeholder="Digite o endereço de coleta"
                value={orderData.pickupAddress}
                onChangeText={(value) => updateOrderData('pickupAddress', value)}
                leftIcon={<Ionicons name="location-outline" size={20} color={colors.textSecondary} />}
                rightIcon={<Ionicons name="search" size={20} color={colors.textSecondary} />}
              />
              
              <View style={styles.quickButtonsContainer}>
                <QuickAddressButton
                  icon="home"
                  label="Casa"
                  onPress={() => updateOrderData('pickupAddress', 'Minha Casa')}
                />
                <QuickAddressButton
                  icon="business"
                  label="Trabalho"
                  onPress={() => updateOrderData('pickupAddress', 'Meu Trabalho')}
                />
                <QuickAddressButton
                  icon="location"
                  label="Atual"
                  onPress={() => updateOrderData('pickupAddress', 'Localização Atual')}
                />
              </View>
            </Card>

            {/* Delivery Section */}
            <Card variant="elevated" style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, { backgroundColor: colors.error + '15' }]}>
                  <Ionicons name="location" size={20} color={colors.error} />
                </View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Local de Entrega
                </Text>
              </View>
              
              <Input
                placeholder="Digite o endereço de entrega"
                value={orderData.deliveryAddress}
                onChangeText={(value) => updateOrderData('deliveryAddress', value)}
                leftIcon={<Ionicons name="location-outline" size={20} color={colors.textSecondary} />}
                rightIcon={<Ionicons name="search" size={20} color={colors.textSecondary} />}
              />
            </Card>

            {/* Date & Time Section */}
            <Card variant="elevated" style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, { backgroundColor: colors.warning + '15' }]}>
                  <Ionicons name="calendar" size={20} color={colors.warning} />
                </View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Quando?
                </Text>
              </View>
              
              <View style={styles.dateTimeRow}>
                <View style={styles.dateTimeItem}>
                  <Input
                    placeholder="DD/MM/AAAA"
                    value={orderData.date}
                    onChangeText={(value) => updateOrderData('date', value)}
                    leftIcon={<Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />}
                  />
                </View>
                
                <View style={styles.dateTimeItem}>
                  <Input
                    placeholder="HH:MM"
                    value={orderData.time}
                    onChangeText={(value) => updateOrderData('time', value)}
                    leftIcon={<Ionicons name="time-outline" size={20} color={colors.textSecondary} />}
                  />
                </View>
              </View>
            </Card>

            {/* Cargo Section */}
            <Card variant="elevated" style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, { backgroundColor: colors.secondary + '15' }]}>
                  <Ionicons name="cube" size={20} color={colors.secondary} />
                </View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Descrição da Carga
                </Text>
              </View>
              
              <Input
                placeholder="O que será transportado?"
                value={orderData.description}
                onChangeText={(value) => updateOrderData('description', value)}
                multiline
                numberOfLines={3}
                leftIcon={<Ionicons name="cube-outline" size={20} color={colors.textSecondary} />}
              />
            </Card>
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <Button
              title="Buscar Motoristas"
              onPress={handleSubmit}
              variant="gradient"
              loading={loading}
              size="large"
              icon={<Ionicons name="search" size={20} color={colors.white} />}
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
  formContainer: {
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.xl,
  },
  sectionCard: {
    padding: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  quickButtonsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  quickButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  quickButtonText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  dateTimeItem: {
    flex: 1,
  },
  submitContainer: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxl,
  },
});