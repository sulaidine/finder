/**
 * Tela de escolha de perfil
 * Permite ao usuário escolher entre cliente ou transportadora
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { setUserType } from '@/store/slices/authSlice';
import { UserType } from '@/types';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Colors';

type ProfileChoiceScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ProfileChoice'>;

interface Props {
  navigation: ProfileChoiceScreenNavigationProp;
}

export default function ProfileChoiceScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleSelectProfile = (type: UserType) => {
    dispatch(setUserType(type));
    
    if (type === 'client') {
      navigation.navigate('ClientName');
    } else {
      navigation.navigate('TransporterApplication');
    }
  };

  const ProfileOption = ({ 
    type, 
    icon, 
    title, 
    description 
  }: { 
    type: UserType; 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    description: string; 
  }) => (
    <TouchableOpacity
      style={[styles.optionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => handleSelectProfile(type)}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
        <Ionicons name={icon} size={32} color={colors.textSecondary} />
      </View>
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Bem-vindo ao Truck Finder
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Você é cliente ou transportadora?
          </Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <ProfileOption
            type="client"
            icon="person"
            title="Cliente"
            description="Preciso enviar mercadorias"
          />
          
          <ProfileOption
            type="transporter"
            icon="car"
            title="Transportadora"
            description="Ofereço serviços de transporte"
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
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.md,
  },
  optionCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  optionContent: {
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs,
  },
  optionDescription: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});