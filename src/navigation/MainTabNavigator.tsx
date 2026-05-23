import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '../constants/routes';
import type { MainTabParamList } from './types';
import { useTheme } from '../theme/ThemeProvider';
import HomeScreen from '../screens/HomeScreen';
import PetsListScreen from '../screens/PetsListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_BAR_CONTENT_HEIGHT = 52;

export function MainTabNavigator() {
  const { colors, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const safeBottom = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 0);
  const tabBarHeight = TAB_BAR_CONTENT_HEIGHT + safeBottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: { paddingBottom: tabBarHeight },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: -2,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: tabBarHeight,
          paddingTop: 8,
          paddingBottom: safeBottom + 4,
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          overflow: 'hidden',
          elevation: 12,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        tabBarIcon: ({ color, focused }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            [ROUTES.HOME]: 'home',
            [ROUTES.PETS_LIST]: 'paw',
            [ROUTES.FAVORITES]: 'heart',
            [ROUTES.PROFILE]: 'person',
          };
          return (
            <Ionicons
              name={icons[route.name]}
              size={focused ? 23 : 21}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name={ROUTES.PETS_LIST} component={PetsListScreen} options={{ title: 'Pets' }} />
      <Tab.Screen
        name={ROUTES.FAVORITES}
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
