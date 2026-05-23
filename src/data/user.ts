import type { UserProfile } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'user-1',
  name: 'Maria Silva',
  email: 'maria.silva@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  memberSince: '2024',
  bio: 'Apaixonada por animais e voluntária em ONGs de adoção.',
  stats: {
    favorites: 0,
    adoptionsRequested: 2,
    tipsRead: 5,
  },
};
