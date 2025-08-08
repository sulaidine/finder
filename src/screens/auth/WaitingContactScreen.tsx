/**
 * Tela de aguardo de contato
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type WaitingContactScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'WaitingContact'>;

interface Props {
  navigation: WaitingContactScreenNavigationProp;
}

export default function WaitingContactScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const handleContactReceived = () => {
    navigation.navigate('PartnershipAgreement');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.centerContent}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
            <Ionicons name="time" size={48} color={colors.primary} />
          </View>
          
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Candidatura Enviada!
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Nossa equipe irá analisar sua candidatura e entrar em contacto em até 48 horas.
            </Text>
          </View>

          {/* Steps */}
          <View style={[styles.stepsContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.stepsTitle, { color: colors.text }]}>
              Próximos passos:
            </Text>
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={[styles.stepText, { color: colors.textSecondary }]}>
                  Análise dos documentos
                </Text>
              </View>
              <View style={styles.stepItem}>
                <Ionicons name="call" size={16} color={colors.textSecondary} />
                <Text style={[styles.stepText, { color: colors.textSecondary }]}>
                  Contacto telefónico
                </Text>
              </View>
              <View style={styles.stepItem}>
                <Ionicons name="document-text" size={16} color={colors.textSecondary} />
                <Text style={[styles.stepText, { color: colors.textSecondary }]}>
                  Assinatura do acordo
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Simular Contacto Recebido"
            onPress={handleContactReceived}
            size="large"
          />
        </View>
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
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepsContainer: {
    width: '100%',
    padding: Spacing.md,
    borderRadius: 12,
  },
  stepsTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  stepsList: {
    gap: Spacing.sm,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  stepText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    paddingBottom: Spacing.xl,
  },
});