import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

export type UserCoords = {
  latitude: number;
  longitude: number;
};

export function useUserLocation() {
  const [coords, setCoords] = useState<UserCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão de localização negada.');
        setCoords(null);
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch {
      setError('Não foi possível obter sua localização.');
      setCoords(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { coords, loading, error, refresh };
}
