import React, { useCallback, useEffect } from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MOCK_USER } from '../data/user';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from '../navigation/types';
import { useFavoritesStore } from '../store/favorites.store';
import { useProfileStore } from '../store/profile.store';
import { useTheme } from '../theme/ThemeProvider';
import { ProfilePhotoGrid } from '../components/ProfilePhotoGrid';

export default function ProfileScreen() {
  const { colors, spacing, typography, radius, shadows } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favCount = useFavoritesStore((s) => s.ids.length);
  const avatarUri = useProfileStore((s) => s.avatarUri);
  const photos = useProfileStore((s) => s.photos);
  const hydrateProfile = useProfileStore((s) => s.hydrate);
  const setAvatarUri = useProfileStore((s) => s.setAvatarUri);
  const addPhoto = useProfileStore((s) => s.addPhoto);

  useEffect(() => {
    hydrateProfile();
  }, [hydrateProfile]);

  const pickFromCamera = useCallback(
    async (forAlbum: boolean) => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Ative o acesso à câmera nas configurações.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: !forAlbum,
        aspect: forAlbum ? undefined : [1, 1],
        quality: 0.85,
      });
      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        if (forAlbum) {
          const ok = await addPhoto(uri);
          if (!ok) Alert.alert('Limite atingido', 'Você pode adicionar até 12 fotos no álbum.');
        } else {
          await setAvatarUri(uri);
        }
      }
    },
    [addPhoto, setAvatarUri],
  );

  const pickFromGallery = useCallback(
    async (forAlbum: boolean) => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Ative o acesso à galeria nas configurações.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: !forAlbum,
        aspect: forAlbum ? undefined : [1, 1],
        quality: 0.85,
      });
      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        if (forAlbum) {
          const ok = await addPhoto(uri);
          if (!ok) Alert.alert('Limite atingido', 'Você pode adicionar até 12 fotos no álbum.');
        } else {
          await setAvatarUri(uri);
        }
      }
    },
    [addPhoto, setAvatarUri],
  );

  const showPhotoPicker = (forAlbum: boolean) => {
    const title = forAlbum ? 'Adicionar ao álbum' : 'Foto de perfil';
    const options = ['Tirar foto', 'Escolher da galeria', 'Cancelar'];
    const onSelect = (index: number) => {
      if (index === 0) pickFromCamera(forAlbum);
      if (index === 1) pickFromGallery(forAlbum);
    };

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options, cancelButtonIndex: 2, title },
        onSelect,
      );
    } else {
      Alert.alert(title, 'Escolha uma opção', [
        { text: 'Tirar foto', onPress: () => pickFromCamera(forAlbum) },
        { text: 'Galeria', onPress: () => pickFromGallery(forAlbum) },
        { text: 'Cancelar', style: 'cancel' },
      ]);
    }
  };

  const removePhoto = useProfileStore((s) => s.removePhoto);

  const stats = [
    { label: 'Favoritos', value: favCount, icon: 'heart' as const, tint: colors.error, bg: colors.border },
    { label: 'Adoções', value: MOCK_USER.stats.adoptionsRequested, icon: 'paw' as const, tint: colors.primary, bg: colors.border },
    { label: 'Dicas lidas', value: MOCK_USER.stats.tipsRead, icon: 'book' as const, tint: colors.accent, bg: colors.border },
  ];

  const menu = [
    { label: 'Configurações', icon: 'settings-outline' as const, route: ROUTES.SETTINGS },
    { label: 'Dicas de cuidados', icon: 'bulb-outline' as const, route: ROUTES.CARE_TIPS },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: spacing.xxxl + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.cover, { backgroundColor: colors.primary, paddingTop: insets.top + spacing.lg }]}>
        <View style={[styles.decorCircle, styles.decorCircleL, { backgroundColor: colors.primaryLight }]} />
        <View style={[styles.decorCircle, styles.decorCircleR, { backgroundColor: colors.secondary }]} />

        <View style={styles.coverTop}>
          <Text style={styles.coverTitle}>Meu perfil</Text>
          <View style={[styles.locationChip, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="location-outline" size={14} color="#FFF" />
            <Text style={styles.locationText}>Recife, PE</Text>
          </View>
        </View>

        <View style={styles.avatarSection}>
          <Pressable onPress={() => showPhotoPicker(false)} style={styles.avatarPress}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
            <View style={[styles.cameraBadge, { backgroundColor: colors.accent }]}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: -spacing.xxl, paddingHorizontal: spacing.lg }}>
        <View style={[styles.profileCard, shadows.md, { backgroundColor: colors.surface, borderRadius: radius.xl }]}>
          <Text style={[typography.h2, { color: colors.text, textAlign: 'center' }]}>{MOCK_USER.name}</Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary, textAlign: 'center', marginTop: 4 }]}>
            {MOCK_USER.email}
          </Text>
          <Text
            style={[
              typography.bodySmall,
              {
                color: colors.textMuted,
                textAlign: 'center',
                marginTop: spacing.md,
                lineHeight: 20,
              },
            ]}
          >
            {MOCK_USER.bio}
          </Text>
          <View style={[styles.memberRow, { borderTopColor: colors.border }]}>
            <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              Membro desde {MOCK_USER.memberSince}
            </Text>
          </View>
        </View>

        <View style={[styles.statsRow, { marginTop: spacing.lg, gap: spacing.sm }]}>
          {stats.map((s) => (
            <View
              key={s.label}
              style={[
                styles.statCard,
                shadows.sm,
                { backgroundColor: colors.surface, borderRadius: radius.lg, flex: 1 },
              ]}
            >
              <View style={[styles.statIconWrap, { backgroundColor: s.bg }]}>
                <Ionicons name={s.icon} size={20} color={s.tint} />
              </View>
              <Text style={[typography.h2, { color: colors.text, marginTop: spacing.sm }]}>{s.value}</Text>
              <Text style={[typography.caption, { color: colors.textMuted, textAlign: 'center' }]}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.h3, { color: colors.text }]}>Meu álbum</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              {photos.length}/12 fotos
            </Text>
          </View>
          <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: spacing.md }]}>
            Suas fotos com pets. Toque em adicionar ou segure uma foto para remover.
          </Text>
          <ProfilePhotoGrid
            photos={photos}
            onAdd={() => showPhotoPicker(true)}
            onRemove={removePhoto}
          />
        </View>

        <Text
          style={[
            typography.label,
            { color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
          ]}
        >
          CONTA
        </Text>
        <View style={[styles.menuGroup, shadows.sm, { backgroundColor: colors.surface, borderRadius: radius.lg }]}>
          {menu.map((item, i) => (
            <Pressable
              key={item.route}
              onPress={() => navigation.navigate(item.route)}
              style={({ pressed }) => [
                styles.menuItem,
                i < menu.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                pressed && { opacity: 0.7 },
              ]}
            >
              <View style={[styles.menuIconWrap, { backgroundColor: colors.border }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[typography.body, { color: colors.text, flex: 1 }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <View style={[styles.footerBadge, { backgroundColor: colors.surface, borderRadius: radius.full }]}>
          <Ionicons name="paw" size={14} color={colors.primary} />
          <Text style={[typography.caption, { color: colors.textMuted }]}>PetLove · Projeto acadêmico</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cover: {
    paddingBottom: 56,
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.35,
  },
  decorCircleL: {
    width: 180,
    height: 180,
    top: -40,
    left: -50,
  },
  decorCircleR: {
    width: 140,
    height: 140,
    top: 20,
    right: -30,
  },
  coverTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  coverTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  locationText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatarPress: {
    position: 'relative',
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  cameraBadge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  profileCard: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  menuGroup: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'center',
    marginTop: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
