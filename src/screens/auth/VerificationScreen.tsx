/**
 * Tela de verificação de código
 * Permite ao usuário inserir o código de 6 dígitos recebido
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { RootState } from '@/store';
import { setVerificationCode } from '@/store/slices/authSlice';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type VerificationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Verification'>;

interface Props {
  navigation: VerificationScreenNavigationProp;
}

export default function VerificationScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { phoneNumber } = useSelector((state: RootState) => state.auth);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus próximo input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert('Erro', 'Por favor, insira o código completo');
      return;
    }

    setLoading(true);
    
    // Simula verificação do código
    setTimeout(() => {
      dispatch(setVerificationCode(fullCode));
      setLoading(false);
      navigation.navigate('ProfileChoice');
    }, 1500);
  };

  const handleResend = () => {
    Alert.alert('Código reenviado', `Novo código enviado para ${phoneNumber}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Digite o código recebido
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enviamos um código de 6 dígitos para seu telefone
          </Text>
        </View>

        {/* Code Input */}
        <View style={styles.form}>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  {
                    borderColor: digit ? colors.primary : colors.border,
                    backgroundColor: colors.background,
                    color: colors.text,
                  },
                ]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {/* Resend Link */}
          <TouchableOpacity onPress={handleResend} style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: colors.primary }]}>
              Reenviar código
            </Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar"
            onPress={handleConfirm}
            loading={loading}
            disabled={code.some(d => !d)}
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: Spacing.xl,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingBottom: Spacing.xl,
  },
});