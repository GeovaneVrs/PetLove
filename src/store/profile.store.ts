import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_USER } from '../data/user';
import { STORAGE_KEYS } from '../constants/storage';

const MAX_PHOTOS = 12;

type ProfileState = {
  avatarUri: string;
  photos: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setAvatarUri: (uri: string) => Promise<void>;
  addPhoto: (uri: string) => Promise<boolean>;
  removePhoto: (uri: string) => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  avatarUri: MOCK_USER.avatar,
  photos: [],
  hydrated: false,

  hydrate: async () => {
    const [savedAvatar, savedPhotos] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.PROFILE_AVATAR),
      AsyncStorage.getItem(STORAGE_KEYS.PROFILE_PHOTOS),
    ]);

    let photos: string[] = [];
    if (savedPhotos) {
      try {
        const parsed = JSON.parse(savedPhotos) as unknown;
        if (Array.isArray(parsed)) {
          photos = parsed.filter((item): item is string => typeof item === 'string');
        }
      } catch {
        photos = [];
      }
    }

    set({
      avatarUri: savedAvatar ?? MOCK_USER.avatar,
      photos,
      hydrated: true,
    });
  },

  setAvatarUri: async (uri) => {
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_AVATAR, uri);
    set({ avatarUri: uri });
  },

  addPhoto: async (uri) => {
    const { photos } = get();
    if (photos.length >= MAX_PHOTOS) return false;

    const next = [...photos, uri];
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_PHOTOS, JSON.stringify(next));
    set({ photos: next });
    return true;
  },

  removePhoto: async (uri) => {
    const next = get().photos.filter((p) => p !== uri);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_PHOTOS, JSON.stringify(next));
    set({ photos: next });
  },
}));
