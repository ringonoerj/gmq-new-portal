import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2, 
  Clock, 
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { publishedPosts } = usePosts();

  const post = publishedPosts.find((p) => p.slug === slug);
  const relatedPosts = publishedPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-blue-dark)', marginBottom: '1rem' }}>Artikel Tidak Ditemukan</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Artikel yang Anda tuju mungkin telah dipindahkan atau belum diterbitkan.</p>
        <Link to="/berita" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Kembali ke Pusat Berita</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan artikel berhasil disalin ke clipboard!');
    }
  };

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '5rem' }}>
      
      {/* Top Breadcrumb Header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid var(--border-subtle)', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--color-blue)' }}>Beranda</Link>
          <ChevronRight size={14} />
          <Link to="/berita" style={{ color: 'var(--color-blue)' }}>Berita</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{post.category}</span>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '860px', paddingTop: '3rem' }}>
        
        {/* Article Header */}
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-blue">{post.category}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={13} /> 4 Menit Baca
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-blue-dark)', lineHeight: 1.25, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-blue-dark)', fontWeight: 600 }}>
                <User size={16} color="var(--color-orange)" />
                {post.author}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} />
                {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <button 
              onClick={handleShare}
              className="btn btn-sm btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Share2 size={14} />
              <span>Bagikan</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
          <img 
            src={post.featured_image} 
            alt={post.title}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Article Excerpt Callout */}
        <div style={{ 
          background: 'var(--color-blue-subtle)', 
          borderLeft: '4px solid var(--color-blue)', 
          padding: '1.25rem 1.5rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '2rem',
          fontSize: '1.05rem',
          color: 'var(--color-blue-dark)',
          fontWeight: 500,
          lineHeight: 1.6
        }}>
          {post.excerpt}
        </div>

        {/* Article Body */}
        <article className="card" style={{ padding: '2.5rem', marginBottom: '3.5rem', fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
          <div style={{ whiteSpace: 'pre-line' }}>
            {post.content}
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-blue-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bookmark size={20} color="var(--color-orange)" /> Artikel Terkait Lainnya
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {relatedPosts.map((rel) => (
                <div key={rel.id} className="card" style={{ padding: '1.25rem' }}>
                  <span className="badge badge-green" style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>{rel.category}</span>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                    <Link to={`/berita/${rel.slug}`} style={{ color: 'var(--color-blue-dark)' }}>
                      {rel.title}
                    </Link>
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {rel.excerpt.slice(0, 90)}...
                  </p>
                  <Link to={`/berita/${rel.slug}`} style={{ fontSize: '0.8rem', color: 'var(--color-blue)', fontWeight: 700 }}>
                    Baca Artikel →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
