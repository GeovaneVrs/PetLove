import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline';

type Props = PressableProps & {
  label: string;
  variant?: Variant;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  variant = 'primary',
  loading,
  disabled,
  style,
  ...rest
}: Props) {
  const { colors, radius, typography } = useTheme();

  const variants: Record<Variant, { bg: string; text: string; border?: string }> = {
    primary: { bg: colors.primary, text: '#FFFFFF' },
    secondary: { bg: colors.primaryLight, text: '#FFFFFF' },
    accent: { bg: colors.accent, text: '#FFFFFF' },
    ghost: { bg: 'transparent', text: colors.primary },
    outline: { bg: 'transparent', text: colors.primary, border: colors.border },
  };

  const v = variants[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderRadius: radius.md,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: v.border,
          opacity: pressed || disabled || loading ? 0.75 : 1,
        },
        style,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : (
        <Text style={[typography.label, { color: v.text, textAlign: 'center' }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
});
