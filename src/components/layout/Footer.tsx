import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import logoImg from '../../assets/Logo_YGMQ_Transparan.png';

export const Footer: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <footer style={{ 
      background: '#ffffff', 
      color: 'var(--text-muted)', 
      borderTop: '5px solid var(--color-green)',
      boxShadow: '0 -6px 25px -3px rgba(110, 168, 26, 0.08)',
      marginTop: 'auto'
    }}>
      {/* Upper Footer */}
      <div className="container" style={{ padding: '4.5rem 1.5rem 2.5rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img 
                src={logoImg} 
                alt="Logo Yayasan Griya Mahir Al-Qur'an" 
                style={{ 
                  height: '62px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 6px rgba(110, 168, 26, 0.15))' 
                }} 
              />
              <div>
                <h3 style={{ color: 'var(--color-blue)', fontSize: '1.2rem', margin: 0, letterSpacing: '-0.02em', fontWeight: 800 }}>
                  GRIYA MAHIR AL-QUR'AN
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-green-dark)', fontWeight: 700 }}>
                  Yayasan Pendidikan Al-Qur'an
                </span>
              </div>
            </div>
            
            <p style={{ fontSize: '0.875rem', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {config.tagline}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {config.social_links.linkedin && (
                <a 
                  href={config.social_links.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="YouTube Griya Mahir Al-Quran"
                  style={{
                    background: 'var(--color-green-subtle)',
                    color: 'var(--color-green-dark)',
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {config.social_links.instagram && (
                <a 
                  href={config.social_links.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Instagram GMQ"
                  style={{
                    background: 'var(--color-orange-subtle)',
                    color: '#996e00',
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {config.social_links.facebook && (
                <a 
                  href={config.social_links.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Facebook GMQ"
                  style={{
                    background: 'var(--color-blue-subtle)',
                    color: 'var(--color-blue)',
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: 'var(--color-blue)', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-green)', display: 'inline-block', paddingBottom: '0.25rem' }}>
              Navigasi Utama
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Beranda Yayasan</span>
                </Link>
              </li>
              <li>
                <Link to="/tentang" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Profil & Visi Misi GMQ</span>
                </Link>
              </li>
              <li>
                <Link to="/layanan" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Unit Pendidikan Formal & Non-Formal</span>
                </Link>
              </li>
              <li>
                <Link to="/berita" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Kabar Santri & Info PSB</span>
                </Link>
              </li>
              <li>
                <Link to="/kontak" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Pendaftaran & Infaq Dakwah</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Unit Pendidikan GMQ */}
          <div>
            <h4 style={{ color: 'var(--color-blue)', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-orange)', display: 'inline-block', paddingBottom: '0.25rem' }}>
              Unit Pendidikan
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={15} color="var(--color-green)" />
                <span>Kuttab Tahfidz Qur'an (Formal Dasar)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={15} color="var(--color-green)" />
                <span>Ma'had Tahfidz Boarding (SMP/SMA)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={15} color="var(--color-green)" />
                <span>Griya Tahsin Dewasa & Eksekutif</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={15} color="var(--color-green)" />
                <span>Rumah Tahfidz Balita & Anak (RTBA)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={15} color="var(--color-green)" />
                <span>Dauroh Sanad Matan Al-Jazariyyah</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak Kantor */}
          <div>
            <h4 style={{ color: 'var(--color-blue)', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-green)', display: 'inline-block', paddingBottom: '0.25rem' }}>
              Sekretariat Yayasan
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--color-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{config.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--color-green)" style={{ flexShrink: 0 }} />
                <span>WhatsApp PSB: {config.whatsapp}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Mail size={16} color="var(--color-green)" style={{ flexShrink: 0 }} />
                <span>{config.email}</span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <Link to="/kontak" className="btn btn-sm btn-orange" style={{ gap: '0.4rem', width: '100%', justifyContent: 'center' }}>
                  <Heart size={14} />
                  <span>Infaq & Sedekah Pendidikan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{ 
          borderTop: '1px solid var(--border-subtle)', 
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.825rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} {config.site_name}. Membina Insan Mulia Berakhlak Al-Qur'an.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/admin" style={{ color: 'var(--color-green-dark)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}>
              <span>Akses CMS Asatidz</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
