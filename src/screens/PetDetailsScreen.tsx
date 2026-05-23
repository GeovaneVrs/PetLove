import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { petService } from '../services/pet.service';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from '../navigation/types';
import type { Pet } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { Header } from '../components/Header';
import { ImageCarousel } from '../components/ImageCarousel';
import { FavoriteButton } from '../components/FavoriteButton';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { SectionTitle } from '../components/SectionTitle';
import { globalStyles } from '../styles/global';

export default function PetDetailsScreen() {
  const { colors, spacing, typography, radius, shadows } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, typeof ROUTES.PET_DETAILS>>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    petService.getById(route.params.petId).then((p) => {
      setPet(p ?? null);
      setLoading(false);
    });
  }, [route.params.petId]);

  if (loading) return <Loading fullScreen />;
  if (!pet) return null;

  return (
    <View style={[globalStyles.screen, { backgroundColor: colors.background }]}>
      <Header title={pet.name} showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageCarousel images={pet.images} />
        <View style={[globalStyles.screenPadding, { marginTop: spacing.lg }]}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[typography.h1, { color: colors.text }]}>{pet.name}</Text>
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                {pet.species} · {pet.age} · {pet.location}
              </Text>
            </View>
            <FavoriteButton petId={pet.id} size={26} />
          </View>

          <View style={styles.statsRow}>
            {[
              { icon: 'male-female-outline' as const, label: pet.gender === 'male' ? 'Macho' : 'Fêmea' },
              { icon: 'resize-outline' as const, label: pet.size },
              { icon: 'medkit-outline' as const, label: pet.vaccinated ? 'Vacinado' : 'Pendente' },
            ].map((s) => (
              <View
                key={s.label}
                style={[styles.stat, shadows.sm, { backgroundColor: colors.surface, borderRadius: radius.md }]}
              >
                <Ionicons name={s.icon} size={18} color={colors.primary} />
                <Text style={[typography.caption, { color: colors.text, marginTop: 4 }]}>{s.label}</Text>
              </View>
            ))}
          </View>

          <SectionTitle title="Sobre" />
          <Text style={[typography.body, { color: colors.textSecondary }]}>{pet.description}</Text>

          <SectionTitle title="Personalidade" />
          <View style={styles.tags}>
            {pet.personality.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[typography.caption, { color: colors.primary }]}>{tag}</Text>
              </View>
            ))}
          </View>

          <SectionTitle title="Cuidados" />
          {pet.careTips.map((tip) => (
            <View key={tip} style={styles.tipRow}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={[typography.bodySmall, { color: colors.text, flex: 1 }]}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, shadows.lg, { backgroundColor: colors.surface }]}>
        <Button
          label="Quero Adotar"
          onPress={() =>
            navigation.navigate(ROUTES.ADOPTION_FORM, { petId: pet.id, petName: pet.name })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  statsRow: { flexDirection: 'row', gap: 10, marginVertical: 16 },
  stat: { flex: 1, alignItems: 'center', padding: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tipRow: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 8 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 28,
  },
});
