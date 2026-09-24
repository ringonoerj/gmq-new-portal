import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  ArrowLeft, 
  FileText, 
  Briefcase, 
  Mail, 
  Settings, 
  LogOut,
  Sparkles,
  HardDrive
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { useServices } from '../../hooks/useServices';
import { useInquiries } from '../../hooks/useInquiries';

export const AdminEntryPage: React.FC = () => {
  const { user, isAuthenticated, login, loginAsDemo, logout, dataSourceMode } = useAuth();
  const { posts } = usePosts();
  const { services } = useServices();
  const { inquiries, newCount } = useInquiries();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await login(email, password);
    if (!res.success) {
      setLoginError(res.error || 'Login gagal.');
    }
  };

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '85vh', padding: '3.5rem 0' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--color-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>
            <ArrowLeft size={16} />
            <span>Kembali ke Halaman Publik Portal</span>
          </Link>

          <span className="badge" style={{ 
            background: dataSourceMode === 'supabase' ? 'rgba(110, 168, 26, 0.15)' : 'rgba(250, 195, 0, 0.2)',
            color: dataSourceMode === 'supabase' ? 'var(--color-green-dark)' : '#996e00',
            border: `1px solid ${dataSourceMode === 'supabase' ? 'var(--color-green)' : 'var(--color-orange)'}`
          }}>
            <HardDrive size={13} />
            {dataSourceMode === 'supabase' ? 'Mode: Supabase Cloud' : 'Mode: Mock Storage Lokal'}
          </span>
        </div>

        {isAuthenticated ? (
          /* Logged In Quick Backoffice View */
          <div>
            <div className="card-glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2.5rem', borderLeft: '6px solid var(--color-orange)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--color-blue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-blue-dark)' }}>
                      Selamat Datang, {user?.full_name}
                    </h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Role Akses: <strong style={{ color: 'var(--color-orange-dark)', textTransform: 'uppercase' }}>{user?.role}</strong> • Sesi Aktif
                    </span>
                  </div>
                </div>

                <button onClick={logout} className="btn btn-outline btn-sm" style={{ gap: '0.4rem' }}>
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6', margin: 0 }}>
                Anda berhasil masuk ke CMS Backoffice GMQ. Modul-modul manajemen data penuh di bawah ini telah terhubung ke data adapter dan akan diperluas antarmuka editor visualnya pada <strong>Fase 4</strong>.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ padding: '1.5rem', borderTop: '4px solid var(--color-green)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kabar & Artikel</span>
                  <FileText size={18} color="var(--color-green)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                  {posts.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-green-dark)', marginTop: '0.25rem' }}>
                  {posts.filter(p => p.status === 'published').length} Tayang di Portal
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', borderTop: '4px solid var(--color-orange)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Unit Pendidikan</span>
                  <Briefcase size={18} color="var(--color-orange)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                  {services.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Formal & Non-Formal
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', borderTop: '4px solid var(--color-green)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pendaftaran / PSB</span>
                  <Mail size={18} color="var(--color-green)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                  {inquiries.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-orange-dark)', marginTop: '0.25rem' }}>
                  {newCount} Permohonan Baru
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', borderTop: '4px solid var(--color-green)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status Yayasan</span>
                  <Settings size={18} color="var(--color-green)" />
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-blue)', marginTop: '0.5rem' }}>
                  Aktif & Terpadu
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Cloudflare & Supabase Ready
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid var(--color-green)' }}>
              <Sparkles size={28} color="var(--color-green)" style={{ margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-blue)', marginBottom: '0.5rem' }}>
                Halaman Publik Griya Mahir Al-Qur'an Telah Siap
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                Silakan jelajahi Beranda, Profil Yayasan, Unit Pendidikan, dan Kabar Santri. Panel pengelolaan penuh (CRUD artikel & pendaftar) akan disempurnakan pada <strong>Fase 4</strong>.
              </p>
              <Link to="/" className="btn btn-primary">
                Kunjungi Portal Utama
              </Link>
            </div>
          </div>
        ) : (
          /* Login Form & 1-Click Demo */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            {/* Left: Info */}
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>Portal Asatidz & Admin</span>
              <h1 style={{ fontSize: '2.25rem', color: 'var(--color-blue)', marginBottom: '1rem', fontWeight: 800 }}>
                Masuk ke Panel CMS Griya Mahir Al-Qur'an
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Area khusus bagi Dewan Asatidz dan Pengurus Yayasan Griya Mahir Al-Qur'an untuk mempublikasikan kabar santri, mengelola pendaftaran santri baru (PSB), dan memperbarui informasi unit pendidikan.
              </p>

              {/* 1-Click Demo Buttons */}
              <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-green)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-blue-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} color="var(--color-green)" /> Uji Coba Cepat (1-Click Demo)
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Untuk kemudahan pengetesan lokal tanpa mengetik email/password:
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => loginAsDemo('superadmin')} className="btn btn-orange btn-sm">
                    <UserCheck size={14} /> Masuk sbg Superadmin
                  </button>
                  <button onClick={() => loginAsDemo('editor')} className="btn btn-outline btn-sm">
                    <UserCheck size={14} /> Masuk sbg Editor
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Manual Login Box */}
            <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-md)', borderTop: '5px solid var(--color-blue)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Lock size={20} color="var(--color-blue)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-blue-dark)' }}>
                  Login Akun Petugas
                </h3>
              </div>

              {loginError && (
                <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleManualLogin}>
                <div className="form-group">
                  <label className="form-label">Alamat Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required 
                    placeholder="admin@gmq.co.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kata Sandi</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    required 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
                  Masuk ke Dashboard
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
