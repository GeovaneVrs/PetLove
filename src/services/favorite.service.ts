import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { apiRequest } from './api.client';

export const favoriteService = {
  async getIds(): Promise<string[]> {
    const res = await apiRequest(async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return raw ? (JSON.parse(raw) as string[]) : [];
    }, { delayMs: 200 });
    return res.data;
  },

  async saveIds(ids: string[]): Promise<void> {
    await apiRequest(async () => {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids));
    }, { delayMs: 150 });
  },
};
