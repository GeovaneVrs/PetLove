import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useFavoritesStore } from '../store/favorites.store';
import { useTheme } from '../theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  petId: string;
  size?: number;
};

export function FavoriteButton({ petId, size = 22 }: Props) {
  const { colors } = useTheme();
  const isFavorite = useFavoritesStore((s) => s.ids.includes(petId));
  const toggle = useFavoritesStore((s) => s.toggle);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async () => {
    scale.value = withSpring(1.3, {}, () => {
      scale.value = withSpring(1);
    });
    await toggle(petId);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[styles.btn, animatedStyle, { backgroundColor: colors.surface }]}
      hitSlop={8}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? colors.error : colors.textSecondary}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
