import React from 'react';
import { 
  FileText, 
  Briefcase, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  PlusCircle,
  ExternalLink,
  MessageCircle,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post, ServiceItem, Inquiry, UserProfile } from '../../types';

interface AdminDashboardTabProps {
  user: UserProfile | null;
  posts: Post[];
  services: ServiceItem[];
  inquiries: Inquiry[];
  newInquiriesCount: number;
  onNavigateTab: (tab: 'posts' | 'services' | 'inquiries' | 'settings') => void;
  onOpenNewPost: () => void;
  onOpenNewService: () => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  user,
  posts,
  services,
  inquiries,
  newInquiriesCount,
  onNavigateTab,
  onOpenNewPost,
  onOpenNewService
}) => {
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.length - publishedCount;
  const recentInquiries = inquiries.slice(0, 5);
  const recentPosts = posts.slice(0, 4);

  return (
    <div>
      {/* Welcome Banner */}
      <div 
        className="card-prestige" 
        style={{ 
          padding: '2rem 2.5rem', 
          background: 'linear-gradient(135deg, #ffffff 0%, #f4fbf0 100%)', 
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-emerald">
              <Sparkles size={13} color="var(--color-gold)" /> CMS Yayasan GMQ Aktif
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Petugas: <strong style={{ color: 'var(--color-blue)' }}>{user?.full_name}</strong> ({user?.role})
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-blue)', margin: '0 0 0.5rem', fontWeight: 800 }}>
            Pusat Kendali Portal Dakwah & Pendidikan
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '680px', lineHeight: 1.6 }}>
            Kelola rilis publikasi kabar santri, pendaftaran santri baru (PSB), kurikulum unit pendidikan formal/non-formal, serta profil kelembagaan Griya Mahir Al-Qur'an.
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={onOpenNewPost} 
            className="btn btn-gold" 
            style={{ padding: '0.7rem 1.25rem', fontSize: '0.875rem', fontWeight: 700, gap: '0.4rem' }}
          >
            <PlusCircle size={16} />
            <span>Tulis Kabar Baru</span>
          </button>
          <button 
            onClick={onOpenNewService} 
            className="btn btn-primary" 
            style={{ padding: '0.7rem 1.25rem', fontSize: '0.875rem', fontWeight: 700, gap: '0.4rem' }}
          >
            <PlusCircle size={16} />
            <span>Tambah Unit</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        
        {/* Stat 1: Total Posts */}
        <div 
          className="card" 
          onClick={() => onNavigateTab('posts')}
          style={{ padding: '1.5rem', borderLeft: '5px solid var(--color-green)', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kabar & Artikel</span>
            <div style={{ background: 'var(--color-green-subtle)', color: 'var(--color-green-dark)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <FileText size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-blue)' }}>
            {posts.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-green-dark)', marginTop: '0.25rem', fontWeight: 600 }}>
            {publishedCount} Tayang • {draftCount} Draf
          </div>
        </div>

        {/* Stat 2: Educational Units */}
        <div 
          className="card" 
          onClick={() => onNavigateTab('services')}
          style={{ padding: '1.5rem', borderLeft: '5px solid var(--color-gold)', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Unit Pendidikan</span>
            <div style={{ background: 'var(--color-gold-subtle)', color: 'var(--color-gold-dark)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-blue)' }}>
            {services.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Formal & Non-Formal Aktif
          </div>
        </div>

        {/* Stat 3: Inquiries / PSB */}
        <div 
          className="card" 
          onClick={() => onNavigateTab('inquiries')}
          style={{ 
            padding: '1.5rem', 
            borderLeft: newInquiriesCount > 0 ? '5px solid #e11d48' : '5px solid var(--color-green)', 
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            background: newInquiriesCount > 0 ? 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)' : '#ffffff'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pendaftaran / PSB</span>
            <div style={{ background: newInquiriesCount > 0 ? 'rgba(225, 29, 72, 0.12)' : 'var(--color-green-subtle)', color: newInquiriesCount > 0 ? '#e11d48' : 'var(--color-green-dark)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <Mail size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-blue)' }}>
            {inquiries.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: newInquiriesCount > 0 ? '#e11d48' : 'var(--color-green-dark)', marginTop: '0.25rem', fontWeight: 700 }}>
            {newInquiriesCount > 0 ? `⚠️ ${newInquiriesCount} Belum Dihubungi` : 'Semua Ditindaklanjuti'}
          </div>
        </div>

        {/* Stat 4: System State */}
        <div 
          className="card" 
          onClick={() => onNavigateTab('settings')}
          style={{ padding: '1.5rem', borderLeft: '5px solid var(--color-blue)', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sistem & Identitas</span>
            <div style={{ background: 'var(--color-blue-subtle)', color: 'var(--color-blue)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-blue)', marginTop: '0.4rem' }}>
            Terpadu & Siap
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.45rem' }}>
            BSI Infaq • WA Ready
          </div>
        </div>

      </div>

      {/* Two Columns: Recent Inquiries & Recent Articles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        
        {/* Recent Inquiries List */}
        <div className="card" style={{ padding: '1.75rem', borderTop: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-blue)', margin: 0, fontWeight: 700 }}>
                Pendaftaran & Konsultasi Terbaru
              </h3>
              <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Permohonan masuk dari calon santri</small>
            </div>
            <button 
              onClick={() => onNavigateTab('inquiries')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.8rem', gap: '0.3rem' }}
            >
              <span>Lihat Semua</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentInquiries.map((inq) => (
              <div 
                key={inq.id}
                style={{ 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  background: inq.status === 'new' ? '#fffbeb' : '#f9fafb',
                  border: inq.status === 'new' ? '1px solid rgba(250, 195, 0, 0.4)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-blue)' }}>{inq.name}</strong>
                    <span className={`badge ${inq.status === 'new' ? 'badge-orange' : inq.status === 'in_progress' ? 'badge-blue' : 'badge-green'}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                      {inq.status === 'new' ? 'Baru' : inq.status === 'in_progress' ? 'Dihubungi' : 'Selesai'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
                    {inq.subject}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {inq.phone} • {new Date(inq.created_at).toLocaleDateString('id-ID')}
                  </div>
                </div>

                {inq.phone && inq.phone !== '-' && (
                  <a 
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalamu'alaikum wr. wb. Bapak/Ibu ${inq.name}, kami dari Panitia PSB Yayasan Griya Mahir Al-Qur'an (GMQ)...`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-gold"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', gap: '0.3rem' }}
                    title="Hubungi via WhatsApp"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            ))}

            {recentInquiries.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Belum ada permohonan pendaftaran baru.
              </div>
            )}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="card" style={{ padding: '1.75rem', borderTop: '4px solid var(--color-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-blue)', margin: 0, fontWeight: 700 }}>
                Kabar Santri Terbaru
              </h3>
              <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Rilis publikasi dakwah di portal</small>
            </div>
            <button 
              onClick={() => onNavigateTab('posts')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.8rem', gap: '0.3rem' }}
            >
              <span>Semua Kabar</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentPosts.map((post) => (
              <div 
                key={post.id}
                style={{ 
                  padding: '0.85rem', 
                  borderRadius: 'var(--radius-md)', 
                  background: '#f9fafb',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: '0.85rem',
                  alignItems: 'center'
                }}
              >
                <img 
                  src={post.featured_image} 
                  alt={post.title} 
                  style={{ width: '64px', height: '52px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: post.status === 'published' ? 'var(--color-green-dark)' : '#b45309', fontWeight: 600 }}>
                      ● {post.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-blue)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {post.title}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(post.created_at).toLocaleDateString('id-ID')} • {post.views_count} kali dibaca
                  </span>
                </div>
                <Link 
                  to={`/berita/${post.slug}`} 
                  target="_blank"
                  style={{ color: 'var(--color-green)', padding: '0.4rem' }}
                  title="Lihat di Web"
                >
                  <ExternalLink size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
