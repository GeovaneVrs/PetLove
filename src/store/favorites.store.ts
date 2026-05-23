import { create } from 'zustand';
import { favoriteService } from '../services/favorite.service';
import { MOCK_PETS } from '../mocks/pets.mock';
import type { Pet } from '../types';

type FavoritesState = {
  ids: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  toggle: (petId: string) => Promise<void>;
  isFavorite: (petId: string) => boolean;
  getFavoritePets: () => Pet[];
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: [],
  hydrated: false,

  hydrate: async () => {
    const ids = await favoriteService.getIds();
    set({ ids, hydrated: true });
  },

  toggle: async (petId) => {
    const current = get().ids;
    const next = current.includes(petId)
      ? current.filter((id) => id !== petId)
      : [...current, petId];
    set({ ids: next });
    await favoriteService.saveIds(next);
  },

  isFavorite: (petId) => get().ids.includes(petId),

  getFavoritePets: () => {
    const { ids } = get();
    return MOCK_PETS.filter((p) => ids.includes(p.id));
  },
}));
