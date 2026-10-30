export type UserRole = 'superadmin' | 'editor' | 'contributor';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featured_image: string;
  video_url?: string;
  status: PostStatus;
  views_count: number;
  created_at: string;
  published_at?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  iconName: string;
  short_desc: string;
  full_desc: string;
  features: string[];
  image_url?: string;
  video_url?: string;
}

export type InquiryStatus = 'new' | 'in_progress' | 'resolved';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export interface SiteConfig {
  site_name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  social_links: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

export type WakafCategory = 
  | 'Wakaf Pembebasan Lahan'
  | 'Wakaf Pembangunan Gedung'
  | "Wakaf Al-Qur'an & Mushaf"
  | 'Wakaf Produktif & Sarpras'
  | 'Wakaf Operasional Pendidikan';

export type WakafStatus = 'active' | 'completed';

export interface WakafProgram {
  id: string;
  title: string;
  slug: string;
  category: WakafCategory | string;
  short_desc: string;
  full_desc: string;
  flyer_image: string;
  target_amount: number;
  collected_amount: number;
  donaturs_count: number;
  bank_name: string;
  bank_account: string;
  bank_holder: string;
  status: WakafStatus;
  created_at: string;
}
