import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = 'Buscar pets...' }: Props) {
  const { colors, radius, shadows } = useTheme();

  return (
    <View
      style={[
        styles.wrap,
        shadows.sm,
        { backgroundColor: colors.surface, borderRadius: radius.lg, borderColor: colors.border },
      ]}
    >
      <Ionicons name="search" size={20} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, { color: colors.text }]}
      />
      {value.length > 0 ? (
        <Ionicons
          name="close-circle"
          size={20}
          color={colors.textMuted}
          onPress={() => onChangeText('')}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    gap: 8,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 4 },
});
