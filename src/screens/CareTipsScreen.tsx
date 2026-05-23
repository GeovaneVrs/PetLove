import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CARE_TIPS } from '../data/careTips';
import { useTheme } from '../theme/ThemeProvider';
import { Header } from '../components/Header';
import { globalStyles } from '../styles/global';

export default function CareTipsScreen() {
  const { colors, spacing, typography, radius, shadows } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[globalStyles.screen, { backgroundColor: colors.background }]}>
      <Header title="Dicas de cuidados" showBack onBack={() => navigation.goBack()} />
      <FlatList
        data={CARE_TIPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[globalStyles.screenPadding, styles.list]}
        renderItem={({ item }) => (
          <View
            style={[styles.card, shadows.md, { backgroundColor: colors.surface, borderRadius: radius.lg }]}
          >
            <View style={[styles.iconWrap, { backgroundColor: item.color + '22' }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[typography.h3, { color: colors.text }]}>{item.title}</Text>
              <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: spacing.xs }]}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 32, gap: 12 },
  card: { flexDirection: 'row', padding: 16, gap: 14, marginBottom: 12 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
