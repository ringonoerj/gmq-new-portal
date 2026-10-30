import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  CheckCircle2
} from 'lucide-react';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import logoImg from '../../assets/Logo_YGMQ_Transparan.png';

export const Footer: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <footer style={{ 
      background: 'linear-gradient(180deg, #173d0e 0%, #112d0a 100%)', 
      color: '#d4ebd0', 
      borderTop: '4px solid var(--color-gold)',
      boxShadow: '0 -10px 30px rgba(18, 51, 10, 0.35)',
      marginTop: 'auto'
    }}>
      {/* Upper Footer: 4 Grid Columns */}
      <div className="container" style={{ padding: '4.5rem 1.5rem 3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem' }}>
          
          {/* Column 1: Official Foundation Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ 
                background: '#ffffff', 
                padding: '0.4rem', 
                borderRadius: 'var(--radius-md)', 
                display: 'inline-flex',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                <img 
                  src={logoImg} 
                  alt="Logo Yayasan Griya Mahir Al-Qur'an" 
                  style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
                />
              </div>
              <div>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em', display: 'block', lineHeight: 1.15 }}>
                  GRIYA MAHIR AL-QUR'AN
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700 }}>
                  Yayasan Dakwah & Pendidikan
                </span>
              </div>
            </div>

            <p style={{ color: '#b9dbb3', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {config.description}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(250, 195, 0, 0.12)', border: '1px solid rgba(250, 195, 0, 0.35)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold)' }}></span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700 }}>
                Lembaga Nirlaba & Berbadan Hukum Resmi
              </span>
            </div>
          </div>

          {/* Column 2: Educational Units */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700, borderLeft: '3px solid var(--color-gold)', paddingLeft: '0.6rem' }}>
              Unit Pendidikan
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/layanan" style={{ color: '#c5e2be', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}>
                  <CheckCircle2 size={14} color="var(--color-gold)" />
                  <span>Kuttab Tahfidz Anak (Usia 5-12 Thn)</span>
                </Link>
              </li>
              <li>
                <Link to="/layanan" style={{ color: '#c5e2be', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}>
                  <CheckCircle2 size={14} color="var(--color-gold)" />
                  <span>Ma'had Tahfidz Boarding (SMP/SMA)</span>
                </Link>
              </li>
              <li>
                <Link to="/layanan" style={{ color: '#c5e2be', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}>
                  <CheckCircle2 size={14} color="var(--color-gold)" />
                  <span>Griya Tahsin Dewasa & Eksekutif</span>
                </Link>
              </li>
              <li>
                <Link to="/layanan" style={{ color: '#c5e2be', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}>
                  <CheckCircle2 size={14} color="var(--color-gold)" />
                  <span>Rumah Tahfidz Balita & Anak (RTBA)</span>
                </Link>
              </li>
              <li>
                <Link to="/layanan" style={{ color: '#c5e2be', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}>
                  <CheckCircle2 size={14} color="var(--color-gold)" />
                  <span>Dauroh Sanad Matan Al-Jazariyyah</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700, borderLeft: '3px solid var(--color-gold)', paddingLeft: '0.6rem' }}>
              Pusat Informasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/tentang" style={{ color: '#c5e2be', transition: 'color 0.2s' }}>
                  Profil & Visi Misi Yayasan
                </Link>
              </li>
              <li>
                <Link to="/berita" style={{ color: '#c5e2be', transition: 'color 0.2s' }}>
                  Penerimaan Santri Baru (PSB)
                </Link>
              </li>
              <li>
                <Link to="/berita" style={{ color: '#c5e2be', transition: 'color 0.2s' }}>
                  Kabar Santri & Wisuda Tahfidz
                </Link>
              </li>
              <li>
                <Link to="/kontak" style={{ color: '#c5e2be', transition: 'color 0.2s' }}>
                  Konsultasi Pembelajaran Qur'an
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: 'var(--color-gold)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>Portal Asatidz & Admin CMS</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Secretariat & BSI Infaq Card */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700, borderLeft: '3px solid var(--color-gold)', paddingLeft: '0.6rem' }}>
              Sekretariat & Layanan Infaq
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#c5e2be', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={17} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{config.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>{config.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>{config.email}</span>
              </div>
            </div>

            {/* Official BSI Infaq Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(250, 195, 0, 0.12) 0%, rgba(250, 195, 0, 0.05) 100%)', 
              border: '1.5px solid rgba(250, 195, 0, 0.45)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>
                Rekening Infaq & Wakaf Santri
              </span>
              <div style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 800, letterSpacing: '0.03em' }}>
                BSI: 7188 9900 12
              </div>
              <span style={{ fontSize: '0.75rem', color: '#b9dbb3', display: 'block', marginTop: '2px' }}>
                a.n. Yayasan Griya Mahir Al-Qur'an
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Rights */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem 0', background: 'rgba(10, 24, 6, 0.65)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem', color: '#88a880' }}>
          <div>
            © {new Date().getFullYear()} <strong>Yayasan Griya Mahir Al-Qur'an (YGMQ)</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Mencetak Generasi Qur'ani, Berakhlak Mulia & Mandiri</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
