import { useState, useEffect, useCallback } from 'react';
import type { SiteConfig } from '../types';
import { siteConfigApi } from '../lib/adapter';
import { initialSiteConfig } from '../data/mockData';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await siteConfigApi.get();
      setConfig(data);
    } catch (err) {
      console.error('Failed to load site config:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const updateConfig = async (updates: Partial<SiteConfig>) => {
    const updated = await siteConfigApi.update(updates);
    setConfig(updated);
    return updated;
  };

  return {
    config,
    loading,
    refreshConfig: fetchConfig,
    updateConfig
  };
}
