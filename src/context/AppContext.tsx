import React, { createContext, useContext, useEffect } from 'react';
import { useFavoritesStore } from '../store/favorites.store';

type AppContextValue = {
  ready: boolean;
};

const AppContext = createContext<AppContextValue>({ ready: false });

export function AppProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useFavoritesStore((s) => s.hydrate);
  const hydrated = useFavoritesStore((s) => s.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <AppContext.Provider value={{ ready: hydrated }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
