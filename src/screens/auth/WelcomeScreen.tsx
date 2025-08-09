/**
 * Tela de boas-vindas moderna
 * Design inspirado em apps premium com gradientes e animações
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const { height, width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Hero Section */}
          <Animated.View 
            style={[
              styles.heroSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Logo/Brand */}
            <View style={[styles.logoContainer, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="car-sport" size={48} color={colors.primary} />
            </View>
            
            <Text style={[styles.brandName, { color: colors.text }]}>
              Truck Finder
            </Text>
            
            {/* Hero Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
                }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', colors.background + '80']}
                style={styles.imageOverlay}
              />
            </View>
          </Animated.View>

          {/* Content Section */}
          <Animated.View 
            style={[
              styles.contentSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: colors.text }]}>
                Conectamos você ao{'\n'}
                <Text style={{ color: colors.primary }}>transporte ideal</Text>
              </Text>
              
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Soluções logísticas inteligentes para suas necessidades de transporte em Moçambique
              </Text>
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <FeatureItem
                icon="flash"
                text="Busca rápida"
                colors={colors}
              />
              <FeatureItem
                icon="shield-checkmark"
                text="Seguro e confiável"
                colors={colors}
              />
              <FeatureItem
                icon="location"
                text="Rastreamento em tempo real"
                colors={colors}
              />
            </View>
          </Animated.View>

          {/* CTA Section */}
          <Animated.View 
            style={[
              styles.ctaSection,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Button
              title="Começar Agora"
              onPress={handleContinue}
              variant="gradient"
              size="large"
              style={styles.ctaButton}
            />
            
            <View style={styles.termsContainer}>
              <Text style={[styles.termsText, { color: colors.textTertiary }]}>
                Ao continuar, você concorda com nossos{' '}
                <Text style={{ color: colors.primary }}>Termos de Uso</Text>
              </Text>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const FeatureItem = ({ icon, text, colors }: { icon: string; text: string; colors: any }) => (
  <View style={styles.featureItem}>
    <View style={[styles.featureIcon, { backgroundColor: colors.primary + '15' }]}>
      <Ionicons name={icon as any} size={16} color={colors.primary} />
    </View>
    <Text style={[styles.featureText, { color: colors.textSecondary }]}>
      {text}
    </Text>
  </View>
);

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
  heroSection: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  brandName: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xxxl,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.25,
    borderRadius: BorderRadius.xxxl,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  title: {
    fontSize: FontSizes.xxxxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: Spacing.xl,
  },
  subtitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: Spacing.md,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.md,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  ctaSection: {
    paddingBottom: Spacing.xxxl,
  },
  ctaButton: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
});