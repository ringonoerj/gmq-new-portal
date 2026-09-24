import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  Lock, 
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import logoImg from '../../assets/Logo_YGMQ_Transparan.png';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { config } = useSiteConfig();

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Tentang Yayasan', path: '/tentang' },
    { label: 'Unit Pendidikan', path: '/layanan' },
    { label: 'Kabar & Agenda', path: '/berita' },
    { label: 'Kontak & Lokasi', path: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Notification Strip: Lush Green Accent with Hadith / Tagline */}
      <div style={{ 
        background: 'var(--color-green-subtle)', 
        color: 'var(--color-green-dark)', 
        fontSize: '0.75rem', 
        padding: '0.45rem 0',
        borderBottom: '1px solid var(--color-green-border)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-green-dark)', fontWeight: 600 }}>
              <Phone size={13} color="var(--color-green)" />
              Sekretariat: <strong>{config.phone}</strong>
            </span>
            <span style={{ display: 'none', color: 'var(--text-muted)' }} className="hide-on-mobile">
              {config.email}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'var(--color-green-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={12} color="var(--color-orange)" />
              <em>"Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya"</em>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar: Luminous Crisp White with Double Green Highlights */}
      <nav style={{ 
        background: '#ffffff', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        boxShadow: '0 4px 20px -2px rgba(110, 168, 26, 0.12)',
        borderBottom: '3.5px solid var(--color-green)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '74px' }}>
          
          {/* Brand Logo with Official YGMQ Transparan Image */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <img 
              src={logoImg} 
              alt="Logo Yayasan Griya Mahir Al-Qur'an" 
              style={{ 
                height: '56px', 
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(110, 168, 26, 0.2))'
              }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-blue)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  GRIYA MAHIR
                </span>
                <span style={{ 
                  background: 'var(--color-green)', 
                  color: '#ffffff', 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  padding: '0.15rem 0.5rem', 
                  borderRadius: 'var(--radius-full)'
                }}>
                  AL-QUR'AN
                </span>
              </div>
              <span style={{ fontSize: '0.725rem', color: 'var(--color-green-dark)', display: 'block', marginTop: '2px', fontWeight: 600 }}>
                Yayasan Pendidikan Al-Qur'an Formal & Non-Formal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="desktop-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive(link.path) ? 'var(--color-green-dark)' : 'var(--color-blue)',
                  fontWeight: isActive(link.path) ? 700 : 600,
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive(link.path) ? 'var(--color-green-subtle)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  borderBottom: isActive(link.path) ? '2px solid var(--color-green)' : '2px solid transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action CTAs: Pendaftaran PSB & Admin Portal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }} className="desktop-menu">
            <Link 
              to="/kontak" 
              className="btn btn-sm btn-orange"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
            >
              <Heart size={13} />
              <span>Daftar / Infaq</span>
            </Link>

            <Link 
              to="/admin" 
              className="btn btn-sm btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Lock size={13} />
              <span>{isAuthenticated ? `CMS: ${user?.full_name?.split(' ')[0]}` : 'Portal Asatidz'}</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu Navigasi"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-green-dark)',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'none'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu (Clean White & Green) */}
        {mobileMenuOpen && (
          <div style={{
            background: '#ffffff',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: isActive(link.path) ? 'var(--color-green)' : 'var(--color-blue)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '0.65rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <span>{link.label}</span>
                <ChevronRight size={16} />
              </Link>
            ))}
            <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link
                to="/kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-orange"
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <Heart size={15} />
                <span>Pendaftaran Santri Baru (PSB)</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <Lock size={15} />
                <span>{isAuthenticated ? 'Buka CMS Asatidz' : 'Login Admin Portal'}</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
