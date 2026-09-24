import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Users,
  HeartHandshake
} from 'lucide-react';
import logoImg from '../../assets/Logo_YGMQ_Transparan.png';

export const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Header Banner: Clean White & Green Gradient */}
      <section style={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f1f8ea 45%, #e1f2d3 100%)',
        color: 'var(--text-main)',
        padding: '5rem 0 4rem',
        borderBottom: '3.5px solid var(--color-green)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: '1 1 500px' }}>
            <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
              <Sparkles size={13} color="var(--color-orange)" /> Profil Yayasan
            </span>
            <h1 style={{ color: 'var(--color-blue)', fontSize: '2.65rem', marginBottom: '1rem', fontWeight: 800 }}>
              Tentang Yayasan Griya Mahir Al-Qur'an (GMQ)
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', lineHeight: 1.7 }}>
              Lembaga nirlaba yang berkhidmat dalam pembinaan dan dakwah Al-Qur'an terpadu, membina umat dari usia dini hingga dewasa melalui unit pendidikan formal dan non-formal bersanad.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={logoImg} 
              alt="Logo Resmi Yayasan Griya Mahir Al-Qur'an" 
              style={{ maxHeight: '130px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 4px 14px rgba(110, 168, 26, 0.22))' }} 
            />
          </div>
        </div>
      </section>

      {/* Main Profile & Story */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>Khidmat Untuk Umat</span>
              <h2 style={{ fontSize: '2.1rem', color: 'var(--color-blue)', marginBottom: '1.25rem' }}>
                Melahirkan Generasi Pembawa Al-Qur'an yang Berilmu dan Berakhlak Mulia
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                <strong>Yayasan Griya Mahir Al-Qur'an (GMQ)</strong> didirikan atas dasar kepedulian terhadap pentingnya membumikan kalamullah di tengah kehidupan masyarakat modern. Kami meyakini bahwa Al-Qur'an adalah sumber keberkahan, pembina karakter, dan petunjuk utama keselamatan dunia serta akhirat.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', lineHeight: '1.8', marginBottom: '1.75rem' }}>
                Dalam perjalanannya, GMQ berkembang dengan mengintegrasikan <strong>Unit Pendidikan Formal</strong> seperti Kuttab dan Ma'had Tahfidz Berasrama dengan <strong>Unit Pendidikan Non-Formal</strong> seperti Rumah Tahfidz Balita, Griya Tahsin Dewasa, serta Program Dauroh Sanad Tajwid bagi asatidz di seluruh pelosok negeri.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/layanan" className="btn btn-primary">
                  <span>Lihat Unit Pendidikan</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/kontak" className="btn btn-outline">
                  <span>Hubungi Sekretariat</span>
                </Link>
              </div>
            </div>

            {/* Visual Image Showcase */}
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80" 
                alt="Suasana Belajar Santri Griya Mahir Al-Quran" 
                style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              />
              <div className="card" style={{ 
                position: 'absolute', 
                bottom: '-25px', 
                left: '20px', 
                right: '20px', 
                padding: '1.25rem 1.5rem',
                borderLeft: '5px solid var(--color-green)',
                background: '#ffffff',
                boxShadow: 'var(--shadow-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Award size={26} color="var(--color-green)" />
                  <div>
                    <strong style={{ color: 'var(--color-blue)', fontSize: '0.9rem', display: 'block' }}>
                      Sanad Keilmuan Muttashil
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Mata rantai qira'ah bersambung kepada Rasulullah Shallallahu 'Alaihi Wasallam
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visi & Misi */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem', marginTop: '3rem' }}>
            <div className="card" style={{ padding: '2.5rem', borderTop: '5px solid var(--color-green)', background: '#ffffff' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'var(--color-green-subtle)', color: 'var(--color-green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-blue)', marginBottom: '0.85rem' }}>
                Visi Yayasan GMQ
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                Menjadi lembaga pendidikan Al-Qur'an terpadu dan terpercaya di Indonesia yang unggul dalam melahirkan para penghafal Al-Qur'an 30 juz yang mutqin, berakhlak karimah, menguasai ilmu syar'i, dan siap berkhidmat bagi kemaslahatan umat.
              </p>
            </div>

            <div className="card" style={{ padding: '2.5rem', borderTop: '5px solid var(--color-orange)', background: '#ffffff' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'var(--color-orange-subtle)', color: '#996e00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Compass size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-blue)', marginBottom: '0.85rem' }}>
                Misi Yayasan GMQ
              </h3>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Menyelenggarakan pendidikan formal berbasis Al-Qur'an yang memadukan keimanan, adab, dan kurikulum nasional.</li>
                <li>Menyediakan program bimbingan tahsin dan talaqqi untuk masyarakat luas tanpa batasan usia.</li>
                <li>Mencetak kader-kader pengajar Al-Qur'an yang kompeten dan bersyahadah sanad tajwid.</li>
                <li>Membangun sarana prasarana ma'had tahfidz yang asri, representatif, dan berdaya guna.</li>
              </ul>
            </div>
          </div>

          {/* 4 Pilar Karakter Santri GMQ */}
          <div className="card-glass" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #ffffff 0%, #f4faed 100%)', border: '1px solid var(--color-green-border)' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Pondasi Pembinaan</span>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-blue)' }}>
                4 Pilar Karakter Santri GMQ
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-green)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <BookOpen size={22} />
                </div>
                <h4 style={{ color: 'var(--color-blue)', marginBottom: '0.5rem' }}>Mutqin Tilawah & Tahfidz</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Hafalan melekat kokoh dengan tajwid presisi riwayat Hafsh 'an 'Ashim.</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-orange)', color: 'var(--color-blue-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <HeartHandshake size={22} />
                </div>
                <h4 style={{ color: 'var(--color-blue)', marginBottom: '0.5rem' }}>Adab & Akhlak Karimah</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Mendahulukan adab di atas ilmu sebagaimana tuntunan para salafush shalih.</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-blue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Award size={22} />
                </div>
                <h4 style={{ color: 'var(--color-blue)', marginBottom: '0.5rem' }}>Faham Bahasa Al-Qur'an</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Penguasaan bahasa Arab aktif untuk memahami makna dan mentadabburi ayat.</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-green-dark)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Users size={22} />
                </div>
                <h4 style={{ color: 'var(--color-blue)', marginBottom: '0.5rem' }}>Kemandirian & Kepemimpinan</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Santri dilatih tangguh, berjiwa da'i, dan siap memimpin di tengah masyarakat.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
