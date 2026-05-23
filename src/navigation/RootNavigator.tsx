import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from './types';
import { useTheme } from '../theme/ThemeProvider';
import { MainTabNavigator } from './MainTabNavigator';
import PetDetailsScreen from '../screens/PetDetailsScreen';
import AdoptionFormScreen from '../screens/AdoptionFormScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CareTipsScreen from '../screens/CareTipsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabNavigator} />
      <Stack.Screen name={ROUTES.PET_DETAILS} component={PetDetailsScreen} />
      <Stack.Screen name={ROUTES.ADOPTION_FORM} component={AdoptionFormScreen} />
      <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={ROUTES.CARE_TIPS} component={CareTipsScreen} />
    </Stack.Navigator>
  );
}
