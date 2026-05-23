import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { Button } from './Button';

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  icon = 'paw-outline',
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={styles.wrap}>
      <View style={[styles.iconWrap, { backgroundColor: colors.primary + '18' }]}>
        <Ionicons name={icon} size={48} color={colors.primary} />
      </View>
      <Text style={[typography.h3, { color: colors.text, marginTop: spacing.lg }]}>{title}</Text>
      <Text
        style={[
          typography.bodySmall,
          { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
        ]}
      >
        {description}
      </Text>
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} style={{ marginTop: spacing.xl, minWidth: 200 }} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
