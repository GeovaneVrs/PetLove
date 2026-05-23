import { useCallback, useEffect, useState } from 'react';
import { petService } from '../services/pet.service';
import type { Pet, PetCategory } from '../types';

export function useInfinitePets(query: string, category: PetCategory | 'all') {
  const [pets, setPets] = useState<Pet[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadPage = useCallback(
    async (pageIndex: number, reset = false) => {
      setLoading(true);
      try {
        const result = await petService.getPaginated(pageIndex, query, category);
        setPets((prev) => (reset ? result.items : [...prev, ...result.items]));
        setHasMore(result.hasMore);
        setPage(pageIndex);
      } finally {
        setLoading(false);
        setInitialLoading(false);
        setRefreshing(false);
      }
    },
    [query, category],
  );

  useEffect(() => {
    setInitialLoading(true);
    setPage(0);
    loadPage(0, true);
  }, [query, category, loadPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    loadPage(page + 1);
  }, [loading, hasMore, page, loadPage]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    loadPage(0, true);
  }, [loadPage]);

  return {
    pets,
    loading,
    initialLoading,
    refreshing,
    hasMore,
    loadMore,
    refresh,
  };
}
