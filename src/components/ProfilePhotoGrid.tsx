import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

const GAP = 8;
const COLS = 3;

type Props = {
  photos: string[];
  onAdd: () => void;
  onRemove: (uri: string) => void;
  maxPhotos?: number;
};

export function ProfilePhotoGrid({ photos, onAdd, onRemove, maxPhotos = 12 }: Props) {
  const { colors, radius, typography, shadows } = useTheme();
  const { width } = useWindowDimensions();
  const horizontalPad = 16;
  const cellSize = (width - horizontalPad * 2 - GAP * (COLS - 1)) / COLS;
  const canAdd = photos.length < maxPhotos;

  const confirmRemove = (uri: string) => {
    Alert.alert('Remover foto', 'Deseja remover esta foto do álbum?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => onRemove(uri) },
    ]);
  };

  return (
    <View style={styles.grid}>
      {photos.map((uri) => (
        <Pressable
          key={uri}
          onLongPress={() => confirmRemove(uri)}
          style={({ pressed }) => [
            styles.cell,
            shadows.sm,
            {
              width: cellSize,
              height: cellSize,
              borderRadius: radius.md,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Image source={{ uri }} style={styles.image} />
          <View style={[styles.removeHint, { backgroundColor: colors.overlay }]}>
            <Ionicons name="trash-outline" size={14} color="#FFF" />
          </View>
        </Pressable>
      ))}

      {canAdd ? (
        <Pressable
          onPress={onAdd}
          style={({ pressed }) => [
            styles.cell,
            styles.addCell,
            {
              width: cellSize,
              height: cellSize,
              borderRadius: radius.md,
              borderColor: colors.border,
              backgroundColor: colors.background,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Ionicons name="add" size={28} color={colors.primary} />
          <Text style={[typography.caption, { color: colors.textMuted, marginTop: 4 }]}>
            Adicionar
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  cell: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addCell: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeHint: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
