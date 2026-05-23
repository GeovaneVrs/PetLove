import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from '../navigation/types';
import { MOCK_PETS } from '../mocks/pets.mock';
import { useFavoritesStore } from '../store/favorites.store';
import { useTheme } from '../theme/ThemeProvider';
import { PetCard } from '../components/PetCard';
import { EmptyState } from '../components/EmptyState';
import { globalStyles } from '../styles/global';

export default function FavoritesScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const ids = useFavoritesStore((s) => s.ids);
  const favorites = useMemo(
    () => MOCK_PETS.filter((p) => ids.includes(p.id)),
    [ids],
  );

  return (
    <View style={[globalStyles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.pageHeader, { paddingTop: insets.top + spacing.md }]}>
        <Text style={[typography.h2, { color: colors.text }]}>Favoritos</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[globalStyles.screenPadding, styles.list, favorites.length === 0 && styles.empty]}
        renderItem={({ item }) => (
          <PetCard
            pet={item}
            onPress={() => navigation.navigate(ROUTES.PET_DETAILS, { petId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="Nenhum favorito ainda"
            description="Toque no coração nos pets que você gostou para salvá-los aqui."
            actionLabel="Explorar pets"
            onAction={() =>
              navigation.navigate(ROUTES.MAIN_TABS, { screen: ROUTES.PETS_LIST })
            }
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeader: { paddingHorizontal: 16, paddingBottom: 8 },
  list: { paddingTop: 8, paddingBottom: 100 },
  empty: { flexGrow: 1 },
});
