import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Pet } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { FavoriteButton } from './FavoriteButton';
import { truncate } from '../utils/format';

type Props = {
  pet: Pet;
  onPress: () => void;
  compact?: boolean;
};

function PetCardComponent({ pet, onPress, compact }: Props) {
  const { colors, radius, shadows, spacing, typography } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        shadows.md,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          opacity: pressed ? 0.92 : 1,
        },
        compact && { flexDirection: 'row' },
      ]}
    >
      <Image
        source={{ uri: pet.images[0] }}
        style={[styles.image, compact && styles.imageCompact, { borderRadius: radius.md }]}
      />
      <View style={[styles.content, { padding: spacing.md }]}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.h3, { color: colors.text }]}>{pet.name}</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
              {pet.species} · {pet.age}
            </Text>
          </View>
          <FavoriteButton petId={pet.id} />
        </View>
        <View style={styles.meta}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={[typography.caption, { color: colors.textMuted }]}>{pet.location}</Text>
        </View>
        {!compact ? (
          <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            {truncate(pet.description, 80)}
          </Text>
        ) : null}
        {pet.featured ? (
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <Text style={styles.badgeText}>Destaque</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

export const PetCard = memo(PetCardComponent);

const styles = StyleSheet.create({
  card: { overflow: 'hidden', marginBottom: 16 },
  image: { width: '100%', height: 180 },
  imageCompact: { width: 100, height: 100 },
  content: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
