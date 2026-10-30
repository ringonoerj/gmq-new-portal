import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Heart 
} from 'lucide-react';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { useInquiries } from '../../hooks/useInquiries';

export const ContactPage: React.FC = () => {
  const { config } = useSiteConfig();
  const { submitInquiry } = useInquiries();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await submitInquiry({
      name: form.name,
      email: form.email,
      phone: form.phone || '-',
      subject: form.subject || "Pendaftaran / Infaq Yayasan Griya Mahir Al-Qur'an",
      message: form.message
    });
    setSubmitting(false);
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 6000);
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
            <Sparkles size={13} color="var(--color-gold)" /> Layanan Umat & Informasi
          </span>
          <h1 style={{ color: 'var(--color-blue)', fontSize: '2.85rem', marginBottom: '1rem', fontWeight: 800 }}>
            Hubungi Yayasan Griya Mahir Al-Qur'an
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', lineHeight: 1.75 }}>
            Sekretariat kami siap melayani pendaftaran santri baru, konsultasi bimbingan Al-Qur'an, kerja sama dakwah, maupun konfirmasi infaq dan wakaf.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem' }}>
            
            {/* Left: Contact Info & Address */}
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Sekretariat Pusat</span>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-blue)', marginBottom: '1rem', fontWeight: 800 }}>
                Silaturahmi & Konsultasi Pendidikan
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                Bapak/Ibu wali santri dapat berkunjung langsung ke kantor sekretariat atau menghubungi kami melalui saluran komunikasi resmi di bawah ini.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card card-prestige" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#ffffff', borderLeft: '5px solid var(--color-green)' }}>
                  <div style={{ background: 'var(--color-green-subtle)', color: 'var(--color-green-dark)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--color-blue)', fontWeight: 700 }}>Lokasi Yayasan</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                      {config.address}
                    </p>
                  </div>
                </div>

                <div className="card card-prestige" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#ffffff', borderLeft: '5px solid var(--color-gold)' }}>
                  <div style={{ background: 'var(--color-gold-subtle)', color: 'var(--color-gold-dark)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--color-blue)', fontWeight: 700 }}>Telepon & WhatsApp PSB</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                      WhatsApp PSB: <strong>{config.whatsapp}</strong><br />
                      Telepon Kantor: {config.phone}
                    </p>
                  </div>
                </div>

                <div className="card card-prestige" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#ffffff', borderLeft: '5px solid var(--color-green)' }}>
                  <div style={{ background: 'var(--color-green-subtle)', color: 'var(--color-green-dark)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--color-blue)', fontWeight: 700 }}>Email Sekretariat</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                      {config.email}
                    </p>
                  </div>
                </div>

                <div className="card card-prestige" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#ffffff', borderLeft: '5px solid var(--color-blue)' }}>
                  <div style={{ background: 'var(--color-blue-subtle)', color: 'var(--color-blue)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--color-blue)', fontWeight: 700 }}>Jam Layanan Administrasi</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                      Senin - Sabtu: 08:00 - 16:30 WIB<br />
                      Ahad / Libur Nasional: Konfirmasi via WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message / Registration Form */}
            <div>
              <div className="card card-prestige" style={{ padding: '2.5rem', background: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <MessageSquare size={22} color="var(--color-green)" />
                  <h3 style={{ fontSize: '1.45rem', color: 'var(--color-blue)', margin: 0, fontWeight: 800 }}>
                    Formulir Konsultasi & Pendaftaran
                  </h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
                  Silakan lengkapi formulir di bawah ini. Tim kami akan menghubungi Anda melalui WhatsApp atau telepon.
                </p>

                {success && (
                  <div style={{ background: 'var(--color-green-subtle)', border: '1px solid var(--color-green)', color: 'var(--color-green-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    <CheckCircle2 size={18} />
                    <span>Alhamdulillah, pesan/pendaftaran Anda telah kami terima dengan baik.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="Nama orang tua atau calon santri"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email Aktif *</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        required 
                        placeholder="email@anda.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nomor WhatsApp *</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        required 
                        placeholder="0812xxxxxxx"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Keperluan / Pilihan Unit *</label>
                    <select 
                      className="form-select"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option value="">-- Pilih Keperluan --</option>
                      <option value="Pendaftaran Kuttab Tahfidz (Formal Usia 5-12 Thn)">Pendaftaran Kuttab Tahfidz (Formal Usia 5-12 Thn)</option>
                      <option value="Pendaftaran Ma'had Boarding Putra/Putri (SMP/SMA)">Pendaftaran Ma'had Boarding Putra/Putri (SMP/SMA)</option>
                      <option value="Pendaftaran Griya Tahsin Dewasa & Eksekutif">Pendaftaran Griya Tahsin Dewasa & Eksekutif</option>
                      <option value="Pendaftaran Rumah Tahfidz Balita & Anak">Pendaftaran Rumah Tahfidz Balita & Anak</option>
                      <option value="Pendaftaran Dauroh Sanad Matan Al-Jazariyyah">Pendaftaran Dauroh Sanad Matan Al-Jazariyyah</option>
                      <option value="Infaq & Sedekah Operasional Santri">Infaq & Sedekah Operasional Santri</option>
                      <option value="Wakaf Pembangunan Asrama & Sarana Belajar">Wakaf Pembangunan Asrama & Sarana Belajar</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pesan / Keterangan *</label>
                    <textarea 
                      className="form-textarea" 
                      rows={4} 
                      required 
                      placeholder="Tuliskan pertanyaan, latar belakang pendidikan santri, atau keterangan infaq..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="btn btn-gold" 
                    style={{ width: '100%', padding: '0.95rem', gap: '0.5rem', fontSize: '1rem', fontWeight: 700 }}
                  >
                    <Send size={16} />
                    <span>{submitting ? 'Sedang Mengirim...' : 'Kirim Pendaftaran / Pesan'}</span>
                  </button>
                </form>

                <div style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #fefae0 0%, #fff7d6 100%)', border: '1.5px solid var(--color-gold)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    <Heart size={15} color="var(--color-gold-dark)" /> Rekening Donasi & Wakaf Yayasan GMQ:
                  </span>
                  <div style={{ fontSize: '1.05rem', color: 'var(--color-blue)', fontWeight: 900, marginTop: '0.35rem', letterSpacing: '0.04em' }}>
                    Bank Syariah Indonesia (BSI): 7188 9900 12
                  </div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>a.n. Yayasan Griya Mahir Al-Qur'an</small>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
