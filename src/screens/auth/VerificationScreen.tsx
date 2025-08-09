/**
 * Tela de verificação moderna com animações
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
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
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const shakeInputs = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleConfirm = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      shakeInputs();
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
    if (resendTimer > 0) return;
    
    setResendTimer(60);
    Alert.alert('Código reenviado', `Novo código enviado para ${phoneNumber}`);
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
                Verificação
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Código enviado para {phoneNumber}
              </Text>
            </View>
          </View>

          {/* Verification Card */}
          <Card variant="elevated" style={styles.verificationCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.messageIcon, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="chatbubble" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Digite o código de 6 dígitos
              </Text>
            </View>

            {/* Code Input */}
            <Animated.View 
              style={[
                styles.codeContainer,
                { transform: [{ translateX: shakeAnimation }] }
              ]}
            >
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.codeInput,
                    {
                      borderColor: digit 
                        ? colors.primary 
                        : colors.border,
                      backgroundColor: digit 
                        ? colors.primary + '10' 
                        : colors.background,
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
            </Animated.View>

            {/* Resend Section */}
            <View style={styles.resendContainer}>
              <Text style={[styles.resendLabel, { color: colors.textSecondary }]}>
                Não recebeu o código?
              </Text>
              <TouchableOpacity 
                onPress={handleResend} 
                disabled={resendTimer > 0}
                style={styles.resendButton}
              >
                <Text style={[
                  styles.resendText, 
                  { 
                    color: resendTimer > 0 ? colors.textTertiary : colors.primary,
                  }
                ]}>
                  {resendTimer > 0 ? `Reenviar em ${resendTimer}s` : 'Reenviar código'}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Verificar Código"
              onPress={handleConfirm}
              variant="gradient"
              loading={loading}
              disabled={code.some(d => !d)}
              size="large"
              style={styles.verifyButton}
            />
          </Card>

          {/* Help Section */}
          <View style={styles.helpContainer}>
            <TouchableOpacity style={styles.helpButton}>
              <Ionicons name="help-circle-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.helpText, { color: colors.textSecondary }]}>
                Precisa de ajuda?
              </Text>
            </TouchableOpacity>
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
  verificationCard: {
    marginBottom: Spacing.xxxl,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  messageIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: FontSizes.xl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    fontSize: FontSizes.xl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  resendLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    marginBottom: Spacing.sm,
  },
  resendButton: {
    padding: Spacing.sm,
  },
  resendText: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  verifyButton: {
    width: '100%',
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  helpText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
});