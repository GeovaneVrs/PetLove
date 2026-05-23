import React, { memo, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Pet } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { FavoriteButton } from './FavoriteButton';
import { truncate } from '../utils/format';

const FEATURED_HEIGHT = 300;
const FEATURED_IMAGE_HEIGHT = 136;
const FEATURED_DESC_LINES = 2;

type Props = {
  pet: Pet;
  onPress: () => void;
  compact?: boolean;
  featured?: boolean;
};

function PetCardComponent({ pet, onPress, compact, featured }: Props) {
  const { colors, radius, shadows, spacing, typography } = useTheme();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [pet.images[0]]);

  const descriptionLines = featured ? FEATURED_DESC_LINES : 2;
  const descriptionMax = featured ? 72 : 80;

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
        compact && styles.cardCompact,
        featured && styles.cardFeatured,
      ]}
    >
      <View
        style={[
          styles.imageWrap,
          compact && styles.imageWrapCompact,
          featured && { height: FEATURED_IMAGE_HEIGHT },
          { borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
        ]}
      >
        {!imageError ? (
          <Image
            source={{ uri: pet.images[0] }}
            style={styles.imageFill}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.border }]}>
            <Ionicons name="paw" size={40} color={colors.textMuted} />
          </View>
        )}
        {featured && pet.featured ? (
          <View style={[styles.badgeOnImage, { backgroundColor: colors.accent }]}>
            <Text style={styles.badgeText}>Destaque</Text>
          </View>
        ) : null}
        {featured ? (
          <View style={styles.favOnImage}>
            <FavoriteButton petId={pet.id} />
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.content,
          { padding: spacing.md },
          featured && styles.contentFeatured,
        ]}
      >
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={[typography.h3, { color: colors.text }]} numberOfLines={1}>
              {pet.name}
            </Text>
            <Text
              style={[typography.bodySmall, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {pet.species} · {pet.age}
            </Text>
          </View>
          {!featured ? <FavoriteButton petId={pet.id} /> : null}
        </View>

        <View style={styles.meta}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={[typography.caption, { color: colors.textMuted }]} numberOfLines={1}>
            {pet.shelterName}
          </Text>
        </View>

        {!compact ? (
          <Text
            style={[
              typography.bodySmall,
              {
                color: colors.textSecondary,
                marginTop: spacing.xs,
              },
              featured && styles.descFeatured,
            ]}
            numberOfLines={descriptionLines}
          >
            {truncate(pet.description, descriptionMax)}
          </Text>
        ) : null}

        {!featured && pet.featured ? (
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
  cardCompact: { flexDirection: 'row' },
  cardFeatured: {
    height: FEATURED_HEIGHT,
    marginBottom: 0,
  },
  imageWrap: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  imageWrapCompact: {
    width: 100,
    height: 100,
  },
  imageFill: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  contentFeatured: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleBlock: { flex: 1, marginRight: 4 },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  descFeatured: {
    minHeight: 40,
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeOnImage: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  favOnImage: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
