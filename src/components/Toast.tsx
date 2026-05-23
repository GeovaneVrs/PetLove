import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  message: string | null;
  visible: boolean;
};

export function Toast({ message, visible }: Props) {
  const { colors, radius, shadows, typography } = useTheme();
  const insets = useSafeAreaInsets();

  if (!visible || !message) return null;

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={[
        styles.toast,
        shadows.md,
        {
          top: insets.top + 12,
          backgroundColor: colors.text,
          borderRadius: radius.md,
        },
      ]}
    >
      <Text style={[typography.bodySmall, { color: '#FFF', textAlign: 'center' }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 999,
  },
});
