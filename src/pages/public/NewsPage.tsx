import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  Eye, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';

export const NewsPage: React.FC = () => {
  const { publishedPosts } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', ...Array.from(new Set(publishedPosts.map((p) => p.category)))];

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCat = selectedCategory === 'Semua' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            <Sparkles size={13} color="var(--color-gold)" /> Kabar Santri & Agenda
          </span>
          <h1 style={{ color: 'var(--color-blue)', fontSize: '2.85rem', marginBottom: '1rem', fontWeight: 800 }}>
            Kabar Santri & Wawasan Qur'ani GMQ
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', lineHeight: 1.75 }}>
            Pusat rilis berita resmi Penerimaan Santri Baru (PSB), wisuda tahfidz 30 juz, liputan dauroh sanad, serta tulisan inspiratif pembinaan akhlak Al-Qur'an.
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
                  placeholder="Cari kabar atau artikel..."
                  style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* Articles Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            {filteredPosts.map((post) => (
              <article key={post.id} className="card card-prestige" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
                <Link to={`/berita/${post.slug}`}>
                  <img 
                    src={post.featured_image} 
                    alt={post.title} 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </Link>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span className="badge badge-emerald">{post.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} />
                      {new Date(post.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', marginBottom: '0.85rem', color: 'var(--color-blue)', lineHeight: 1.4, fontWeight: 800 }}>
                    <Link to={`/berita/${post.slug}`} style={{ color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h2>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem', flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={13} /> {post.author}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Eye size={13} /> {post.views_count}
                      </span>
                    </div>

                    <Link to={`/berita/${post.slug}`} style={{ color: 'var(--color-green-dark)', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>Baca Lengkap</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="card" style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <BookOpen size={40} color="var(--color-green)" style={{ margin: '0 auto 1rem' }} />
              <p>Tidak ada tulisan atau agenda yang sesuai dengan pencarian Anda.</p>
              <button onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }} className="btn btn-sm btn-primary" style={{ marginTop: '1rem' }}>
                Tampilkan Semua Kabar
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
