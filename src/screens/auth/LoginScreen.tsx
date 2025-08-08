/**
 * Tela de login
 * Permite ao usuário inserir seu número de telefone
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { setPhoneNumber } from '@/store/slices/authSlice';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Truck Finder
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Entre com seu número de telefone
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Número de telefone"
            placeholder="84 123 4567"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={15}
          />

          {/* Info Message */}
          <View style={[styles.infoBox, { backgroundColor: colors.surface }]}>
            <Text style={[styles.infoText, { color: colors.text }]}>
              Você receberá um código de 6 dígitos por SMS, e-mail ou WhatsApp.
            </Text>
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Enviar código"
            onPress={handleSendCode}
            loading={loading}
            disabled={!phone.trim()}
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
  },
  subtitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  infoBox: {
    padding: Spacing.md,
    borderRadius: 12,
    marginTop: Spacing.md,
  },
  infoText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingBottom: Spacing.xl,
  },
});