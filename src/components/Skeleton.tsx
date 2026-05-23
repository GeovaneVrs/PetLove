import React, { useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style }: Props) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        styles.base,
        animatedStyle,
        { width, height, borderRadius, backgroundColor: colors.border },
        style,
      ]}
    />
  );
}

export function PetCardSkeleton() {
  const { radius, spacing } = useTheme();
  return (
    <View style={{ marginBottom: spacing.lg, gap: spacing.sm }}>
      <Skeleton height={180} borderRadius={radius.lg} />
      <Skeleton height={20} width="60%" />
      <Skeleton height={14} width="40%" />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {},
});
