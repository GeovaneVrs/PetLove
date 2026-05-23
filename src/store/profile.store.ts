import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_USER } from '../data/user';
import { STORAGE_KEYS } from '../constants/storage';

type ProfileState = {
  avatarUri: string;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setAvatarUri: (uri: string) => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set) => ({
  avatarUri: MOCK_USER.avatar,
  hydrated: false,

  hydrate: async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_AVATAR);
    set({
      avatarUri: saved ?? MOCK_USER.avatar,
      hydrated: true,
    });
  },

  setAvatarUri: async (uri) => {
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_AVATAR, uri);
    set({ avatarUri: uri });
  },
}));
