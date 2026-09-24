import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Filter,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import type { ServiceItem } from '../../types';

export const ServicesPage: React.FC = () => {
  const { services } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const categories = ['Semua', 'Unit Formal', 'Unit Non-Formal'];

  const filteredUnits = services.filter((unit) => {
    const matchesCat = selectedCategory === 'Semua' || unit.category === selectedCategory;
    const matchesSearch = unit.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          unit.short_desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Header Banner */}
      <section style={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ea 45%, #e1f2d3 100%)',
        color: 'var(--text-main)',
        padding: '5rem 0 4rem',
        borderBottom: '3.5px solid var(--color-green)'
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} color="var(--color-orange)" /> Jenjang Pendidikan Terpadu
          </span>
          <h1 style={{ color: 'var(--color-blue)', fontSize: '2.65rem', marginBottom: '1rem', fontWeight: 800 }}>
            Unit Pendidikan Formal & Non-Formal GMQ
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', lineHeight: 1.7 }}>
            Membina setiap rentang usia mulai dari pendidikan dasar anak, santri berasrama tingkat SMP-SMA, hingga kelas talaqqi tajwid untuk masyarakat dewasa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          
          {/* Filter & Search Bar */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '3rem', borderTop: '3px solid var(--color-green)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
              
              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem' }}>
                  <Filter size={15} color="var(--color-green)" /> Kategori Unit:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      background: selectedCategory === cat ? 'var(--color-green)' : '#ffffff',
                      color: selectedCategory === cat ? '#ffffff' : 'var(--text-main)',
                      fontWeight: selectedCategory === cat ? 700 : 500,
                      padding: '0.5rem 1.25rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: selectedCategory === cat ? 'var(--shadow-glow-green)' : 'var(--shadow-sm)',
                      border: selectedCategory === cat ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', width: '300px' }}>
                <Search size={16} color="var(--color-green)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Cari unit atau program tahfidz..."
                  style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* Unit Cards Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            {filteredUnits.map((unit) => (
              <div 
                key={unit.id} 
                className="card" 
                style={{ 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderTop: '5px solid var(--color-green)',
                  background: '#ffffff'
                }}
              >
                {unit.image_url && (
                  <img 
                    src={unit.image_url} 
                    alt={unit.title} 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                )}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span className={`badge ${unit.category === 'Unit Formal' ? 'badge-green' : 'badge-orange'}`}>
                      {unit.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-green-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <GraduationCap size={14} /> Berkelanjutan
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.85rem', color: 'var(--color-blue)', lineHeight: 1.4 }}>
                    {unit.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem', flex: 1 }}>
                    {unit.short_desc}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                      onClick={() => setActiveModal(unit)} 
                      className="btn btn-sm btn-outline"
                    >
                      Brosur & Rincian
                    </button>
                    <Link to="/kontak" className="btn btn-sm btn-primary" style={{ gap: '0.35rem' }}>
                      <span>Daftar Unit</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUnits.length === 0 && (
            <div className="card" style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <BookOpen size={40} color="var(--color-green)" style={{ margin: '0 auto 1rem' }} />
              <p>Tidak ditemukan unit pendidikan yang sesuai dengan pencarian Anda.</p>
              <button onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }} className="btn btn-sm btn-primary" style={{ marginTop: '1rem' }}>
                Tampilkan Semua Unit
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Detail Modal */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 39, 68, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="card" style={{ maxWidth: '680px', width: '100%', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className={`badge ${activeModal.category === 'Unit Formal' ? 'badge-green' : 'badge-orange'}`}>
                {activeModal.category}
              </span>
              <button 
                onClick={() => setActiveModal(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.35rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.45rem', color: 'var(--color-blue)', marginBottom: '1rem' }}>
              {activeModal.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
              {activeModal.full_desc}
            </p>

            <h4 style={{ fontSize: '1rem', color: 'var(--color-blue)', marginBottom: '0.85rem' }}>
              Keunggulan Kurikulum & Layanan:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {activeModal.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="var(--color-green)" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setActiveModal(null)} className="btn btn-outline">
                Kembali
              </button>
              <Link 
                to="/kontak" 
                onClick={() => setActiveModal(null)} 
                className="btn btn-primary"
              >
                Konsultasi Pendaftaran Unit
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
