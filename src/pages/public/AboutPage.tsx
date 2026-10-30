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
      {/* Header Banner: Prestigious Emerald & Gold Gradient */}
      <section style={{ 
        background: 'var(--gradient-green-hero)',
        color: 'var(--text-main)',
        padding: '5.5rem 0 4.5rem',
        borderBottom: '4px solid var(--color-green)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '1 1 500px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
              <Sparkles size={13} color="var(--color-gold)" /> Profil Lembaga Dakwah
            </span>
            <h1 style={{ color: 'var(--color-blue)', fontSize: '2.85rem', marginBottom: '1rem', fontWeight: 800 }}>
              Tentang Yayasan Griya Mahir Al-Qur'an (GMQ)
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', lineHeight: 1.75 }}>
              Lembaga nirlaba yang berkhidmat dalam pembinaan dan dakwah Al-Qur'an terpadu, membina umat dari usia dini hingga dewasa melalui unit pendidikan formal dan non-formal bersanad muttashil.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-prestige)',
              border: '2px solid rgba(250, 195, 0, 0.35)'
            }}>
              <img 
                src={logoImg} 
                alt="Logo Resmi Yayasan Griya Mahir Al-Qur'an" 
                style={{ maxHeight: '135px', width: 'auto', objectFit: 'contain' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile & Story */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Khadim Al-Qur'an</span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--color-blue)', marginBottom: '1.25rem', fontWeight: 800 }}>
                Membangun Generasi Huffadz yang Beradab dan Visioner
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Yayasan Griya Mahir Al-Qur'an didirikan dengan cita-cita luhur membumikan Al-Qur'an di tengah masyarakat modern. Kami memandang Al-Qur'an bukan sekadar bacaan untuk dihafal, melainkan pedoman hidup (*hudan lin-naas*) yang membentuk integritas karakter, kecerdasan intelektual, dan ketangguhan mental santri.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Melalui ekosistem terpadu, yayasan mengintegrasikan pendidikan formal yang terakreditasi dengan tradisi keilmuan pesantren bersanad. Para santri didampingi musyrif mukim 24 jam dalam lingkungan yang asri, islami, dan kondusif.
              </p>

              <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-green-dark)' }}>30 Juz</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sanad Riwayat Hafs 'An 'Ashim</div>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '2rem' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-gold-dark)' }}>5 Unit</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Jenjang Balita hingga Dewasa</div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="card card-prestige" style={{ 
                borderRadius: 'var(--radius-xl)', 
                overflow: 'hidden', 
                boxShadow: 'var(--shadow-xl)',
                background: '#ffffff',
                border: '3px solid var(--color-green-border)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=900&auto=format&fit=crop&q=80" 
                  alt="Kegiatan Belajar Santri GMQ" 
                  style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Visi & Misi Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
            
            {/* Visi */}
            <div className="card card-prestige" style={{ padding: '2.5rem', borderTop: '6px solid var(--color-green)', background: '#ffffff' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: 'var(--radius-md)', 
                background: 'linear-gradient(135deg, var(--color-green) 0%, var(--color-green-dark) 100%)', 
                color: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-glow-green)'
              }}>
                <Target size={28} color="var(--color-gold)" />
              </div>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--color-blue)', marginBottom: '1rem', fontWeight: 700 }}>
                Visi Yayasan
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75' }}>
                "Menjadi pusat rujukan pendidikan Al-Qur'an terdepan yang melahirkan generasi huffadz mahir, berakhlak mulia, berwawasan global, dan berkhidmah untuk kejayaan umat Islam."
              </p>
            </div>

            {/* Misi */}
            <div className="card card-prestige" style={{ padding: '2.5rem', borderTop: '6px solid var(--color-gold)', background: '#ffffff' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: 'var(--radius-md)', 
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #d6a500 100%)', 
                color: 'var(--color-blue-dark)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-glow-orange)'
              }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--color-blue)', marginBottom: '1rem', fontWeight: 700 }}>
                Misi Utama Yayasan
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--color-green)', fontWeight: 800, marginTop: '2px' }}>✓</span>
                  <span>Menyelenggarakan pendidikan tahfidz Al-Qur'an 30 juz dengan standar tajwid riwayat Hafs bersanad muttashil.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--color-green)', fontWeight: 800, marginTop: '2px' }}>✓</span>
                  <span>Mengintegrasikan kurikulum pendidikan nasional dengan penanaman adab dan tsaqafah islamiyyah.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--color-green)', fontWeight: 800, marginTop: '2px' }}>✓</span>
                  <span>Membuka akses pembelajaran tahsin Al-Qur'an bagi masyarakat luas dari jenjang balita, anak, hingga eksekutif.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--color-green)', fontWeight: 800, marginTop: '2px' }}>✓</span>
                  <span>Mengembangkan program beasiswa kader dakwah bagi para penghafal Al-Qur'an berprestasi dan yatim dhuafa.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* 4 Pilar Karakter Santri */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Kurikulum Kepribadian</span>
            <h2 style={{ fontSize: '2.1rem', color: 'var(--color-blue)', margin: 0, fontWeight: 800 }}>
              4 Karakter Utama Santri Griya Mahir Al-Qur'an
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="card card-prestige" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: '#ffffff' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-green-subtle)', color: 'var(--color-green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <BookOpen size={24} />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-blue)', marginBottom: '0.5rem', fontWeight: 700 }}>Mahir & Mutqin</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                Hafal 30 Juz secara mutqin dengan pemahaman kaidah makharijul huruf dan sifatul huruf yang tepat.
              </p>
            </div>

            <div className="card card-prestige" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: '#ffffff' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-gold-subtle)', color: 'var(--color-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Award size={24} />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-blue)', marginBottom: '0.5rem', fontWeight: 700 }}>Beradab & Saleh</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                Menjadikan akhlak Rasulullah SAW sebagai cermin kepribadian, berbakti kepada orang tua, dan santun kepada sesama.
              </p>
            </div>

            <div className="card card-prestige" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: '#ffffff' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-blue-subtle)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Users size={24} />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-blue)', marginBottom: '0.5rem', fontWeight: 700 }}>Mandiri & Disiplin</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                Terbiasa hidup tertib, menjaga kebersihan, menghargai waktu, dan memiliki etos kepemimpinan mandiri di asrama.
              </p>
            </div>

            <div className="card card-prestige" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: '#ffffff' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-green-subtle)', color: 'var(--color-green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <HeartHandshake size={24} />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-blue)', marginBottom: '0.5rem', fontWeight: 700 }}>Berjiwa Khidmah</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                Siap mengamalkan dan mengajarkan Al-Qur'an untuk membimbing keluarga serta masyarakat luas.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="card card-prestige" style={{ 
            background: 'linear-gradient(135deg, #173d0e 0%, #112d0a 100%)', 
            color: '#ffffff', 
            padding: '3rem 2.5rem', 
            textAlign: 'center',
            borderTop: '4px solid var(--color-gold)'
          }}>
            <h3 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.75rem', fontWeight: 800 }}>
              Mari Bersinergi Bersama Yayasan Griya Mahir Al-Qur'an
            </h3>
            <p style={{ color: '#d4ebd0', fontSize: '1rem', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Kunjungi asrama kami atau daftarkan putra-putri Anda untuk mengikuti seleksi Penerimaan Santri Baru (PSB).
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/kontak" className="btn btn-gold" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: 700 }}>
                <span>Hubungi Sekretariat Yayasan</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/layanan" className="btn btn-outline" style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
                <span>Brosur Unit Pendidikan</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
