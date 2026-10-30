import React, { useState } from 'react';
import { 
  Save, 
  Sparkles, 
  MapPin, 
  Share2, 
  CheckCircle2
} from 'lucide-react';
import type { SiteConfig } from '../../types';

interface AdminSettingsTabProps {
  config: SiteConfig;
  onUpdateConfig: (updates: Partial<SiteConfig>) => Promise<SiteConfig>;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  config,
  onUpdateConfig
}) => {
  const [form, setForm] = useState<SiteConfig>({
    site_name: config.site_name,
    tagline: config.tagline,
    description: config.description,
    phone: config.phone,
    email: config.email,
    address: config.address,
    whatsapp: config.whatsapp,
    social_links: {
      instagram: config.social_links?.instagram || '',
      facebook: config.social_links?.facebook || '',
      linkedin: config.social_links?.linkedin || ''
    }
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onUpdateConfig(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '820px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.65rem', color: 'var(--color-blue)', margin: '0 0 0.35rem', fontWeight: 800 }}>
          Pengaturan Situs & Identitas Yayasan
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Perbarui informasi kontak sekretariat, jam operasional, tautan media sosial dakwah, dan informasi pendaftaran santri baru.
        </p>
      </div>

      {success && (
        <div style={{ 
          background: 'var(--color-green-subtle)', 
          border: '1px solid var(--color-green)', 
          color: 'var(--color-green-dark)', 
          padding: '1rem 1.25rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          <span>Pengaturan portal yayasan berhasil disimpan dan langsung diterapkan ke seluruh halaman!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Section 1: Profil Lembaga */}
        <div className="card card-prestige" style={{ padding: '2rem', marginBottom: '2rem', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-blue)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <Sparkles size={18} color="var(--color-gold)" /> Profil Lembaga & Tagline
          </h3>

          <div className="form-group">
            <label className="form-label">Nama Resmi Lembaga / Yayasan *</label>
            <input 
              type="text" 
              className="form-input" 
              required 
              value={form.site_name}
              onChange={(e) => setForm({ ...form, site_name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tagline Utama *</label>
            <input 
              type="text" 
              className="form-input" 
              required 
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi Singkat Yayasan (Meta / Header) *</label>
            <textarea 
              className="form-textarea" 
              rows={3} 
              required 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        {/* Section 2: Kontak & Sekretariat */}
        <div className="card card-prestige" style={{ padding: '2rem', marginBottom: '2rem', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-blue)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <MapPin size={18} color="var(--color-green)" /> Kontak & Alamat Sekretariat
          </h3>

          <div className="form-group">
            <label className="form-label">Alamat Lengkap Kantor Yayasan *</label>
            <textarea 
              className="form-textarea" 
              rows={2} 
              required 
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Nomor WhatsApp Resmi PSB *</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="+62 812-3456-7890"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nomor Telepon Kantor *</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="(021) 1234-5678"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Sekretariat *</label>
              <input 
                type="email" 
                className="form-input" 
                required 
                placeholder="sekretariat@gmq.co.id"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Media Sosial & Infaq */}
        <div className="card card-prestige" style={{ padding: '2rem', marginBottom: '2.5rem', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-blue)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <Share2 size={18} color="var(--color-blue)" /> Kanal Dakwah & Media Sosial
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">URL Instagram Dakwah</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="https://instagram.com/griyamahir.quran"
                value={form.social_links.instagram || ''}
                onChange={(e) => setForm({ 
                  ...form, 
                  social_links: { ...form.social_links, instagram: e.target.value } 
                })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">URL Facebook Fanspage</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="https://facebook.com/griyamahir.quran"
                value={form.social_links.facebook || ''}
                onChange={(e) => setForm({ 
                  ...form, 
                  social_links: { ...form.social_links, facebook: e.target.value } 
                })}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            disabled={saving} 
            className="btn btn-gold" 
            style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 700, gap: '0.5rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Menyimpan Perubahan...' : 'Simpan Pengaturan Portal'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
