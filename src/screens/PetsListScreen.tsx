import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import type { PetCategory } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { useDebounce } from '../hooks/useDebounce';
import { useInfinitePets } from '../hooks/useInfinitePets';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { PetCard } from '../components/PetCard';
import { PetCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { globalStyles } from '../styles/global';

export default function PetsListScreen() {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<MainTabParamList, typeof ROUTES.PETS_LIST>>();
  const [query, setQuery] = useState(route.params?.query ?? '');
  const [category, setCategory] = useState<PetCategory | 'all'>(
    (route.params?.category as PetCategory | 'all') ?? 'all',
  );
  const debouncedQuery = useDebounce(query);
  const { pets, initialLoading, loading, refreshing, hasMore, loadMore, refresh } =
    useInfinitePets(debouncedQuery, category);

  return (
    <View style={[globalStyles.screen, { backgroundColor: colors.background }]}>
      <View style={[globalStyles.screenPadding, { paddingTop: spacing.lg }]}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar por nome, raça..." />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </View>

      {initialLoading ? (
        <View style={globalStyles.screenPadding}>
          <PetCardSkeleton />
          <PetCardSkeleton />
        </View>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[globalStyles.screenPadding, styles.list]}
          renderItem={({ item }) => (
            <PetCard
              pet={item}
              onPress={() => navigation.navigate(ROUTES.PET_DETAILS, { petId: item.id })}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          refreshing={refreshing}
          onRefresh={refresh}
          ListFooterComponent={
            loading && pets.length > 0 ? (
              <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} />
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              title="Nenhum pet encontrado"
              description="Tente outra busca ou categoria."
              actionLabel="Limpar filtros"
              onAction={() => {
                setQuery('');
                setCategory('all');
              }}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 100 },
});
