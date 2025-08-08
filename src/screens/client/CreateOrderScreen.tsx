/**
 * Tela de criação de pedido para clientes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ClientStackParamList } from '@/navigation/MainNavigator';
import { setCurrentOrder } from '@/store/slices/orderSlice';
import { OrderData } from '@/types';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

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
        Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
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
        amount: 2500, // Mock amount
        distance: '15 km', // Mock distance
      };
      
      dispatch(setCurrentOrder(completeOrderData));
      setLoading(false);
      navigation.navigate('SearchTrucks', { orderData: completeOrderData });
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Criar Pedido
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Preencha os detalhes da sua entrega
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Ionicons name="location" size={16} color={colors.primary} />
                <Text style={[styles.labelText, { color: colors.text }]}>
                  Endereço de coleta *
                </Text>
              </View>
              <Input
                placeholder="Digite o endereço de coleta"
                value={orderData.pickupAddress}
                onChangeText={(value) => updateOrderData('pickupAddress', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Ionicons name="location" size={16} color={colors.primary} />
                <Text style={[styles.labelText, { color: colors.text }]}>
                  Endereço de entrega *
                </Text>
              </View>
              <Input
                placeholder="Digite o endereço de entrega"
                value={orderData.deliveryAddress}
                onChangeText={(value) => updateOrderData('deliveryAddress', value)}
              />
            </View>

            <View style={styles.dateTimeRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.inputLabel}>
                  <Ionicons name="calendar" size={16} color={colors.primary} />
                  <Text style={[styles.labelText, { color: colors.text }]}>
                    Data *
                  </Text>
                </View>
                <Input
                  placeholder="DD/MM/AAAA"
                  value={orderData.date}
                  onChangeText={(value) => updateOrderData('date', value)}
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.inputLabel}>
                  <Ionicons name="time" size={16} color={colors.primary} />
                  <Text style={[styles.labelText, { color: colors.text }]}>
                    Hora *
                  </Text>
                </View>
                <Input
                  placeholder="HH:MM"
                  value={orderData.time}
                  onChangeText={(value) => updateOrderData('time', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Ionicons name="cube" size={16} color={colors.primary} />
                <Text style={[styles.labelText, { color: colors.text }]}>
                  Descrição da carga
                </Text>
              </View>
              <Input
                placeholder="Descreva o que será transportado"
                value={orderData.description}
                onChangeText={(value) => updateOrderData('description', value)}
                multiline
              />
            </View>
          </View>

          {/* Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Buscar Motoristas"
              onPress={handleSubmit}
              loading={loading}
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
    paddingTop: Spacing.xxl,
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
  form: {
    marginBottom: Spacing.xl,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  labelText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  buttonContainer: {
    paddingTop: Spacing.md,
  },
});