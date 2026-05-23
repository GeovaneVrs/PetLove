import type { NavigatorScreenParams } from '@react-navigation/native';
import { ROUTES } from '../constants/routes';

export type MainTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.PETS_LIST]: { query?: string; category?: string } | undefined;
  [ROUTES.FAVORITES]: undefined;
  [ROUTES.PROFILE]: undefined;
};

export type RootStackParamList = {
  [ROUTES.MAIN_TABS]: NavigatorScreenParams<MainTabParamList>;
  [ROUTES.PET_DETAILS]: { petId: string };
  [ROUTES.ADOPTION_FORM]: { petId: string; petName: string };
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.CARE_TIPS]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
