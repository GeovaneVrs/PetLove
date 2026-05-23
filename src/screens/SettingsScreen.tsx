import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { APP_INFO } from '../constants/app';
import { useTheme, type ThemeMode } from '../theme/ThemeProvider';
import { Header } from '../components/Header';
import { globalStyles } from '../styles/global';

const THEME_OPTIONS: { label: string; value: ThemeMode }[] = [
  { label: 'Claro', value: 'light' },
  { label: 'Escuro', value: 'dark' },
  { label: 'Sistema', value: 'system' },
];

export default function SettingsScreen() {
  const { colors, spacing, typography, radius, shadows, mode, setMode } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[globalStyles.screen, { backgroundColor: colors.background }]}>
      <Header title="Configurações" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={[globalStyles.screenPadding, { paddingBottom: 40 }]}>
        <Text style={[typography.label, { color: colors.textMuted, marginBottom: spacing.sm }]}>
          APARÊNCIA
        </Text>
        <View style={[styles.card, shadows.sm, { backgroundColor: colors.surface, borderRadius: radius.lg }]}>
          {THEME_OPTIONS.map((opt, i) => (
            <Pressable
              key={opt.value}
              onPress={() => setMode(opt.value)}
              style={[
                styles.option,
                i < THEME_OPTIONS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <Text style={[typography.body, { color: colors.text }]}>{opt.label}</Text>
              {mode === opt.value ? (
                <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
              ) : null}
            </Pressable>
          ))}
        </View>

        <Text style={[typography.label, { color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm }]}>
          SOBRE
        </Text>
        <View style={[styles.card, shadows.sm, { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg }]}>
          <Text style={[typography.h3, { color: colors.text }]}>{APP_INFO.name}</Text>
          <Text style={[typography.caption, { color: colors.textMuted, marginTop: 4 }]}>
            Versão {APP_INFO.version}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: spacing.md }]}>
            {APP_INFO.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
});
