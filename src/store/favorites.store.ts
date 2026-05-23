import { create } from 'zustand';
import { favoriteService } from '../services/favorite.service';

type FavoritesState = {
  ids: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  toggle: (petId: string) => Promise<void>;
  isFavorite: (petId: string) => boolean;
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
}));
