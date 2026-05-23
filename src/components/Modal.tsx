import React from 'react';
import { Modal as RNModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { Button } from './Button';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  confirmLabel?: string;
};

export function Modal({
  visible,
  title,
  message,
  onClose,
  confirmLabel = 'Fechar',
}: Props) {
  const { colors, radius, spacing, typography, shadows } = useTheme();

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={onClose}>
        <Pressable
          style={[
            styles.card,
            shadows.lg,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              padding: spacing.xl,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.success + '22' }]}>
            <Ionicons name="checkmark-circle" size={56} color={colors.success} />
          </View>
          <Text style={[typography.h2, { color: colors.text, marginTop: spacing.lg, textAlign: 'center' }]}>
            {title}
          </Text>
          <Text
            style={[
              typography.body,
              { color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' },
            ]}
          >
            {message}
          </Text>
          <Button label={confirmLabel} onPress={onClose} style={{ marginTop: spacing.xl }} />
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 360, alignItems: 'center' },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
