export const ROUTES = {
  MAIN_TABS: 'MainTabs',
  HOME: 'Home',
  PETS_LIST: 'PetsList',
  FAVORITES: 'Favorites',
  PROFILE: 'Profile',
  PET_DETAILS: 'PetDetails',
  ADOPTION_FORM: 'AdoptionForm',
  SETTINGS: 'Settings',
  CARE_TIPS: 'CareTips',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
