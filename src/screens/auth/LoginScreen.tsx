/**
 * Tela de login moderna
 * Interface limpa com foco na usabilidade
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { setPhoneNumber } from '@/store/slices/authSlice';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu número de telefone');
      return;
    }

    if (phone.length < 9) {
      Alert.alert('Erro', 'Número de telefone inválido');
      return;
    }

    setLoading(true);
    
    // Simula envio do código
    setTimeout(() => {
      dispatch(setPhoneNumber(phone));
      setLoading(false);
      navigation.navigate('Verification');
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: colors.surface }]}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Text style={[styles.title, { color: colors.text }]}>
                Entrar
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Digite seu número para continuar
              </Text>
            </View>
          </View>

          {/* Form Card */}
          <Card variant="elevated" style={styles.formCard}>
            <View style={styles.formHeader}>
              <View style={[styles.phoneIcon, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="call" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.formTitle, { color: colors.text }]}>
                Número de telefone
              </Text>
            </View>

            <Input
              placeholder="84 123 456 789"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={15}
              leftIcon={<Ionicons name="call-outline" size={20} color={colors.textSecondary} />}
            />

            {/* Info Box */}
            <View style={[styles.infoBox, { backgroundColor: colors.primary + '10' }]}>
              <Ionicons name="information-circle" size={16} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                Enviaremos um código de verificação via SMS
              </Text>
            </View>

            <Button
              title="Enviar Código"
              onPress={handleSendCode}
              variant="gradient"
              loading={loading}
              disabled={!phone.trim()}
              size="large"
              style={styles.submitButton}
            />
          </Card>

          {/* Alternative Methods */}
          <View style={styles.alternativeContainer}>
            <Text style={[styles.alternativeTitle, { color: colors.textSecondary }]}>
              Ou entre com
            </Text>
            
            <View style={styles.alternativeButtons}>
              <TouchableOpacity 
                style={[styles.alternativeButton, { backgroundColor: colors.surface }]}
                onPress={() => Alert.alert('Em breve', 'Login com Google em desenvolvimento')}
              >
                <Ionicons name="logo-google" size={20} color="#EA4335" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.alternativeButton, { backgroundColor: colors.surface }]}
                onPress={() => Alert.alert('Em breve', 'Login com Facebook em desenvolvimento')}
              >
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

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
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxxxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  formCard: {
    marginBottom: Spacing.xxxl,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  phoneIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  formTitle: {
    fontSize: FontSizes.xl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  infoText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    flex: 1,
    lineHeight: 20,
  },
  submitButton: {
    width: '100%',
  },
  alternativeContainer: {
    alignItems: 'center',
  },
  alternativeTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    marginBottom: Spacing.lg,
  },
  alternativeButtons: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  alternativeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});