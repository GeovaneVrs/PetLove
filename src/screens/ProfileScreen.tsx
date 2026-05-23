import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USER } from '../data/user';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from '../navigation/types';
import { useFavoritesStore } from '../store/favorites.store';
import { useTheme } from '../theme/ThemeProvider';
import { globalStyles } from '../styles/global';

export default function ProfileScreen() {
  const { colors, spacing, typography, radius, shadows } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favCount = useFavoritesStore((s) => s.ids.length);

  const stats = [
    { label: 'Favoritos', value: favCount, icon: 'heart' as const },
    { label: 'Adoções', value: MOCK_USER.stats.adoptionsRequested, icon: 'paw' as const },
    { label: 'Dicas lidas', value: MOCK_USER.stats.tipsRead, icon: 'book' as const },
  ];

  const menu = [
    { label: 'Configurações', icon: 'settings-outline' as const, route: ROUTES.SETTINGS },
    { label: 'Dicas de cuidados', icon: 'bulb-outline' as const, route: ROUTES.CARE_TIPS },
  ];

  return (
    <ScrollView style={[globalStyles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{MOCK_USER.name}</Text>
        <Text style={styles.email}>{MOCK_USER.email}</Text>
        <Text style={styles.bio}>{MOCK_USER.bio}</Text>
      </View>

      <View style={[globalStyles.screenPadding, { marginTop: -spacing.xl }]}>
        <View style={[styles.statsRow, shadows.md, { backgroundColor: colors.surface, borderRadius: radius.lg }]}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Ionicons name={s.icon} size={22} color={colors.primary} />
              <Text style={[typography.h2, { color: colors.text }]}>{s.value}</Text>
              <Text style={[typography.caption, { color: colors.textMuted }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[typography.label, { color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm }]}>
          CONTA
        </Text>
        {menu.map((item) => (
          <Pressable
            key={item.route}
            onPress={() => navigation.navigate(item.route)}
            style={[styles.menuItem, shadows.sm, { backgroundColor: colors.surface, borderRadius: radius.md }]}
          >
            <Ionicons name={item.icon} size={22} color={colors.primary} />
            <Text style={[typography.body, { color: colors.text, flex: 1, marginLeft: spacing.md }]}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>
        ))}

        <Text style={[typography.caption, { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xxl }]}>
          Membro desde {MOCK_USER.memberSince}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: 48, paddingBottom: 48, paddingHorizontal: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#FFF' },
  name: { color: '#FFF', fontSize: 22, fontWeight: '700', marginTop: 12 },
  email: { color: '#DBEAFE', fontSize: 14, marginTop: 4 },
  bio: { color: '#E0E7FF', fontSize: 14, textAlign: 'center', marginTop: 12 },
  statsRow: { flexDirection: 'row', padding: 20 },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
});
