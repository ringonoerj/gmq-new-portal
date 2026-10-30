import type { Post, ServiceItem, Inquiry, SiteConfig, WakafProgram } from '../types';
import { initialPosts, initialServices, initialInquiries, initialSiteConfig, initialWakafPrograms } from '../data/mockData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  POSTS: 'gmq_portal_posts_v3',
  SERVICES: 'gmq_portal_services_v3',
  INQUIRIES: 'gmq_portal_inquiries_v2',
  CONFIG: 'gmq_portal_config_v2',
  WAKAF: 'gmq_portal_wakaf_v1'
};

// Helper untuk membaca dari localStorage atau inisialisasi dengan mock data awal
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved || saved.includes('unsplash.com')) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error writing to localStorage', err);
  }
}

export const getDataSourceMode = (): 'supabase' | 'mock' => {
  return isSupabaseConfigured ? 'supabase' : 'mock';
};

// ============================================================================
// POSTS / BERITA ADAPTER
// ============================================================================
export const postsApi = {
  async getAll(): Promise<Post[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.warn('Supabase fetch posts error, fallback ke local:', error.message);
        return getLocalItem<Post[]>(STORAGE_KEYS.POSTS, initialPosts);
      }
      return data as Post[];
    }
    return getLocalItem<Post[]>(STORAGE_KEYS.POSTS, initialPosts);
  },

  async getPublished(): Promise<Post[]> {
    const all = await this.getAll();
    return all.filter((p) => p.status === 'published');
  },

  async getBySlug(slug: string): Promise<Post | null> {
    const all = await this.getAll();
    return all.find((p) => p.slug === slug) || null;
  },

  async create(post: Omit<Post, 'id' | 'created_at' | 'views_count'>): Promise<Post> {
    const newPost: Post = {
      ...post,
      id: `post-${Date.now()}`,
      views_count: 0,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('posts').insert(newPost).select().single();
      if (!error && data) return data as Post;
    }

    const current = getLocalItem<Post[]>(STORAGE_KEYS.POSTS, initialPosts);
    const updated = [newPost, ...current];
    setLocalItem(STORAGE_KEYS.POSTS, updated);
    return newPost;
  },

  async update(id: string, updates: Partial<Post>): Promise<Post> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('posts').update(updates).eq('id', id).select().single();
      if (!error && data) return data as Post;
    }

    const current = getLocalItem<Post[]>(STORAGE_KEYS.POSTS, initialPosts);
    let updatedItem: Post | null = null;
    const updated = current.map((p) => {
      if (p.id === id) {
        updatedItem = { ...p, ...updates };
        return updatedItem;
      }
      return p;
    });
    setLocalItem(STORAGE_KEYS.POSTS, updated);
    if (!updatedItem) throw new Error('Post not found');
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (!error) return true;
    }

    const current = getLocalItem<Post[]>(STORAGE_KEYS.POSTS, initialPosts);
    const filtered = current.filter((p) => p.id !== id);
    setLocalItem(STORAGE_KEYS.POSTS, filtered);
    return true;
  }
};

// ============================================================================
// SERVICES / LAYANAN ADAPTER
// ============================================================================
export const servicesApi = {
  async getAll(): Promise<ServiceItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('services').select('*');
      if (!error && data) return data as ServiceItem[];
    }
    return getLocalItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
  },

  async getBySlug(slug: string): Promise<ServiceItem | null> {
    const all = await this.getAll();
    return all.find((s) => s.slug === slug) || null;
  },

  async create(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('services').insert(newService).select().single();
      if (!error && data) return data as ServiceItem;
    }

    const current = getLocalItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
    const updated = [...current, newService];
    setLocalItem(STORAGE_KEYS.SERVICES, updated);
    return newService;
  },

  async update(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    const current = getLocalItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
    let updatedItem: ServiceItem | null = null;
    const updated = current.map((s) => {
      if (s.id === id) {
        updatedItem = { ...s, ...updates };
        return updatedItem;
      }
      return s;
    });
    setLocalItem(STORAGE_KEYS.SERVICES, updated);
    if (!updatedItem) throw new Error('Service not found');
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const current = getLocalItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
    const filtered = current.filter((s) => s.id !== id);
    setLocalItem(STORAGE_KEYS.SERVICES, filtered);
    return true;
  }
};

