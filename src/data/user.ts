import type { UserProfile } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'user-1',
  name: 'Geovane Silva',
  email: 'geovane.silva@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  memberSince: '2024',
  bio: 'Apaixonado por animais e voluntário em ONGs de adoção.',
  stats: {
    favorites: 0,
    adoptionsRequested: 2,
    tipsRead: 5,
  },
};
