/**
 * Tela de acordo de parceria
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
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { RootState } from '@/store';
import { setUser } from '@/store/slices/authSlice';
import { User } from '@/types';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type PartnershipAgreementScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'PartnershipAgreement'>;

interface Props {
  navigation: PartnershipAgreementScreenNavigationProp;
}

export default function PartnershipAgreementScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { phoneNumber, userType } = useSelector((state: RootState) => state.auth);

  const handleAgree = () => {
    // Cria usuário transportadora
    const user: User = {
      id: Date.now().toString(),
      name: 'Transportadora Silva', // Em um app real, viria dos dados da candidatura
      phone: phoneNumber,
      type: userType,
      createdAt: new Date().toISOString(),
    };
    
    dispatch(setUser(user));
  };

  const benefits = [
    'Acesso a mais clientes',
    'Sistema de pagamento seguro',
    'Suporte 24/7',
    'App de gestão gratuito',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Acordo de Parceria
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Revise e aceite os termos do nosso acordo
            </Text>
          </View>

          {/* Agreement Preview */}
          <View style={[styles.agreementContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.agreementHeader}>
              <Ionicons name="document-text" size={24} color={colors.primary} />
              <Text style={[styles.agreementTitle, { color: colors.text }]}>
                Contrato de Parceria Truck Finder
              </Text>
            </View>
            
            <View style={styles.agreementContent}>
              <Text style={[styles.agreementItem, { color: colors.textSecondary }]}>
                <Text style={styles.bold}>1. Comissão:</Text> 15% sobre cada frete completado
              </Text>
              <Text style={[styles.agreementItem, { color: colors.textSecondary }]}>
                <Text style={styles.bold}>2. Pagamento:</Text> Semanal, todas as segundas-feiras
              </Text>
              <Text style={[styles.agreementItem, { color: colors.textSecondary }]}>
                <Text style={styles.bold}>3. Responsabilidades:</Text> Manter veículos em bom estado
              </Text>
              <Text style={[styles.agreementItem, { color: colors.textSecondary }]}>
                <Text style={styles.bold}>4. Cancelamentos:</Text> Penalidade de 50MT por cancelamento
              </Text>
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsContainer}>
            <Text style={[styles.benefitsTitle, { color: colors.text }]}>
              Benefícios da parceria:
            </Text>
            <View style={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>
                    {benefit}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Aceitar e Continuar"
              onPress={handleAgree}
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
    paddingTop: Spacing.xxl * 2,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  agreementContainer: {
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  agreementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  agreementTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    flex: 1,
  },
  agreementContent: {
    gap: Spacing.md,
  },
  agreementItem: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  benefitsContainer: {
    marginBottom: Spacing.xl,
  },
  benefitsTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  benefitsList: {
    gap: Spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  benefitText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    paddingTop: Spacing.md,
  },
});