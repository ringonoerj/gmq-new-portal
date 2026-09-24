import { useState, useEffect, useCallback } from 'react';
import type { ServiceItem } from '../types';
import { servicesApi } from '../lib/adapter';

export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat layanan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const addService = async (service: Omit<ServiceItem, 'id'>) => {
    const created = await servicesApi.create(service);
    setServices((prev) => [...prev, created]);
    return created;
  };

  const editService = async (id: string, updates: Partial<ServiceItem>) => {
    const updated = await servicesApi.update(id, updates);
    setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
  };

  const removeService = async (id: string) => {
    await servicesApi.delete(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    services,
    loading,
    error,
    refreshServices: fetchServices,
    addService,
    editService,
    removeService
  };
}
