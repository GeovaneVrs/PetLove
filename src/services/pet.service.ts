import { MOCK_PETS } from '../mocks/pets.mock';
import { PAGINATION } from '../constants/app';
import { filterPets } from '../utils/petFilters';
import type { Pet, PetCategory } from '../types';
import { apiRequest } from './api.client';

export const petService = {
  async getAll(): Promise<Pet[]> {
    const res = await apiRequest(() => [...MOCK_PETS]);
    return res.data;
  },

  async getById(id: string): Promise<Pet | undefined> {
    const res = await apiRequest(() => MOCK_PETS.find((p) => p.id === id));
    return res.data;
  },

  async getFeatured(): Promise<Pet[]> {
    const res = await apiRequest(() => MOCK_PETS.filter((p) => p.featured).slice(0, 6));
    return res.data;
  },

  async search(query: string, category: PetCategory | 'all' = 'all'): Promise<Pet[]> {
    const res = await apiRequest(() => filterPets(MOCK_PETS, query, category));
    return res.data;
  },

  async getPaginated(
    page: number,
    query = '',
    category: PetCategory | 'all' = 'all',
  ): Promise<{ items: Pet[]; hasMore: boolean }> {
    const res = await apiRequest(
      () => {
        const filtered = filterPets(MOCK_PETS, query, category);
        const start = page * PAGINATION.PAGE_SIZE;
        const end = start + PAGINATION.PAGE_SIZE;
        return {
          items: filtered.slice(start, end),
          hasMore: end < filtered.length,
        };
      },
      { delayMs: PAGINATION.LOAD_DELAY_MS },
    );
    return res.data;
  },
};
