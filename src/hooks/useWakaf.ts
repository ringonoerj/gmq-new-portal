import { useState, useEffect, useCallback } from 'react';
import type { WakafProgram } from '../types';
import { wakafApi } from '../lib/adapter';

export function useWakaf() {
  const [wakafList, setWakafList] = useState<WakafProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWakaf = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await wakafApi.getAll();
      setWakafList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat program wakaf');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWakaf();
  }, [fetchWakaf]);

  const addWakaf = async (item: Omit<WakafProgram, 'id' | 'created_at'>) => {
    const created = await wakafApi.create(item);
    setWakafList((prev) => [created, ...prev]);
    return created;
  };

  const editWakaf = async (id: string, updates: Partial<WakafProgram>) => {
    const updated = await wakafApi.update(id, updates);
    setWakafList((prev) => prev.map((w) => (w.id === id ? updated : w)));
    return updated;
  };

  const removeWakaf = async (id: string) => {
    await wakafApi.delete(id);
    setWakafList((prev) => prev.filter((w) => w.id !== id));
  };

  return {
    wakafList,
    loading,
    error,
    refreshWakaf: fetchWakaf,
    addWakaf,
    editWakaf,
    removeWakaf
  };
}
