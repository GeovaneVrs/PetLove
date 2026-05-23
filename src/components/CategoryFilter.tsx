import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/categories';
import { useTheme } from '../theme/ThemeProvider';
import type { PetCategory } from '../types';

type Props = {
  selected: PetCategory | 'all';
  onSelect: (id: PetCategory | 'all') => void;
};

export function CategoryFilter({ selected, onSelect }: Props) {
  const { colors, radius, spacing } = useTheme();

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: spacing.sm, paddingVertical: spacing.sm }}
      renderItem={({ item }) => {
        const active = selected === item.id;
        return (
          <Pressable
            onPress={() => onSelect(item.id)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.primary : colors.surface,
                borderColor: active ? colors.primary : colors.border,
                borderRadius: radius.full,
              },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={16}
              color={active ? '#FFF' : colors.textSecondary}
            />
            <Text
              style={{
                color: active ? '#FFF' : colors.text,
                fontWeight: '600',
                fontSize: 13,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
});
