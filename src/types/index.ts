export type PetCategory = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';

export type PetSize = 'small' | 'medium' | 'large';

export type PetGender = 'male' | 'female';

export interface Pet {
  id: string;
  name: string;
  species: string;
  category: PetCategory;
  age: string;
  size: PetSize;
  gender: PetGender;
  location: string;
  description: string;
  personality: string[];
  images: string[];
  featured: boolean;
  vaccinated: boolean;
  neutered: boolean;
  careTips: string[];
}

export interface Category {
  id: PetCategory | 'all';
  label: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
}

export interface CareTip {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  color: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  bio: string;
  stats: {
    favorites: number;
    adoptionsRequested: number;
    tipsRead: number;
  };
}

export interface AdoptionFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  hasExperience: boolean;
  hasOtherPets: boolean;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
