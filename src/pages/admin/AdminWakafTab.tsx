import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  HeartHandshake
} from 'lucide-react';
import type { WakafProgram, WakafCategory, WakafStatus } from '../../types';
import defaultFlyer from '../../assets/sample_image_1.jpeg';
import flyer2 from '../../assets/sample_image_2.jpeg';
import flyer3 from '../../assets/sample_image_3.jpeg';
import flyer4 from '../../assets/sample_image_4.jpeg';
import flyer5 from '../../assets/sample_image_5.jpg';

interface AdminWakafTabProps {
  wakafList: WakafProgram[];
  onAddWakaf: (item: Omit<WakafProgram, 'id' | 'created_at'>) => Promise<WakafProgram>;
  onEditWakaf: (id: string, updates: Partial<WakafProgram>) => Promise<WakafProgram>;
  onRemoveWakaf: (id: string) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const AdminWakafTab: React.FC<AdminWakafTabProps> = ({
  wakafList,
  onAddWakaf,
  onEditWakaf,
  onRemoveWakaf,
  isModalOpen,
  setIsModalOpen
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<WakafProgram | null>(null);

  // Form State
  const initialForm = {
    title: '',
    slug: '',
    category: 'Wakaf Pembangunan Gedung' as WakafCategory | string,
    short_desc: '',
    full_desc: '',
    flyer_image: defaultFlyer,
    target_amount: 500000000,
    collected_amount: 0,
    donaturs_count: 0,
    bank_name: 'Bank Syariah Indonesia (BSI)',
    bank_account: '7188 9900 12',
    bank_holder: "Yayasan Griya Mahir Al-Qur'an (Wakaf)",
    status: 'active' as WakafStatus
  };

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Semua Kategori',
    'Wakaf Pembebasan Lahan',
    'Wakaf Pembangunan Gedung',
    "Wakaf Al-Qur'an & Mushaf",
    'Wakaf Produktif & Sarpras',
    'Wakaf Operasional Pendidikan'
  ];

  const flyerPresets = [
    { label: 'Gedung / Kampus', img: defaultFlyer },
    { label: 'Asrama Santri', img: flyer2 },
    { label: 'Mushaf Al-Qur\'an', img: flyer3 },
    { label: 'Kemandirian / Depot', img: flyer4 },
    { label: 'Dauroh & Guru', img: flyer5 }
  ];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: WakafProgram) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      slug: item.slug,
      category: item.category,
      short_desc: item.short_desc,
      full_desc: item.full_desc,
      flyer_image: item.flyer_image,
      target_amount: item.target_amount,
      collected_amount: item.collected_amount,
      donaturs_count: item.donaturs_count,
      bank_name: item.bank_name,
      bank_account: item.bank_account,
      bank_holder: item.bank_holder,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleAutoSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setForm((prev) => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await onEditWakaf(editingItem.id, form);
      } else {
        await onAddWakaf(form);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Gagal menyimpan program wakaf: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (item: WakafProgram) => {
    const newStatus: WakafStatus = item.status === 'active' ? 'completed' : 'active';
    try {
      await onEditWakaf(item.id, { status: newStatus });
    } catch (err) {
      alert('Gagal mengubah status: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Yakin ingin menghapus program wakaf "${title}"?`)) {
      try {
        await onRemoveWakaf(id);
      } catch (err) {
        alert('Gagal menghapus: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
    }
  };

  const filtered = wakafList.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.short_desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalCollectedAll = wakafList.reduce((acc, curr) => acc + curr.collected_amount, 0);
  const totalWakifAll = wakafList.reduce((acc, curr) => acc + curr.donaturs_count, 0);

  return (
    <div>
      {/* Top Banner KPI Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-slate)', fontWeight: 600 }}>Total Program Wakaf</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-green-dark)', marginTop: '4px' }}>
            {wakafList.length} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-slate)' }}>Program</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-slate)', fontWeight: 600 }}>Total Dana Wakaf Terhimpun</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-blue)', marginTop: '4px' }}>
            Rp {totalCollectedAll.toLocaleString('id-ID')}
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-slate)', fontWeight: 600 }}>Total Donatur Wakif</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-gold-dark)', marginTop: '4px' }}>
            {totalWakifAll.toLocaleString('id-ID')} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-slate)' }}>Muhsinin</span>
          </div>
        </div>
      </div>

      {/* Control Header & Add Button */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        border: '1px solid var(--border-subtle)',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1, maxWidth: '600px' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate)' }} />
            <input
              type="text"
              placeholder="Cari program wakaf..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem 0.55rem 2.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              outline: 'none',
              background: '#ffffff',
              color: 'var(--color-blue)',
              cursor: 'pointer'
            }}
          >
            <option value="all">Semua Kategori</option>
            {categories.filter(c => c !== 'Semua Kategori').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Add Wakaf Button */}
        <button
          onClick={handleOpenAdd}
          className="btn btn-gold"
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, padding: '0.6rem 1.25rem' }}
        >
          <PlusCircle size={18} />
          <span>Tambah Program Wakaf Baru</span>
        </button>
      </div>

      {/* Program Wakaf Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', color: 'var(--color-blue)', fontWeight: 700 }}>
              <tr>
                <th style={{ padding: '0.85rem 1rem' }}>Flyer</th>
                <th style={{ padding: '0.85rem 1rem' }}>Judul Program</th>
                <th style={{ padding: '0.85rem 1rem' }}>Kategori</th>
                <th style={{ padding: '0.85rem 1rem' }}>Progres Donasi</th>
                <th style={{ padding: '0.85rem 1rem' }}>Wakif</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const percent = Math.min(100, Math.round((item.collected_amount / item.target_amount) * 100));

                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <img 
                        src={item.flyer_image} 
                        alt={item.title} 
                        style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                      />
                    </td>
                    <td style={{ padding: '0.85rem 1rem', maxWidth: '280px' }}>
                      <strong style={{ color: 'var(--color-green-dark)', display: 'block', lineHeight: 1.3 }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
                        Slug: /{item.slug}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        background: 'var(--color-green-subtle)',
                        color: 'var(--color-green-dark)',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)'
                      }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', minWidth: '180px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-green-dark)' }}>{percent}%</span>
                        <span style={{ color: 'var(--color-slate)' }}>Rp {item.target_amount.toLocaleString('id-ID')}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${percent}%`, height: '100%', background: 'var(--color-green)' }} />
                      </div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--color-slate)', marginTop: '2px', display: 'block' }}>
                        Terkumpul: <strong>Rp {item.collected_amount.toLocaleString('id-ID')}</strong>
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--color-blue)' }}>
                      {item.donaturs_count} Wakif
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <button
                        onClick={() => handleToggleStatus(item)}
                        style={{
                          background: item.status === 'active' ? '#ecfdf5' : '#f1f5f9',
                          color: item.status === 'active' ? '#047857' : '#64748b',
                          border: item.status === 'active' ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {item.status === 'active' ? '● Berjalan' : '✓ Selesai'}
                      </button>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.45rem' }}>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Program Wakaf"
                          style={{
                            background: '#f8fafc',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--color-blue)',
                            padding: '0.4rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          title="Hapus Program Wakaf"
                          style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '0.4rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================================
          MODAL FORM: TAMBAH / EDIT PROGRAM WAKAF (SUPERADMIN)
          ===================================================================== */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          padding: '1.25rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            border: '2px solid var(--color-green)'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'var(--gradient-green-hero)',
              color: '#ffffff',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px solid var(--color-gold)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HeartHandshake size={20} color="var(--color-gold)" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                  {editingItem ? 'Edit Program Wakaf' : 'Tambah Program Wakaf Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                
                {/* Judul Program */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                    Judul Program Wakaf *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Wakaf Pembebasan Lahan Pesantren Tahfidz 2.500 m²"
                    value={form.title}
                    onChange={(e) => handleAutoSlug(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Slug & Kategori */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="pembebasan-lahan-tahfidz"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                      Kategori Wakaf *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        outline: 'none',
                        background: '#ffffff'
                      }}
                    >
                      {categories.filter(c => c !== 'Semua Kategori').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Flyer Image Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                    Flyer / Foto Dokumentasi Program *
                  </label>
                  
                  {/* Presets */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    {flyerPresets.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setForm({ ...form, flyer_image: preset.img })}
                        style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          border: form.flyer_image === preset.img ? '2px solid var(--color-green)' : '1px solid var(--border-subtle)',
                          background: form.flyer_image === preset.img ? 'var(--color-green-subtle)' : '#ffffff',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: form.flyer_image === preset.img ? 700 : 500
                        }}
                      >
                        ✓ {preset.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="URL gambar flyer atau pilih preset di atas..."
                    value={form.flyer_image}
                    onChange={(e) => setForm({ ...form, flyer_image: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Target Dana & Dana Terkumpul & Wakif */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                      Target Dana (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      value={form.target_amount}
                      onChange={(e) => setForm({ ...form, target_amount: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                      Dana Terkumpul (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      value={form.collected_amount}
                      onChange={(e) => setForm({ ...form, collected_amount: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                      Jumlah Wakif (Org)
                    </label>
                    <input
                      type="number"
                      value={form.donaturs_count}
                      onChange={(e) => setForm({ ...form, donaturs_count: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Deskripsi Singkat */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                    Deskripsi Ringkas (Tampil di Kartu) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Penjelasan 1-2 kalimat untuk kartu program..."
                    value={form.short_desc}
                    onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Deskripsi Lengkap */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                    Deskripsi Lengkap (Tampil di Modal "Info Wakaf") *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Jelaskan latar belakang, rencana anggaran, peruntukan wakaf, dan keutamaan pahala jariyahnya..."
                    value={form.full_desc}
                    onChange={(e) => setForm({ ...form, full_desc: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Bank Account Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                      Bank Tujuan Wakaf
                    </label>
                    <input
                      type="text"
                      value={form.bank_name}
                      onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                      No. Rekening
                    </label>
                    <input
                      type="text"
                      value={form.bank_account}
                      onChange={(e) => setForm({ ...form, bank_account: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Status Toggle */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                    Status Program
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as WakafStatus })}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    <option value="active">Sedang Berjalan (Active)</option>
                    <option value="completed">Tercapai / Selesai (Completed)</option>
                  </select>
                </div>

              </div>

              {/* Modal Actions */}
              <div style={{
                padding: '1rem 1.5rem',
                background: '#f8fafc',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem'
              }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gold"
                  style={{ fontWeight: 800 }}
                >
                  {isSubmitting ? 'Menyimpan...' : (editingItem ? 'Simpan Perubahan' : 'Terbitkan Program Wakaf')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
