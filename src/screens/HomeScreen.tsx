import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { petService } from '../services/pet.service';
import { MOCK_USER } from '../data/user';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from '../navigation/types';
import type { Pet, PetCategory } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { PetCard } from '../components/PetCard';
import { SectionTitle } from '../components/SectionTitle';
import { Loading } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import { globalStyles } from '../styles/global';

export default function HomeScreen() {
  const { colors, spacing, typography, radius, shadows } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<PetCategory | 'all'>('all');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebounce(query);

  const isFiltering = debouncedQuery.trim().length > 0 || category !== 'all';

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const loadPets = async () => {
      const results = isFiltering
        ? await petService.search(debouncedQuery, category)
        : await petService.getFeatured();

      if (!cancelled) {
        setPets(results);
        setLoading(false);
      }
    };

    loadPets();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, category, isFiltering]);

  const openDetails = useCallback(
    (petId: string) => navigation.navigate(ROUTES.PET_DETAILS, { petId }),
    [navigation],
  );

  const goToPets = useCallback(() => {
    navigation.navigate(ROUTES.MAIN_TABS, {
      screen: ROUTES.PETS_LIST,
      params: { query, category },
    });
  }, [navigation, query, category]);

  return (
    <ScrollView
      style={[globalStyles.screen, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require('../../assets/banner.png')}
        resizeMode="cover"
        style={[styles.banner, { borderBottomLeftRadius: radius.xl, borderBottomRightRadius: radius.xl }]}
      >
        <View style={[styles.bannerOverlay, { paddingTop: insets.top + spacing.lg }]}>
          <Text style={styles.bannerHello}>Olá, {MOCK_USER.name.split(' ')[0]}!</Text>
          <Text style={styles.bannerTitle}>Encontre seu novo melhor amigo</Text>
          <Text style={styles.bannerSub}>Adote com amor e responsabilidade</Text>
        </View>
      </ImageBackground>

      <View style={[globalStyles.screenPadding, { marginTop: -spacing.xl }]}>
        <SearchBar value={query} onChangeText={setQuery} />
        <Pressable onPress={goToPets} style={{ marginTop: spacing.sm }}>
          <Text style={[typography.caption, { color: colors.primary, textAlign: 'right' }]}>
            Buscar em todos os pets →
          </Text>
        </Pressable>

        <CategoryFilter selected={category} onSelect={setCategory} />

        <SectionTitle
          title={isFiltering ? 'Resultados da busca' : 'Em destaque'}
          actionLabel="Ver todos"
          onAction={goToPets}
        />

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            horizontal
            data={pets}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              { gap: spacing.md, paddingBottom: spacing.lg },
              pets.length === 0 && { flexGrow: 1, minWidth: '100%' },
            ]}
            ListEmptyComponent={
              <View style={{ width: 280 }}>
                <EmptyState
                  icon="search-outline"
                  title="Nenhum pet encontrado"
                  description="Tente outro nome, espécie ou categoria."
                  actionLabel="Ver todos os pets"
                  onAction={goToPets}
                />
              </View>
            }
            renderItem={({ item }) => (
              <View style={{ width: 280, height: 300 }}>
                <PetCard
                  pet={item}
                  featured
                  onPress={() => openDetails(item.id)}
                />
              </View>
            )}
          />
        )}

        <Pressable
          onPress={() => navigation.navigate(ROUTES.CARE_TIPS)}
          style={[
            styles.tipsCard,
            shadows.md,
            { backgroundColor: colors.primary, borderRadius: radius.lg, marginBottom: spacing.xxl },
          ]}
        >
          <Ionicons name="bulb-outline" size={32} color="#FFF" />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={[typography.h3, { color: '#FFF' }]}>Dicas de cuidados</Text>
            <Text style={[typography.bodySmall, { color: '#E0E7FF' }]}>
              Alimentação, saúde e bem-estar
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: { height: 220, justifyContent: 'flex-end' },
  bannerOverlay: {
    backgroundColor: 'rgba(37, 99, 235, 0.75)',
    padding: 24,
    paddingBottom: 40,
  },
  bannerHello: { color: '#E0E7FF', fontSize: 14, marginBottom: 4 },
  bannerTitle: { color: '#FFF', fontSize: 26, fontWeight: '700' },
  bannerSub: { color: '#DBEAFE', fontSize: 14, marginTop: 6 },
  tipsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 8,
  },
});
