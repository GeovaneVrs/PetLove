import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  message?: string;
  fullScreen?: boolean;
};

export function Loading({ message = 'Carregando...', fullScreen }: Props) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.wrap, fullScreen && styles.full, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? (
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: spacing.md }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  full: { flex: 1 },
});
