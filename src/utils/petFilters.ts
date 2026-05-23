import type { Pet, PetCategory } from '../types';

export function filterPets(
  pets: Pet[],
  query: string,
  category: PetCategory | 'all',
): Pet[] {
  const normalized = query.trim().toLowerCase();
  return pets.filter((pet) => {
    const matchesCategory = category === 'all' || pet.category === category;
    const matchesQuery =
      !normalized ||
      pet.name.toLowerCase().includes(normalized) ||
      pet.species.toLowerCase().includes(normalized) ||
      pet.location.toLowerCase().includes(normalized);
    return matchesCategory && matchesQuery;
  });
}
