/**
 * Tela do sistema de gestão para transportadoras
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TransporterStackParamList } from '@/navigation/MainNavigator';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

type ManagementSystemScreenNavigationProp = StackNavigationProp<TransporterStackParamList, 'Management'>;

interface Props {
  navigation: ManagementSystemScreenNavigationProp;
}

export default function ManagementSystemScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const handleSetupComplete = () => {
    navigation.navigate('OrderReceiving');
  };

  const StatCard = ({ 
    icon, 
    title, 
    value, 
    color 
  }: { 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    value: string; 
    color: string;
  }) => (
    <Card style={[styles.statCard, { backgroundColor: color + '20' }]}>
      <View style={styles.statCardContent}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={[styles.statTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>
        {value}
      </Text>
    </Card>
  );

  const FeatureItem = ({ 
    icon, 
    title, 
    description 
  }: { 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    description: string;
  }) => (
    <View style={styles.featureItem}>
      <View style={[styles.featureIcon, { backgroundColor: colors.surface }]}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Sistema de Gestão
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Seu painel de controle está pronto
            </Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <StatCard
                icon="car"
                title="Viagens"
                value="0"
                color={colors.primary}
              />
              <StatCard
                icon="cash"
                title="Ganhos"
                value="0 MT"
                color={colors.success}
              />
            </View>
            <View style={styles.statsRow}>
              <StatCard
                icon="people"
                title="Clientes"
                value="0"
                color={colors.warning}
              />
              <StatCard
                icon="bar-chart"
                title="Rating"
                value="5.0"
                color="#8B5CF6"
              />
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={[styles.featuresTitle, { color: colors.text }]}>
              Funcionalidades disponíveis:
            </Text>
            
            <View style={styles.featuresList}>
              <FeatureItem
                icon="car"
                title="Receber Pedidos"
                description="Aceite ou recuse pedidos"
              />
              
              <FeatureItem
                icon="cash"
                title="Gestão Financeira"
                description="Acompanhe seus ganhos"
              />
            </View>
          </View>

          {/* Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Começar a Receber Pedidos"
              onPress={handleSetupComplete}
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
    paddingTop: Spacing.xl,
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
  statsContainer: {
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-Bold',
    fontWeight: FontWeights.bold,
  },
  featuresContainer: {
    marginBottom: Spacing.xl,
  },
  featuresTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.md,
  },
  featuresList: {
    gap: Spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  featureDescription: {
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    paddingTop: Spacing.md,
  },
});