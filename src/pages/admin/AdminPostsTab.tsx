import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  ExternalLink,
  Sparkles,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post } from '../../types';

interface AdminPostsTabProps {
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'created_at' | 'views_count'>) => Promise<Post>;
  onEditPost: (id: string, updates: Partial<Post>) => Promise<Post>;
  onRemovePost: (id: string) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const AdminPostsTab: React.FC<AdminPostsTabProps> = ({
  posts,
  onAddPost,
  onEditPost,
  onRemovePost,
  isModalOpen,
  setIsModalOpen
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Penerimaan Santri (PSB)',
    author: 'Humas YGMQ',
    excerpt: '',
    content: '',
    featured_image: '',
    video_url: '',
    status: 'published' as 'published' | 'draft'
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = ['Semua', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((p) => {
    const matchCat = categoryFilter === 'Semua' || p.category === categoryFilter;
    const matchQuery = p.title.toLowerCase().includes(search.toLowerCase()) || 
                       p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                       p.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: editingPost ? prev.slug : generateSlug(val)
    }));
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setForm({
      title: '',
      slug: '',
      category: 'Penerimaan Santri (PSB)',
      author: 'Humas YGMQ',
      excerpt: '',
      content: '',
      featured_image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
      video_url: '',
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      video_url: post.video_url || '',
      status: post.status === 'archived' ? 'draft' : post.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingPost) {
        await onEditPost(editingPost.id, {
          title: form.title,
          slug: form.slug || generateSlug(form.title),
          category: form.category,
          author: form.author,
          excerpt: form.excerpt,
          content: form.content,
          featured_image: form.featured_image,
          video_url: form.video_url || undefined,
          status: form.status
        });
        setFeedbackMsg({ type: 'success', text: 'Kabar santri berhasil diperbarui!' });
      } else {
        await onAddPost({
          title: form.title,
          slug: form.slug || generateSlug(form.title),
          category: form.category,
          author: form.author,
          excerpt: form.excerpt,
          content: form.content,
          featured_image: form.featured_image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
          video_url: form.video_url || undefined,
          status: form.status,
          published_at: new Date().toISOString()
        });
        setFeedbackMsg({ type: 'success', text: 'Kabar santri baru berhasil diterbitkan!' });
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Terjadi kesalahan saat menyimpan kabar.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (post: Post) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    await onEditPost(post.id, { status: nextStatus });
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus artikel "${title}"?`)) {
      await onRemovePost(id);
      setFeedbackMsg({ type: 'success', text: 'Artikel berhasil dihapus.' });
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  return (
    <div>
      {/* Header and Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', color: 'var(--color-blue)', margin: '0 0 0.35rem', fontWeight: 800 }}>
            Manajemen Kabar & Wawasan Santri
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Publikasikan pengumuman PSB, liputan wisuda tahfidz, modul ilmu Al-Qur'an, dan kegiatan dakwah yayasan.
          </p>
        </div>

        <button 
          onClick={openCreateModal}
          className="btn btn-gold" 
          style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', fontWeight: 700, gap: '0.5rem' }}
        >
          <PlusCircle size={18} />
          <span>Tulis Kabar Baru</span>
        </button>
      </div>

      {feedbackMsg && (
        <div style={{ 
          background: feedbackMsg.type === 'success' ? 'var(--color-green-subtle)' : '#fee2e2', 
          border: `1px solid ${feedbackMsg.type === 'success' ? 'var(--color-green)' : '#f87171'}`,
          color: feedbackMsg.type === 'success' ? 'var(--color-green-dark)' : '#991b1b',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          {feedbackMsg.text}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--color-green)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Cari judul, penulis, atau isi..." 
            style={{ paddingLeft: '2.4rem', fontSize: '0.875rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                background: categoryFilter === cat ? 'var(--color-green)' : '#ffffff',
                color: categoryFilter === cat ? '#ffffff' : 'var(--text-main)',
                fontSize: '0.8rem',
                fontWeight: categoryFilter === cat ? 700 : 500,
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: categoryFilter === cat ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Artikel / Kabar</th>
                <th style={{ padding: '1rem 1.25rem' }}>Kategori</th>
                <th style={{ padding: '1rem 1.25rem' }}>Penulis</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem' }}>Tanggal</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}>
                  
                  {/* Article Title & Thumbnail */}
                  <td style={{ padding: '1rem 1.25rem', minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img 
                        src={post.featured_image} 
                        alt={post.title} 
                        style={{ width: '56px', height: '44px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--color-blue)', fontSize: '0.925rem', marginBottom: '0.2rem' }}>
                          {post.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          slug: /{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      {post.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                    {post.author}
                  </td>

                  {/* Status Toggle */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <button 
                      onClick={() => handleToggleStatus(post)}
                      className={`badge ${post.status === 'published' ? 'badge-green' : 'badge-orange'}`}
                      style={{ cursor: 'pointer', border: 'none', fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                      title="Klik untuk ubah status"
                    >
                      ● {post.status === 'published' ? 'Tayang (Publish)' : 'Draf'}
                    </button>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                      <Link 
                        to={`/berita/${post.slug}`} 
                        target="_blank"
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="Lihat Pratinjau Publik"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <button 
                        onClick={() => openEditModal(post)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: 'var(--color-blue)' }}
                        title="Edit Artikel"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id, post.title)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: '#e11d48', borderColor: 'rgba(225, 29, 72, 0.3)' }}
                        title="Hapus Artikel"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <FileText size={36} color="var(--color-green)" style={{ margin: '0 auto 0.75rem' }} />
                    <p style={{ margin: 0 }}>Tidak ada artikel yang sesuai kriteria pencarian.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah / Edit Berita */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 30, 45, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '720px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-xl)',
            borderTop: '6px solid var(--color-green)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--color-gold)" />
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-blue)', margin: 0, fontWeight: 800 }}>
                  {editingPost ? 'Edit Kabar Santri' : 'Tulis Kabar Santri Baru'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Judul Kabar / Artikel *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="Contoh: Pembukaan PSB Gelombang II Kuttab Tahfidz GMQ"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Slug URL *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="pembukaan-psb-gelombang-2"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Kategori *</label>
                  <select 
                    className="form-select"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="Penerimaan Santri (PSB)">Penerimaan Santri (PSB)</option>
                    <option value="Prestasi & Tahfidz">Prestasi & Tahfidz</option>
                    <option value="Dauroh & Sanad">Dauroh & Sanad</option>
                    <option value="Wawasan Qur'ani">Wawasan Qur'ani</option>
                    <option value="Agenda Dakwah">Agenda Dakwah</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Penulis (Author) *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="Humas YGMQ / Ustadz Fulan"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Status Tayang *</label>
                  <select 
                    className="form-select"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'published' | 'draft' })}
                  >
                    <option value="published">Tayangkan Langsung (Published)</option>
                    <option value="draft">Simpan Sebagai Draf (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">URL Cover Gambar *</label>
                <input 
                  type="url" 
                  className="form-input" 
                  required 
                  placeholder="https://images.unsplash.com/..."
                  value={form.featured_image}
                  onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL Video (Opsional - YouTube Embed / MP4)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="https://www.youtube.com/embed/..."
                  value={form.video_url}
                  onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ringkasan Singkat (Excerpt) *</label>
                <textarea 
                  className="form-textarea" 
                  rows={2} 
                  required 
                  placeholder="Ringkasan 1-2 kalimat pengantar artikel..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Isi Lengkap Artikel *</label>
                <textarea 
                  className="form-textarea" 
                  rows={8} 
                  required 
                  placeholder="Tuliskan berita lengkap, agenda, syarat pendaftaran, atau tausiyah santri..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="btn btn-gold"
                  style={{ fontWeight: 700 }}
                >
                  {submitting ? 'Sedang Menyimpan...' : editingPost ? 'Perbarui Kabar' : 'Terbitkan Kabar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
