import { useState, useEffect, useCallback } from 'react';
import type { Inquiry, InquiryStatus } from '../types';
import { inquiriesApi } from '../lib/adapter';

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inquiriesApi.getAll();
      setInquiries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat pesan masuk');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const submitInquiry = async (inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>) => {
    const created = await inquiriesApi.submit(inquiry);
    setInquiries((prev) => [created, ...prev]);
    return created;
  };

  const changeStatus = async (id: string, status: InquiryStatus) => {
    const updated = await inquiriesApi.updateStatus(id, status);
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? updated : inq)));
    return updated;
  };

  const removeInquiry = async (id: string) => {
    await inquiriesApi.delete(id);
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  return {
    inquiries,
    newCount: inquiries.filter((i) => i.status === 'new').length,
    loading,
    error,
    refreshInquiries: fetchInquiries,
    submitInquiry,
    changeStatus,
    removeInquiry
  };
}
