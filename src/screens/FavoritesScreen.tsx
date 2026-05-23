import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from '../navigation/types';
import { useFavoritesStore } from '../store/favorites.store';
import { useTheme } from '../theme/ThemeProvider';
import { PetCard } from '../components/PetCard';
import { EmptyState } from '../components/EmptyState';
import { globalStyles } from '../styles/global';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favorites = useFavoritesStore((s) => s.getFavoritePets());

  return (
    <View style={[globalStyles.screen, { backgroundColor: colors.background }]}>
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
  list: { paddingTop: 16, paddingBottom: 100 },
  empty: { flexGrow: 1 },
});
