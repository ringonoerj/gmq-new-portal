import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  Send,
  Calendar,
  Clock,
  ChevronRight,
  Play,
  Award,
  Users,
  GraduationCap
} from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import { usePosts } from '../../hooks/usePosts';
import { useInquiries } from '../../hooks/useInquiries';
import type { ServiceItem } from '../../types';
import logoImg from '../../assets/Logo_YGMQ_Transparan.png';

export const HomePage: React.FC = () => {
  const { services } = useServices();
  const { publishedPosts } = usePosts();
  const { submitInquiry } = useInquiries();

  // Selected unit for detail modal
  const [selectedUnit, setSelectedUnit] = useState<ServiceItem | null>(null);

  // Form submission state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Video player modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '-',
      subject: formData.subject || 'Pendaftaran / Konsultasi Program GMQ',
      message: formData.message
    });
    setSending(false);
    setSentSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <div>
      {/* 1. Hero Section: Luminous White & Lush Green Ambience */}
      <section style={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ea 45%, #e1f2d3 100%)',
        color: 'var(--text-main)',
        padding: '5.5rem 0 5rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '3.5px solid var(--color-green)'
      }}>
        {/* Decorative Green Glow Elements */}
        <div style={{
          position: 'absolute',
          top: '-25%',
          right: '-5%',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(110, 168, 26, 0.22) 0%, rgba(250, 195, 0, 0.10) 45%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            
            {/* Left: Text & CTA */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <img 
                  src={logoImg} 
                  alt="Logo Yayasan Griya Mahir Al-Qur'an" 
                  style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(110, 168, 26, 0.2))' }} 
                />
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.45rem', 
                  background: 'var(--color-green)', 
                  color: '#ffffff', 
                  padding: '0.4rem 1rem', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  boxShadow: 'var(--shadow-glow-green)' 
                }}>
                  <Sparkles size={14} color="var(--color-orange)" />
                  Yayasan Griya Mahir Al-Qur'an (GMQ)
                </div>
              </div>

              <h1 style={{ color: 'var(--color-blue)', fontSize: '2.85rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Mencetak Generasi Qur'ani yang Mahir, Berilmu, dan Berakhlak Mulia
              </h1>

              <p style={{ fontSize: '1.1rem', lineHeight: '1.75', color: 'var(--text-muted)', marginBottom: '2.25rem' }}>
                Lembaga pendidikan Al-Qur'an terpadu yang membina santri dari usia dini hingga dewasa melalui <strong>Unit Formal</strong> (Kuttab & Ma'had Boarding) dan <strong>Unit Non-Formal</strong> (Griya Tahsin, Rumah Tahfidz Balita, & Dauroh Sanad).
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/kontak" className="btn btn-primary" style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem', gap: '0.5rem' }}>
                  <span>Daftar Santri Baru (PSB)</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/layanan" className="btn btn-outline" style={{ padding: '0.9rem 1.6rem', fontSize: '0.95rem' }}>
                  <span>Jelajahi Unit Pendidikan</span>
                </Link>
              </div>
            </div>

            {/* Right: Featured Video / Visual Card */}
            <div>
              <div className="card" style={{ 
                padding: '0.75rem', 
                borderRadius: 'var(--radius-lg)', 
                background: '#ffffff',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid var(--color-green-border)',
                position: 'relative'
              }}>
                {/* Official Yayasan Seal Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '20px',
                  background: '#ffffff',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 3,
                  border: '1.5px solid var(--color-green-border)'
                }}>
                  <img src={logoImg} alt="Emblem GMQ" style={{ height: '24px', width: 'auto' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-blue)' }}>Lembaga Berizin Resmi</span>
                </div>
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1584281722572-c5dfd46f5647?w=800&auto=format&fit=crop&q=80" 
                    alt="Santri Griya Mahir Al-Quran"
                    style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} 
                  />
                  {/* Play Video Trigger Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(24, 54, 13, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => setVideoModalOpen(true)}
                  >
                    <div style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      background: 'var(--color-green)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 30px rgba(110, 168, 26, 0.6)',
                      transition: 'transform var(--transition-fast)'
                    }}>
                      <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
                    </div>
                  </div>

                  <div style={{ 
                    position: 'absolute', 
                    bottom: '12px', 
                    left: '12px', 
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--color-blue)', display: 'block' }}>
                        Profil & Suasana Santri GMQ
                      </strong>
                      <small style={{ color: 'var(--color-green-dark)', fontWeight: 600 }}>Tonton Video Dokumenter (3 Menit)</small>
                    </div>
                    <span className="badge badge-orange">HD Video</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip (Islamic Education Highlights) */}
      <section style={{ 
        background: '#ffffff', 
        borderBottom: '1px solid var(--border-subtle)', 
        padding: '2.5rem 0',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.75rem',
            textAlign: 'center'
          }}>
            <div style={{ borderRight: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-green)' }}>30 JUZ</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Target Hafalan Mutqin Bersanad</div>
            </div>
            <div style={{ borderRight: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#996e00' }}>5 UNIT</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pendidikan Formal & Non-Formal</div>
            </div>
            <div style={{ borderRight: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-green)' }}>850+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Santri Aktif & Alumni Wisuda</div>
            </div>
            <div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-blue)' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Asatidz Hafidz & Bersyahadah</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Islamic Callout Quote / Hadith Box */}
      <section style={{ padding: '3.5rem 0', background: 'var(--color-green-subtle)', borderBottom: '1px solid var(--color-green-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <BookOpen size={36} color="var(--color-green)" style={{ margin: '0 auto 1rem' }} />
          <blockquote style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--color-green-dark)', lineHeight: 1.8, marginBottom: '0.75rem', fontWeight: 600 }}>
            "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
          </blockquote>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            <em>"Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya."</em><br />
            <strong>(Hadits Shahih Riwayat Al-Bukhari)</strong>
          </p>
        </div>
      </section>

      {/* 4. Unit Pendidikan Formal & Non-Formal */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Unit Pendidikan Terpadu</span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--color-blue)', margin: 0 }}>
                Program Pendidikan Formal & Non-Formal GMQ
              </h2>
            </div>
            <Link to="/layanan" style={{ color: 'var(--color-green-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Lihat Detail Semua Unit</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            {services.map((unit) => (
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
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                )}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className={`badge ${unit.category === 'Unit Formal' ? 'badge-green' : 'badge-orange'}`} style={{ fontSize: '0.7rem' }}>
                      {unit.category}
                    </span>
                    <small style={{ color: 'var(--color-green-dark)', fontWeight: 700, fontSize: '0.75rem' }}>
                      Pendaftaran Dibuka
                    </small>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--color-blue)', lineHeight: 1.4 }}>
                    {unit.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem', flex: 1 }}>
                    {unit.short_desc}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                      onClick={() => setSelectedUnit(unit)}
                      className="btn btn-sm btn-outline"
                    >
                      Brosur & Kurikulum
                    </button>
                    <Link to="/kontak" className="btn btn-sm btn-primary" style={{ gap: '0.3rem' }}>
                      <span>Daftar Unit</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Keunggulan Griya Mahir Al-Quran */}
      <section style={{ padding: '5rem 0', background: '#ffffff', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Keunggulan Pendidikan</span>
            <h2 style={{ fontSize: '2.1rem', color: 'var(--color-blue)', marginBottom: '0.75rem' }}>
              Mengapa Memilih Yayasan Griya Mahir Al-Qur'an?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Komitmen kami adalah menghadirkan pendidikan Al-Qur'an bersanad yang komprehensif, mencakup aspek tilawah, tahfidz, tadabbur, dan pembentukan akhlak karimah.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ textAlign: 'center', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-green-subtle)', border: '1px solid var(--color-green-border)' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--color-green)', 
                color: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: 'var(--shadow-glow-green)'
              }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>Sanad Keilmuan Muttashil</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Pembelajaran tajwid dan talaqqi berlandaskan sanad Matan Al-Jazariyyah tersambung hingga Rasulullah SAW.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-orange-subtle)', border: '1px solid var(--color-orange-border)' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--color-orange)', 
                color: 'var(--color-blue-dark)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: 'var(--shadow-glow-orange)'
              }}>
                <GraduationCap size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>Integrasi Formal & Pesantren</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Santri meraih ijazah resmi negara sekaligus ijazah tahfidz 30 juz dan syahadah diniyyah.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-green-subtle)', border: '1px solid var(--color-green-border)' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--color-green)', 
                color: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: 'var(--shadow-glow-green)'
              }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>Musyrif & Asatidz Mukim</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Pendampingan intensif 24 jam dalam pembiasaan ibadah sunnah, adab keseharian, dan disiplin belajar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Kabar Santri & Agenda Terbaru */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-page)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Informasi Terkini</span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--color-blue)', margin: 0 }}>
                Kabar Santri, Agenda & Wawasan Qur'ani
              </h2>
            </div>
            <Link to="/berita" style={{ color: 'var(--color-green-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Lihat Semua Kabar</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            {publishedPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderTop: '4px solid var(--color-green)' }}>
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  style={{ width: '100%', height: '210px', objectFit: 'cover' }} 
                  loading="lazy"
                />
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-green">{post.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} />
                      {new Date(post.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--color-blue)', lineHeight: 1.4 }}>
                    <Link to={`/berita/${post.slug}`} style={{ color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem', flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {post.author}
                    </span>
                    <Link to={`/berita/${post.slug}`} style={{ color: 'var(--color-green-dark)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>Baca Lengkap</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Formulir Pendaftaran Santri Baru & Infaq */}
      <section style={{ padding: '5rem 0', background: '#ffffff', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="card-glass" style={{ 
            padding: '3.5rem', 
            borderRadius: 'var(--radius-lg)', 
            borderLeft: '7px solid var(--color-green)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f4faed 100%)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>Penerimaan Santri Baru (PSB)</span>
                <h2 style={{ fontSize: '2.35rem', color: 'var(--color-blue)', marginBottom: '1rem' }}>
                  Daftarkan Putra-Putri Tercinta di Griya Mahir Al-Qur'an
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                  Investasikan masa depan ananda dengan bekal iman dan hafalan Al-Qur'an. Silakan isi data di samping untuk konsultasi pendaftaran unit formal maupun non-formal.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.925rem', color: 'var(--color-blue)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={18} color="var(--color-green)" />
                    <span>Layanan konsultasi pendidikan via WhatsApp gratis</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={18} color="var(--color-green)" />
                    <span>Tersedia beasiswa santri berprestasi & dhuafa</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="card" style={{ padding: '2.25rem', boxShadow: 'var(--shadow-md)', background: '#ffffff' }}>
                {sentSuccess && (
                  <div style={{ background: 'var(--color-green-subtle)', border: '1px solid var(--color-green)', color: 'var(--color-green-dark)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
                    ✓ Alhamdulillah, permohonan informasi Anda telah terkirim! Tim PSB GMQ akan segera menghubungi Anda.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nama Orang Tua / Calon Santri *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="Contoh: Bapak H. Muhammad Rizky"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email Aktif *</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        required 
                        placeholder="email@anda.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">No. WhatsApp *</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        required
                        placeholder="0812xxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pilihan Unit Pendidikan *</label>
                    <select 
                      className="form-select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    >
                      <option value="">-- Pilih Unit / Program --</option>
                      <option value="PSB Kuttab Tahfidz (Formal Usia 5-12 Thn)">Kuttab Tahfidz (Formal Usia 5-12 Thn)</option>
                      <option value="PSB Ma'had Boarding Putra/Putri (SMP/SMA)">Ma'had Boarding Putra/Putri (SMP/SMA)</option>
                      <option value="Griya Tahsin & Talaqqi Dewasa/Eksekutif">Griya Tahsin & Talaqqi Dewasa/Eksekutif</option>
                      <option value="Rumah Tahfidz Balita & Anak">Rumah Tahfidz Balita & Anak</option>
                      <option value="Dauroh Sanad Al-Jazariyyah & Guru Quran">Dauroh Sanad Al-Jazariyyah & Guru Quran</option>
                      <option value="Infaq & Wakaf Pembangunan Pesantren">Infaq & Wakaf Pembangunan Pesantren</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pesan / Pertanyaan Tambahan</label>
                    <textarea 
                      className="form-textarea" 
                      rows={3} 
                      placeholder="Tuliskan pertanyaan mengenai kurikulum, jadwal, atau biaya pendaftaran..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" disabled={sending} className="btn btn-primary" style={{ width: '100%', gap: '0.5rem', padding: '0.85rem' }}>
                    <Send size={16} />
                    <span>{sending ? 'Mengirim Data...' : 'Kirim Pendaftaran / Konsultasi'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {videoModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{ maxWidth: '800px', width: '100%', position: 'relative' }}>
            <button 
              onClick={() => setVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0px',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.75rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
              <iframe 
                src="https://www.youtube.com/embed/a9hV3xPZzWk?autoplay=1" 
                title="Profil Yayasan Griya Mahir Al-Quran"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Unit Pendidikan */}
      {selectedUnit && (
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
          <div className="card" style={{ maxWidth: '640px', width: '100%', padding: '2.25rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className={`badge ${selectedUnit.category === 'Unit Formal' ? 'badge-green' : 'badge-orange'}`}>
                {selectedUnit.category}
              </span>
              <button 
                onClick={() => setSelectedUnit(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-blue)', marginBottom: '0.75rem' }}>
              {selectedUnit.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {selectedUnit.full_desc}
            </p>

            <h4 style={{ fontSize: '0.95rem', color: 'var(--color-blue)', marginBottom: '0.75rem' }}>
              Keunggulan & Kurikulum Unit:
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedUnit.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} color="var(--color-green)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setSelectedUnit(null)} className="btn btn-outline">
                Tutup
              </button>
              <Link 
                to="/kontak" 
                onClick={() => setSelectedUnit(null)} 
                className="btn btn-primary"
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
