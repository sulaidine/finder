/**
 * Tela de boas-vindas
 * Primeira tela que o usuário vê ao abrir o app
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const handleContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Imagem do caminhão */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1566472515693-d8c8c8e0b3f7?q=80&w=800&auto=format&fit=crop',
            }}
            style={styles.truckImage}
            resizeMode="cover"
          />
        </View>

        {/* Conteúdo de texto */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Seu parceiro logístico para entregas sem complicações.
          </Text>
          
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Nosso serviço de logística oferece soluções completas para todas as suas necessidades de envio.
          </Text>
        </View>

        {/* Botão */}
        <View style={styles.buttonContainer}>
          <Button
            title="Começar"
            onPress={handleContinue}
            size="large"
            style={styles.button}
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  truckImage: {
    width: '100%',
    maxWidth: 320,
    height: height * 0.35,
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.sm,
  },
  buttonContainer: {
    paddingBottom: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});