// ============================================================================
// INQUIRIES / LEADS ADAPTER
// ============================================================================
export const inquiriesApi = {
  async getAll(): Promise<Inquiry[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Inquiry[];
    }
    return getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, initialInquiries);
  },

  async submit(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('inquiries').insert(newInquiry).select().single();
      if (!error && data) return data as Inquiry;
    }

    const current = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, initialInquiries);
    const updated = [newInquiry, ...current];
    setLocalItem(STORAGE_KEYS.INQUIRIES, updated);
    return newInquiry;
  },

  async updateStatus(id: string, status: Inquiry['status']): Promise<Inquiry> {
    const current = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, initialInquiries);
    let updatedItem: Inquiry | null = null;
    const updated = current.map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, status };
        return updatedItem;
      }
      return item;
    });
    setLocalItem(STORAGE_KEYS.INQUIRIES, updated);
    if (!updatedItem) throw new Error('Inquiry not found');
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const current = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, initialInquiries);
    const filtered = current.filter((item) => item.id !== id);
    setLocalItem(STORAGE_KEYS.INQUIRIES, filtered);
    return true;
  }
};

// ============================================================================
// SITE SETTINGS ADAPTER
// ============================================================================
export const siteConfigApi = {
  async get(): Promise<SiteConfig> {
    return getLocalItem<SiteConfig>(STORAGE_KEYS.CONFIG, initialSiteConfig);
  },

  async update(updates: Partial<SiteConfig>): Promise<SiteConfig> {
    const current = getLocalItem<SiteConfig>(STORAGE_KEYS.CONFIG, initialSiteConfig);
    const updated = { ...current, ...updates };
    setLocalItem(STORAGE_KEYS.CONFIG, updated);
    return updated;
  }
};

// ============================================================================
// WAKAF PROGRAMS ADAPTER
// ============================================================================
export const wakafApi = {
  async getAll(): Promise<WakafProgram[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('wakaf_programs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.warn('Supabase fetch wakaf error, fallback ke local:', error.message);
        return getLocalItem<WakafProgram[]>(STORAGE_KEYS.WAKAF, initialWakafPrograms);
      }
      return data as WakafProgram[];
    }
    return getLocalItem<WakafProgram[]>(STORAGE_KEYS.WAKAF, initialWakafPrograms);
  },

  async getActive(): Promise<WakafProgram[]> {
    const all = await this.getAll();
    return all.filter((w) => w.status === 'active');
  },

  async getBySlug(slug: string): Promise<WakafProgram | null> {
    const all = await this.getAll();
    return all.find((w) => w.slug === slug) || null;
  },

  async create(item: Omit<WakafProgram, 'id' | 'created_at'>): Promise<WakafProgram> {
    const newWakaf: WakafProgram = {
      ...item,
      id: 'wkf-' + Date.now(),
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('wakaf_programs')
        .insert([newWakaf])
        .select()
        .single();
      if (!error && data) {
        return data as WakafProgram;
      }
    }

    const current = getLocalItem<WakafProgram[]>(STORAGE_KEYS.WAKAF, initialWakafPrograms);
    const updated = [newWakaf, ...current];
    setLocalItem(STORAGE_KEYS.WAKAF, updated);
    return newWakaf;
  },

  async update(id: string, updates: Partial<WakafProgram>): Promise<WakafProgram> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('wakaf_programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (!error && data) {
        return data as WakafProgram;
      }
    }

    const current = getLocalItem<WakafProgram[]>(STORAGE_KEYS.WAKAF, initialWakafPrograms);
    let targetWakaf: WakafProgram | null = null;
    const updated = current.map((w) => {
      if (w.id === id) {
        targetWakaf = { ...w, ...updates };
        return targetWakaf;
      }
      return w;
    });

    setLocalItem(STORAGE_KEYS.WAKAF, updated);
    if (!targetWakaf) throw new Error('Program wakaf tidak ditemukan');
    return targetWakaf;
  },

  async delete(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('wakaf_programs').delete().eq('id', id);
    }
    const current = getLocalItem<WakafProgram[]>(STORAGE_KEYS.WAKAF, initialWakafPrograms);
    const updated = current.filter((w) => w.id !== id);
    setLocalItem(STORAGE_KEYS.WAKAF, updated);
  }
};
