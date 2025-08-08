/**
 * Tela para capturar o nome do cliente
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
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { RootState } from '@/store';
import { setUser } from '@/store/slices/authSlice';
import { User } from '@/types';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type ClientNameScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ClientName'>;

interface Props {
  navigation: ClientNameScreenNavigationProp;
}

export default function ClientNameScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { phoneNumber, userType } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome');
      return;
    }

    setLoading(true);
    
    // Simula criação do usuário
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phoneNumber,
        type: userType,
        createdAt: new Date().toISOString(),
      };
      
      dispatch(setUser(user));
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Qual é o seu nome?
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Vamos personalizar sua experiência
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Nome completo"
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continuar"
            onPress={handleContinue}
            loading={loading}
            disabled={!name.trim()}
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
    textAlign: 'center',
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
  buttonContainer: {
    paddingBottom: Spacing.xl,
  },
});