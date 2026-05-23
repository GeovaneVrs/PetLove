import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import type { Pet } from '../types';
import type { UserCoords } from '../hooks/useUserLocation';
import { useTheme } from '../theme/ThemeProvider';
import { formatDistance, getDistanceKm } from '../utils/geo';

type Props = {
  pet: Pet;
  userCoords: UserCoords | null;
};

export function PetShelterMap({ pet, userCoords }: Props) {
  const { colors, radius, typography, spacing } = useTheme();

  const distanceLabel =
    userCoords != null
      ? formatDistance(
          getDistanceKm(
            userCoords.latitude,
            userCoords.longitude,
            pet.latitude,
            pet.longitude,
          ),
        )
      : null;

  const region = {
    latitude: pet.latitude,
    longitude: pet.longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  return (
    <View style={[styles.wrap, { borderRadius: radius.lg, overflow: 'hidden' }]}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        showsUserLocation={!!userCoords}
        showsMyLocationButton
      >
        <Marker
          coordinate={{ latitude: pet.latitude, longitude: pet.longitude }}
          title={pet.shelterName}
          description={pet.shelterAddress}
        />
      </MapView>

      <View style={[styles.infoBar, { backgroundColor: colors.surface }]}>
        <Ionicons name="home-outline" size={20} color={colors.primary} />
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={[typography.label, { color: colors.text }]}>{pet.shelterName}</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {pet.shelterAddress}
          </Text>
        </View>
        {distanceLabel ? (
          <View style={[styles.distanceBadge, { backgroundColor: colors.primary + '18' }]}>
            <Ionicons name="navigate-outline" size={14} color={colors.primary} />
            <Text style={[typography.caption, { color: colors.primary, marginLeft: 4 }]}>
              {distanceLabel}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  map: { width: '100%', height: 220 },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
