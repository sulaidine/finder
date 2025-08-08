/**
 * Tela de perfil do cliente
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { FontSizes, FontWeights, Spacing } from '@/constants/Colors';

export default function ClientProfileScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => dispatch(logout())
        },
      ]
    );
  };

  const ProfileOption = ({ 
    icon, 
    title, 
    onPress, 
    showArrow = true 
  }: { 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    onPress: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.profileOption, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.profileOptionContent}>
        <Ionicons name={icon} size={24} color={colors.textSecondary} />
        <Text style={[styles.profileOptionTitle, { color: colors.text }]}>
          {title}
        </Text>
        {showArrow && (
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Perfil
            </Text>
          </View>

          {/* User Info */}
          <Card style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={[styles.userAvatar, { backgroundColor: colors.primary }]}>
                <Text style={[styles.userInitials, { color: colors.white }]}>
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={[styles.userName, { color: colors.text }]}>
                  {user?.name || 'Usuário'}
                </Text>
                <Text style={[styles.userPhone, { color: colors.textSecondary }]}>
                  {user?.phone || 'Telefone não informado'}
                </Text>
                <View style={[styles.userTypeBadge, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.userTypeText, { color: colors.primary }]}>
                    Cliente
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Profile Options */}
          <View style={styles.optionsContainer}>
            <ProfileOption
              icon="document-text"
              title="Meus Pedidos"
              onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
            />
            
            <ProfileOption
              icon="card"
              title="Métodos de Pagamento"
              onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
            />
            
            <ProfileOption
              icon="location"
              title="Endereços Salvos"
              onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
            />
            
            <ProfileOption
              icon="notifications"
              title="Notificações"
              onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
            />
            
            <ProfileOption
              icon={isDark ? 'sunny' : 'moon'}
              title={`Tema ${isDark ? 'Claro' : 'Escuro'}`}
              onPress={toggleTheme}
              showArrow={false}
            />
            
            <ProfileOption
              icon="help-circle"
              title="Ajuda e Suporte"
              onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
            />
            
            <ProfileOption
              icon="information-circle"
              title="Sobre o App"
              onPress={() => Alert.alert('Truck Finder', 'Versão 1.0.0\nDesenvolvido para facilitar o transporte de cargas.')}
            />
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <Button
              title="Sair da Conta"
              onPress={handleLogout}
              variant="outline"
              size="large"
              style={[styles.logoutButton, { borderColor: colors.error }]}
              textStyle={{ color: colors.error }}
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
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  userCard: {
    marginBottom: Spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitials: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.lg,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs,
  },
  userPhone: {
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    marginBottom: Spacing.sm,
  },
  userTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  userTypeText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  optionsContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  profileOption: {
    borderRadius: 12,
    padding: Spacing.md,
  },
  profileOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  profileOptionTitle: {
    flex: 1,
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Medium',
    fontWeight: FontWeights.medium,
  },
  logoutContainer: {
    paddingTop: Spacing.md,
  },
  logoutButton: {
    borderWidth: 2,
  },
});