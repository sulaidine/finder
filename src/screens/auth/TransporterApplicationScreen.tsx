/**
 * Tela de candidatura para transportadora
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
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { TransporterApplication } from '@/types';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type TransporterApplicationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'TransporterApplication'>;

interface Props {
  navigation: TransporterApplicationScreenNavigationProp;
}

export default function TransporterApplicationScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TransporterApplication>({
    companyName: '',
    contactPerson: '',
    email: '',
    license: '',
    truckType: '',
    phone: '',
  });

  const updateFormData = (field: keyof TransporterApplication, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof TransporterApplication)[] = [
      'companyName', 'contactPerson', 'email', 'license', 'truckType'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
        return false;
      }
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simula envio da candidatura
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('WaitingContact');
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Candidatura de Transportadora
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Preencha seus dados para se tornar nosso parceiro
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Nome da empresa *"
              placeholder="Ex: Transportes Silva Lda"
              value={formData.companyName}
              onChangeText={(value) => updateFormData('companyName', value)}
              autoCapitalize="words"
            />

            <Input
              label="Pessoa de contacto *"
              placeholder="Nome do responsável"
              value={formData.contactPerson}
              onChangeText={(value) => updateFormData('contactPerson', value)}
              autoCapitalize="words"
            />

            <Input
              label="Email empresarial *"
              placeholder="empresa@exemplo.com"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Licença de transporte *"
              placeholder="Número da licença"
              value={formData.license}
              onChangeText={(value) => updateFormData('license', value)}
            />

            <Input
              label="Tipo de caminhão *"
              placeholder="Ex: Caminhão médio, caminhão grande"
              value={formData.truckType}
              onChangeText={(value) => updateFormData('truckType', value)}
            />

            <Input
              label="Telefone adicional"
              placeholder="Número alternativo (opcional)"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Enviar Candidatura"
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
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    paddingTop: Spacing.md,
  },
});