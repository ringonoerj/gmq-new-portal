import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock,
  HeartHandshake, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Briefcase, 
  Mail, 
  Settings, 
  LogOut, 
  Sparkles, 
  HardDrive,
  LayoutDashboard,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { useServices } from '../../hooks/useServices';
import { useWakaf } from '../../hooks/useWakaf';
import { useInquiries } from '../../hooks/useInquiries';
import { useSiteConfig } from '../../hooks/useSiteConfig';

import { AdminDashboardTab } from './AdminDashboardTab';
import { AdminPostsTab } from './AdminPostsTab';
import { AdminServicesTab } from './AdminServicesTab';
import { AdminWakafTab } from './AdminWakafTab';
import { AdminInquiriesTab } from './AdminInquiriesTab';
import { AdminSettingsTab } from './AdminSettingsTab';
import logoImg from '../../assets/Logo_YGMQ_Transparan.png';

type AdminTab = 'dashboard' | 'posts' | 'services' | 'wakaf' | 'inquiries' | 'settings';

export const AdminEntryPage: React.FC = () => {
  const { user, isAuthenticated, login, loginAsDemo, logout, dataSourceMode } = useAuth();
  const { posts, addPost, editPost, removePost } = usePosts();
  const { services, addService, editService, removeService } = useServices();
  const { wakafList, addWakaf, editWakaf, removeWakaf } = useWakaf();
  const { inquiries, newCount, changeStatus, removeInquiry } = useInquiries();
  const { config, updateConfig } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Modals state passed to children if triggered from dashboard quick actions
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isWakafModalOpen, setIsWakafModalOpen] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await login(email, password);
    if (!res.success) {
      setLoginError(res.error || 'Login gagal. Periksa kembali email dan password Anda.');
    }
  };

  const handleQuickNewPost = () => {
    setActiveTab('posts');
    setIsPostModalOpen(true);
  };

  const handleQuickNewService = () => {
    setActiveTab('services');
    setIsServiceModalOpen(true);
  };

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '90vh', padding: '2rem 0 4rem' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        
        {/* Top Control Bar */}
        <div style={{ 
          marginBottom: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
              <img 
                src={logoImg} 
                alt="Logo YGMQ" 
                style={{ height: '42px', width: 'auto' }} 
              />
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-blue)', display: 'block', lineHeight: 1.1 }}>
                  CMS Griya Mahir Al-Qur'an
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Backoffice Administrasi Yayasan (Fase 4)
                </span>
              </div>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge" style={{ 
              background: dataSourceMode === 'supabase' ? 'rgba(110, 168, 26, 0.15)' : 'rgba(250, 195, 0, 0.2)',
              color: dataSourceMode === 'supabase' ? 'var(--color-green-dark)' : '#996e00',
              border: `1px solid ${dataSourceMode === 'supabase' ? 'var(--color-green)' : 'var(--color-gold)'}`,
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem'
            }}>
              <HardDrive size={13} />
              {dataSourceMode === 'supabase' ? 'Mode: Supabase Cloud' : 'Mode: Mock Storage Lokal'}
            </span>

            <Link 
              to="/" 
              target="_blank"
              className="btn btn-outline btn-sm" 
              style={{ fontSize: '0.8rem', gap: '0.35rem' }}
            >
              <ExternalLink size={14} />
              <span>Portal Publik</span>
            </Link>

            {isAuthenticated && (
              <button 
                onClick={logout} 
                className="btn btn-outline btn-sm" 
                style={{ fontSize: '0.8rem', gap: '0.35rem', color: '#e11d48', borderColor: 'rgba(225, 29, 72, 0.3)' }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {isAuthenticated ? (
          /* ========================================================
             LOGGED IN BACKOFFICE SUITE (FASE 4 CMS FULL EXPERIENCE)
             ======================================================== */
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>
            
            {/* Left Sidebar Navigation */}
            <aside className="card" style={{ padding: '1rem', background: '#ffffff', borderTop: '4px solid var(--color-green)' }}>
              {/* User Bio Card */}
              <div style={{ padding: '0.75rem 0.5rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ 
                  width: '54px', 
                  height: '54px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-blue-dark) 100%)', 
                  color: '#ffffff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 0.6rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <ShieldCheck size={28} color="var(--color-gold)" />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                  {user?.full_name}
                </div>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem', marginTop: '0.25rem', textTransform: 'uppercase' }}>
                  {user?.role}
                </span>
              </div>

              {/* Navigation Menu */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                
                <button
                  onClick={() => setActiveTab('dashboard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: activeTab === 'dashboard' ? 'var(--color-green)' : 'transparent',
                    color: activeTab === 'dashboard' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: activeTab === 'dashboard' ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <LayoutDashboard size={17} />
                    <span>Ringkasan</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('posts')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: activeTab === 'posts' ? 'var(--color-green)' : 'transparent',
                    color: activeTab === 'posts' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: activeTab === 'posts' ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <FileText size={17} />
                    <span>Kabar Santri</span>
                  </div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.1rem 0.45rem', 
                    borderRadius: 'var(--radius-full)', 
                    background: activeTab === 'posts' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', 
                    color: activeTab === 'posts' ? '#ffffff' : 'var(--text-muted)' 
                  }}>
                    {posts.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: activeTab === 'services' ? 'var(--color-green)' : 'transparent',
                    color: activeTab === 'services' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: activeTab === 'services' ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Briefcase size={17} />
                    <span>Unit Pendidikan</span>
                  </div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.1rem 0.45rem', 
                    borderRadius: 'var(--radius-full)', 
                    background: activeTab === 'services' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', 
                    color: activeTab === 'services' ? '#ffffff' : 'var(--text-muted)' 
                  }}>
                    {services.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('wakaf')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: activeTab === 'wakaf' ? 'var(--color-green)' : 'transparent',
                    color: activeTab === 'wakaf' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: activeTab === 'wakaf' ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <HeartHandshake size={17} />
                    <span>Lembaga Wakaf</span>
                  </div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.1rem 0.45rem', 
                    borderRadius: 'var(--radius-full)', 
                    background: activeTab === 'wakaf' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', 
                    color: activeTab === 'wakaf' ? '#ffffff' : 'var(--text-muted)' 
                  }}>
                    {wakafList.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: activeTab === 'inquiries' ? 'var(--color-green)' : 'transparent',
                    color: activeTab === 'inquiries' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: activeTab === 'inquiries' ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Mail size={17} />
                    <span>Pendaftaran (PSB)</span>
                  </div>
                  {newCount > 0 ? (
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.15rem 0.5rem', 
                      borderRadius: 'var(--radius-full)', 
                      background: '#e11d48', 
                      color: '#ffffff',
                      fontWeight: 800
                    }}>
                      {newCount}
                    </span>
                  ) : (
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.1rem 0.45rem', 
                      borderRadius: 'var(--radius-full)', 
                      background: activeTab === 'inquiries' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', 
                      color: activeTab === 'inquiries' ? '#ffffff' : 'var(--text-muted)' 
                    }}>
                      {inquiries.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: activeTab === 'settings' ? 'var(--color-green)' : 'transparent',
                    color: activeTab === 'settings' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: activeTab === 'settings' ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Settings size={17} />
                    <span>Pengaturan Situs</span>
                  </div>
                </button>

              </nav>
            </aside>

            {/* Right Main Tab Workspace */}
            <main>
              {activeTab === 'dashboard' && (
                <AdminDashboardTab
                  user={user}
                  posts={posts}
                  services={services}
                  inquiries={inquiries}
                  newInquiriesCount={newCount}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onOpenNewPost={handleQuickNewPost}
                  onOpenNewService={handleQuickNewService}
                />
              )}

              {activeTab === 'posts' && (
                <AdminPostsTab
                  posts={posts}
                  onAddPost={addPost}
                  onEditPost={editPost}
                  onRemovePost={removePost}
                  isModalOpen={isPostModalOpen}
                  setIsModalOpen={setIsPostModalOpen}
                />
              )}

                        {activeTab === 'wakaf' && (
            <AdminWakafTab
              wakafList={wakafList}
              onAddWakaf={addWakaf}
              onEditWakaf={editWakaf}
              onRemoveWakaf={removeWakaf}
              isModalOpen={isWakafModalOpen}
              setIsModalOpen={setIsWakafModalOpen}
            />
          )}

          {activeTab === 'services' && (
                <AdminServicesTab
                  services={services}
                  onAddService={addService}
                  onEditService={editService}
                  onRemoveService={removeService}
                  isModalOpen={isServiceModalOpen}
                  setIsModalOpen={setIsServiceModalOpen}
                />
              )}

              {activeTab === 'inquiries' && (
                <AdminInquiriesTab
                  inquiries={inquiries}
                  onChangeStatus={changeStatus}
                  onRemoveInquiry={removeInquiry}
                />
              )}

              {activeTab === 'settings' && (
                <AdminSettingsTab
                  config={config}
                  onUpdateConfig={updateConfig}
                />
              )}
            </main>

          </div>
        ) : (
          /* ========================================================
             LOGGED OUT: LOGIN FORM & 1-CLICK DEMO (EASY LOCAL TESTING)
             ======================================================== */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', paddingTop: '2rem' }}>
            
            {/* Left: Info */}
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
                <Sparkles size={13} color="var(--color-gold)" /> Portal Asatidz & Admin
              </span>
              <h1 style={{ fontSize: '2.35rem', color: 'var(--color-blue)', marginBottom: '1rem', fontWeight: 800 }}>
                Masuk ke Panel CMS Griya Mahir Al-Qur'an
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Area khusus bagi Dewan Asatidz dan Pengurus Yayasan Griya Mahir Al-Qur'an untuk mempublikasikan kabar santri, mengelola pendaftaran santri baru (PSB), dan memperbarui informasi unit pendidikan.
              </p>

              {/* 1-Click Demo Testing Card */}
              <div className="card card-prestige" style={{ padding: '1.75rem', background: '#ffffff' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                  <Sparkles size={16} color="var(--color-gold)" /> Uji Coba Cepat (1-Click Demo)
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Klik salah satu tombol di bawah untuk langsung menguji seluruh fitur administrasi Fase 4 tanpa perlu mengetik:
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => loginAsDemo('superadmin')} className="btn btn-gold btn-sm" style={{ fontWeight: 700 }}>
                    <UserCheck size={14} /> Masuk sbg Superadmin
                  </button>
                  <button onClick={() => loginAsDemo('editor')} className="btn btn-outline btn-sm">
                    <UserCheck size={14} /> Masuk sbg Editor
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Manual Login Box */}
            <div className="card card-prestige" style={{ padding: '2.5rem', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <Lock size={22} color="var(--color-green)" />
                <h3 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--color-blue)', fontWeight: 800 }}>
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
                  <label className="form-label">Alamat Email Petugas *</label>
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
                  <label className="form-label">Kata Sandi (Password) *</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    required 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontWeight: 700 }}>
                  Masuk ke Dashboard CMS
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Akun demo otomatis tersedia: <code>admin@gmq.co.id</code> / <code>admin123</code>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
