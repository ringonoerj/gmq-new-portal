import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  Sparkles, 
  Briefcase, 
  X, 
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceItem } from '../../types';

interface AdminServicesTabProps {
  services: ServiceItem[];
  onAddService: (service: Omit<ServiceItem, 'id'>) => Promise<ServiceItem>;
  onEditService: (id: string, updates: Partial<ServiceItem>) => Promise<ServiceItem>;
  onRemoveService: (id: string) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const AdminServicesTab: React.FC<AdminServicesTabProps> = ({
  services,
  onAddService,
  onEditService,
  onRemoveService,
  isModalOpen,
  setIsModalOpen
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Unit Formal',
    iconName: 'BookOpen',
    short_desc: '',
    full_desc: '',
    featuresText: '',
    image_url: '',
    video_url: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = ['Semua', 'Unit Formal', 'Unit Non-Formal'];

  const filteredServices = services.filter((s) => {
    const matchCat = categoryFilter === 'Semua' || s.category === categoryFilter;
    const matchQuery = s.title.toLowerCase().includes(search.toLowerCase()) || 
                       s.short_desc.toLowerCase().includes(search.toLowerCase());
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
      slug: editingService ? prev.slug : generateSlug(val)
    }));
  };

  const openCreateModal = () => {
    setEditingService(null);
    setForm({
      title: '',
      slug: '',
      category: 'Unit Formal',
      iconName: 'BookOpen',
      short_desc: '',
      full_desc: '',
      featuresText: 'Target Hafalan 30 Juz Mutqin\nKurikulum Diknas & Diniyyah Terpadu\nPengajar Pemegang Sanad Riwayat Hafs\nAsrama Berkarakter Qur\'ani',
      image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      video_url: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setForm({
      title: service.title,
      slug: service.slug,
      category: service.category,
      iconName: service.iconName,
      short_desc: service.short_desc,
      full_desc: service.full_desc,
      featuresText: service.features.join('\n'),
      image_url: service.image_url || '',
      video_url: service.video_url || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const parsedFeatures = form.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      if (editingService) {
        await onEditService(editingService.id, {
          title: form.title,
          slug: form.slug || generateSlug(form.title),
          category: form.category,
          iconName: form.iconName,
          short_desc: form.short_desc,
          full_desc: form.full_desc,
          features: parsedFeatures,
          image_url: form.image_url || undefined,
          video_url: form.video_url || undefined
        });
        setFeedbackMsg({ type: 'success', text: 'Unit pendidikan berhasil diperbarui!' });
      } else {
        await onAddService({
          title: form.title,
          slug: form.slug || generateSlug(form.title),
          category: form.category,
          iconName: form.iconName,
          short_desc: form.short_desc,
          full_desc: form.full_desc,
          features: parsedFeatures,
          image_url: form.image_url || undefined,
          video_url: form.video_url || undefined
        });
        setFeedbackMsg({ type: 'success', text: 'Unit pendidikan baru berhasil ditambahkan!' });
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Gagal menyimpan unit pendidikan.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus unit "${title}"?`)) {
      await onRemoveService(id);
      setFeedbackMsg({ type: 'success', text: 'Unit pendidikan berhasil dihapus.' });
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  return (
    <div>
      {/* Header and Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', color: 'var(--color-blue)', margin: '0 0 0.35rem', fontWeight: 800 }}>
            Manajemen Unit Pendidikan GMQ
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Kelola jenjang pendidikan formal (Kuttab, Ma'had Boarding) dan program non-formal (Tahsin Dewasa, RTBA, Dauroh Sanad).
          </p>
        </div>

        <button 
          onClick={openCreateModal}
          className="btn btn-gold" 
          style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', fontWeight: 700, gap: '0.5rem' }}
        >
          <PlusCircle size={18} />
          <span>Tambah Unit Baru</span>
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
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--color-green)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Cari nama unit atau kurikulum..." 
            style={{ paddingLeft: '2.4rem', fontSize: '0.875rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
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

      {/* Units Grid Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredServices.map((unit) => (
          <div key={unit.id} className="card card-prestige" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
            {unit.image_url && (
              <img 
                src={unit.image_url} 
                alt={unit.title} 
                style={{ width: '100%', height: '170px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className={`badge ${unit.category === 'Unit Formal' ? 'badge-blue' : 'badge-emerald'}`} style={{ fontSize: '0.75rem' }}>
                  {unit.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Ikon: {unit.iconName}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-blue)', marginBottom: '0.5rem', fontWeight: 800 }}>
                {unit.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
                {unit.short_desc}
              </p>

              {/* Feature pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                {unit.features.slice(0, 3).map((f, idx) => (
                  <span key={idx} style={{ background: '#f1f5f9', color: '#334155', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    ✓ {f}
                  </span>
                ))}
                {unit.features.length > 3 && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                    +{unit.features.length - 3} lainnya
                  </span>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link 
                  to="/layanan" 
                  target="_blank"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', gap: '0.3rem' }}
                >
                  <ExternalLink size={13} />
                  <span>Lihat di Katalog</span>
                </Link>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button 
                    onClick={() => openEditModal(unit)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.35rem 0.6rem', color: 'var(--color-blue)' }}
                    title="Edit Unit"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(unit.id, unit.title)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.35rem 0.6rem', color: '#e11d48', borderColor: 'rgba(225, 29, 72, 0.3)' }}
                    title="Hapus Unit"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Briefcase size={36} color="var(--color-gold)" style={{ margin: '0 auto 0.75rem' }} />
            <p>Tidak ada unit pendidikan yang sesuai filter.</p>
          </div>
        )}
      </div>

      {/* Modal Form Tambah / Edit Unit */}
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
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-xl)',
            borderTop: '6px solid var(--color-gold)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--color-gold)" />
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-blue)', margin: 0, fontWeight: 800 }}>
                  {editingService ? 'Edit Unit Pendidikan' : 'Tambah Unit Pendidikan Baru'}
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
                <label className="form-label">Nama Unit Pendidikan *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="Contoh: Kuttab Tahfidz Griya Mahir Al-Qur'an (Usia 5-12 Thn)"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Kategori Unit *</label>
                  <select 
                    className="form-select"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="Unit Formal">Unit Formal (Sekolah & Boarding)</option>
                    <option value="Unit Non-Formal">Unit Non-Formal (Tahsin, RTBA, Dauroh)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Ikon Tampilan *</label>
                  <select 
                    className="form-select"
                    value={form.iconName}
                    onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                  >
                    <option value="BookOpen">BookOpen (Buku Al-Qur'an)</option>
                    <option value="School">School (Gedung Sekolah / Boarding)</option>
                    <option value="Users">Users (Komunitas / Dewasa)</option>
                    <option value="GraduationCap">GraduationCap (Wisuda / Jenjang)</option>
                    <option value="Award">Award (Sanad / Prestasi)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">URL Foto Unit *</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="https://images.unsplash.com/..."
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Singkat (Ringkasan 1 Paragraf) *</label>
                <textarea 
                  className="form-textarea" 
                  rows={2} 
                  required 
                  placeholder="Deskripsi target santri dan sasaran capaian belajar..."
                  value={form.short_desc}
                  onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Lengkap Kurikulum & Fasilitas *</label>
                <textarea 
                  className="form-textarea" 
                  rows={4} 
                  required 
                  placeholder="Jelaskan metode talaqqi, jadwal harian, asrama mukim, dll..."
                  value={form.full_desc}
                  onChange={(e) => setForm({ ...form, full_desc: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Poin Keunggulan / Fitur (Satu baris per poin) *</label>
                <textarea 
                  className="form-textarea" 
                  rows={4} 
                  required 
                  placeholder="Target Hafalan 30 Juz Mutqin&#10;Bersanad Muttashil&#10;Musyrif Mukim 24 Jam"
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
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
                  {submitting ? 'Sedang Menyimpan...' : editingService ? 'Perbarui Unit' : 'Simpan Unit Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
