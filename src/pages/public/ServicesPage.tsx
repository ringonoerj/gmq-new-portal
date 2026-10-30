import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Filter, 
  Sparkles,
  BookOpen,
  School,
  Users,
  Award,
  GraduationCap,
  X
} from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import type { ServiceItem } from '../../types';

export const ServicesPage: React.FC = () => {
  const { services } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalUnit, setActiveModalUnit] = useState<ServiceItem | null>(null);

  const categories = ['Semua', 'Unit Formal', 'Unit Non-Formal'];

  const filteredServices = services.filter((unit) => {
    const matchesCat = selectedCategory === 'Semua' || unit.category === selectedCategory;
    const matchesSearch = unit.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          unit.short_desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen size={24} />;
      case 'School': return <School size={24} />;
      case 'Users': return <Users size={24} />;
      case 'Award': return <Award size={24} />;
      case 'GraduationCap': return <GraduationCap size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  return (
    <div>
      {/* Header Banner: Prestigious Emerald & Gold Gradient */}
      <section style={{ 
        background: 'var(--gradient-green-hero)',
        color: 'var(--text-main)',
        padding: '5.5rem 0 4.5rem',
        borderBottom: '4px solid var(--color-green)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} color="var(--color-gold)" /> Jenjang Pembinaan Al-Qur'an
          </span>
          <h1 style={{ color: 'var(--color-blue)', fontSize: '2.85rem', marginBottom: '1rem', fontWeight: 800 }}>
            Unit Pendidikan Formal & Non-Formal GMQ
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', lineHeight: 1.75 }}>
            Pilihan program pendidikan Al-Qur'an yang dirancang berjenjang dan komprehensif, mulai dari usia balita, anak, remaja sekolah berasrama, hingga program tahsin intensif dewasa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          
          {/* Filter & Search Bar */}
          <div className="card card-prestige" style={{ padding: '1.5rem', marginBottom: '3rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
              
              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem' }}>
                  <Filter size={15} color="var(--color-green)" /> Kategori:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      background: selectedCategory === cat ? 'linear-gradient(135deg, var(--color-green) 0%, #558314 100%)' : '#ffffff',
                      color: selectedCategory === cat ? '#ffffff' : 'var(--text-main)',
                      fontWeight: selectedCategory === cat ? 700 : 500,
                      padding: '0.5rem 1.25rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      border: selectedCategory === cat ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                      boxShadow: selectedCategory === cat ? 'var(--shadow-glow-green)' : 'var(--shadow-sm)',
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
                  placeholder="Cari unit atau program..."
                  style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* Units Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            {filteredServices.map((unit) => (
              <div 
                key={unit.id} 
                className="card card-prestige" 
                style={{ 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: '#ffffff'
                }}
              >
                {unit.image_url && (
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={unit.image_url} 
                      alt={unit.title} 
                      style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-blue)',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      {getIcon(unit.iconName)}
                      <span>{unit.category}</span>
                    </div>
                  </div>
                )}

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className={`badge ${unit.category === 'Unit Formal' ? 'badge-blue' : 'badge-emerald'}`} style={{ fontSize: '0.75rem' }}>
                      {unit.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-green-dark)', fontWeight: 700 }}>
                      ✓ Terbuka untuk Pendaftaran
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-blue)', lineHeight: 1.35, fontWeight: 800 }}>
                    {unit.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem', flex: 1 }}>
                    {unit.short_desc}
                  </p>

                  {/* Feature Highlights */}
                  <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-blue)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
                      Keunggulan & Kurikulum:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {unit.features.slice(0, 3).map((feat, idx) => (
                        <span 
                          key={idx}
                          style={{
                            background: 'var(--color-green-subtle)',
                            color: 'var(--color-green-dark)',
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600
                          }}
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      onClick={() => setActiveModalUnit(unit)}
                      className="btn btn-outline" 
                      style={{ flex: 1, fontSize: '0.85rem' }}
                    >
                      Brosur Lengkap
                    </button>
                    <Link 
                      to="/kontak" 
                      className="btn btn-primary" 
                      style={{ flex: 1, fontSize: '0.85rem', gap: '0.35rem', fontWeight: 600 }}
                    >
                      <span>Daftar Unit</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="card" style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <BookOpen size={40} color="var(--color-green)" style={{ margin: '0 auto 1rem' }} />
              <p>Tidak ada unit pendidikan yang sesuai dengan kriteria pencarian Anda.</p>
              <button onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }} className="btn btn-sm btn-primary" style={{ marginTop: '1rem' }}>
                Reset Pencarian
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Modal Detail Brosur Unit */}
      {activeModalUnit && (
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
          <div className="card card-prestige" style={{ maxWidth: '640px', width: '100%', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className={`badge ${activeModalUnit.category === 'Unit Formal' ? 'badge-blue' : 'badge-emerald'}`}>
                {activeModalUnit.category}
              </span>
              <button 
                onClick={() => setActiveModalUnit(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-blue)', marginBottom: '0.75rem', fontWeight: 800 }}>
              {activeModalUnit.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              {activeModalUnit.full_desc}
            </p>

            <h4 style={{ fontSize: '0.95rem', color: 'var(--color-blue)', marginBottom: '0.75rem', fontWeight: 700 }}>
              Rincian Kurikulum & Fasilitas Program:
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {activeModalUnit.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                  <CheckCircle2 size={16} color="var(--color-green)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <button onClick={() => setActiveModalUnit(null)} className="btn btn-outline">
                Tutup
              </button>
              <Link 
                to="/kontak" 
                onClick={() => setActiveModalUnit(null)} 
                className="btn btn-gold"
                style={{ fontWeight: 700 }}
              >
                Daftar Program Ini
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
