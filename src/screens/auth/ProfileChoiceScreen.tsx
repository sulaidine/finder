/**
 * Tela de escolha de perfil moderna
 * Cards elegantes com animações e micro-interações
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { setUserType } from '@/store/slices/authSlice';
import { UserType } from '@/types';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '@/constants/Colors';

type ProfileChoiceScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ProfileChoice'>;

interface Props {
  navigation: ProfileChoiceScreenNavigationProp;
}

const { width } = Dimensions.get('window');

export default function ProfileChoiceScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSelectProfile = (type: UserType) => {
    dispatch(setUserType(type));
    
    if (type === 'client') {
      navigation.navigate('ClientName');
    } else {
      navigation.navigate('TransporterApplication');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const ProfileCard = ({ 
    type, 
    icon, 
    title, 
    description,
    gradient,
    features
  }: { 
    type: UserType; 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    description: string;
    gradient: string[];
    features: string[];
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => handleSelectProfile(type)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.cardGradient, { ...Shadows.large }]}
          >
            <View style={styles.cardContent}>
              {/* Icon */}
              <View style={[styles.iconContainer, { backgroundColor: colors.white + '20' }]}>
                <Ionicons name={icon} size={32} color={colors.white} />
              </View>
              
              {/* Content */}
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>
                  {title}
                </Text>
                <Text style={styles.cardDescription}>
                  {description}
                </Text>
                
                {/* Features */}
                <View style={styles.featuresContainer}>
                  {features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Ionicons name="checkmark" size={12} color={colors.white} />
                      <Text style={styles.featureText}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              
              {/* Arrow */}
              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward" size={20} color={colors.white} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
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
                Escolha seu perfil
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Como você pretende usar o Truck Finder?
              </Text>
            </View>
          </View>

          {/* Profile Cards */}
          <View style={styles.cardsContainer}>
            <ProfileCard
              type="client"
              icon="person"
              title="Sou Cliente"
              description="Preciso enviar mercadorias"
              gradient={['#FF6B35', '#FF8A65']}
              features={['Busca rápida', 'Pagamento seguro', 'Rastreamento']}
            />
            
            <ProfileCard
              type="transporter"
              icon="car-sport"
              title="Sou Transportadora"
              description="Ofereço serviços de transporte"
              gradient={['#2563EB', '#3B82F6']}
              features={['Mais clientes', 'Gestão completa', 'Pagamentos semanais']}
            />
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.xxl,
  },
  cardContainer: {
    width: '100%',
  },
  profileCard: {
    width: '100%',
  },
  cardGradient: {
    borderRadius: BorderRadius.xxxl,
    padding: Spacing.xxl,
    minHeight: 180,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  cardDescription: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  featuresContainer: {
    gap: Spacing.xs,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
});