import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Landmark, 
  Copy, 
  QrCode, 
  Award, 
  FileCheck, 
  ShieldCheck, 
  X, 
  Users, 
  Send
} from 'lucide-react';
import { useWakaf } from '../../hooks/useWakaf';
import type { WakafProgram } from '../../types';

export const WakafPage: React.FC = () => {
  const { wakafList, loading, error } = useWakaf();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // State for "Info Wakaf" Modal (Detail & Flyer)
  const [detailModalItem, setDetailModalItem] = useState<WakafProgram | null>(null);

  // State for "Mulai Wakaf" Modal (Panduan Cara Wakaf)
  const [donateModalItem, setDonateModalItem] = useState<WakafProgram | null>(null);
  const [donateTab, setDonateTab] = useState<'qris' | 'bank' | 'confirm' | 'certificate'>('bank');

  // Confirmation Form state inside Mulai Wakaf modal
  const [wakifName, setWakifName] = useState('');
  const [wakifPhone, setWakifPhone] = useState('');
  const [wakifAmount, setWakifAmount] = useState('');
  const [wakifPrayer, setWakifPrayer] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);

  const categories = [
    'Semua',
    'Wakaf Pembebasan Lahan',
    'Wakaf Pembangunan Gedung',
    "Wakaf Al-Qur'an & Mushaf",
    'Wakaf Produktif & Sarpras'
  ];

  const filteredPrograms = wakafList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.short_desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate totals
  const totalCollected = wakafList.reduce((acc, curr) => acc + curr.collected_amount, 0);
  const totalDonaturs = wakafList.reduce((acc, curr) => acc + curr.donaturs_count, 0);

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleSendConfirmationWA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateModalItem) return;

    const programTitle = donateModalItem.title;
    const formattedAmount = wakifAmount ? `Rp ${Number(wakifAmount).toLocaleString('id-ID')}` : 'Sesuai Bukti Transfer';
    const message = `*KONFIRMASI WAKAF - LEMBAGA WAKAF GMQ*\n\n` +
      `Bismillah, saya ingin mengonfirmasi penyerahan wakaf:\n` +
      `• *Program*: ${programTitle}\n` +
      `• *Nama Wakif*: ${wakifName || '-'}\n` +
      `• *No. WhatsApp*: ${wakifPhone || '-'}\n` +
      `• *Nominal Wakaf*: ${formattedAmount}\n` +
      `• *Doa / Hajat*: ${wakifPrayer || '-'}\n\n` +
      `Mohon dibantu pencatatan dan penerbitan Sertifikat Wakaf resmi. Jazakumullah khairan katsiran.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281288990011?text=${encoded}`, '_blank');
  };

  const openDonateModal = (item: WakafProgram, tab: 'qris' | 'bank' | 'confirm' | 'certificate' = 'bank') => {
    setDonateModalItem(item);
    setDonateTab(tab);
    setCopiedBank(false);
  };

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '90vh', paddingBottom: '5rem' }}>
      
      {/* Hero Section: Emerald Silk Theme */}
      <section style={{ 
        background: 'var(--gradient-green-hero)', 
        color: '#ffffff', 
        padding: '4.5rem 0 3.5rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '4px solid var(--color-gold)'
      }}>
        {/* Decorative Gold & Green Ornaments */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(250, 195, 0, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1.5px solid rgba(250, 195, 0, 0.45)',
              padding: '0.45rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <HeartHandshake size={18} color="var(--color-gold)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '0.04em' }}>
                LEMBAGA WAKAF YAYASAN GRIYA MAHIR AL-QUR'AN (GMQ)
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 800, 
              color: '#ffffff', 
              lineHeight: 1.2, 
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.25)'
            }}>
              Investasi Akhirat Melalui <span style={{ color: 'var(--color-gold)' }}>Wakaf Produktif</span> & Fasilitas Penghafal Al-Qur'an
            </h1>

            <p style={{ 
              fontSize: '1.1rem', 
              color: '#e2f4dc', 
              lineHeight: '1.75', 
              marginBottom: '2rem',
              maxWidth: '780px',
              margin: '0 auto 2rem'
            }}>
              Mengalirkan pahala tak terputus bagi Anda dan keluarga melalui pembebasan lahan pesantren, pembangunan asrama santri, mushaf Al-Qur'an, dan sarana kemandirian dakwah.
            </p>

            {/* Hadith Callout Box */}
            <div style={{
              background: 'rgba(15, 41, 10, 0.55)',
              border: '1px solid rgba(250, 195, 0, 0.35)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.1rem 1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.85rem',
              maxWidth: '740px',
              textAlign: 'left'
            }}>
              <Sparkles size={24} color="var(--color-gold)" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#f3faee', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Jika manusia mati, terputuslah amalnya kecuali tiga perkara: <strong style={{ color: 'var(--color-gold)' }}>sedekah jariyah (wakaf)</strong>, ilmu yang bermanfaat, atau anak shalih yang mendoakannya."
                <span style={{ display: 'block', fontSize: '0.775rem', color: '#c5e2be', fontStyle: 'normal', fontWeight: 700, marginTop: '2px' }}>
                  (HR. Muslim No. 1631)
                </span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Ribbon Metrik & Legalitas Nadzhir */}
      <section style={{ 
        background: '#ffffff', 
        borderBottom: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container" style={{ padding: '1.5rem 1rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ padding: '0.5rem 1rem', borderRight: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-slate)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Total Wakaf Terhimpun
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-green-dark)' }}>
                Rp {totalCollected.toLocaleString('id-ID')}
              </span>
            </div>
            
            <div style={{ padding: '0.5rem 1rem', borderRight: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-slate)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Total Wakif Muhsinin
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                {totalDonaturs.toLocaleString('id-ID')}+ Wakif
              </span>
            </div>

            <div style={{ padding: '0.5rem 1rem', borderRight: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-slate)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Program Wakaf Berjalan
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-gold)' }}>
                {wakafList.length} Program
              </span>
            </div>

            <div style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
              <ShieldCheck size={28} color="var(--color-green)" />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-green-dark)', display: 'block' }}>
                  Nadzhir Terdaftar Resmi
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>
                  Yayasan Griya Mahir Al-Qur'an
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container" style={{ marginTop: '3rem' }}>
        
        {/* Controls: Search & Category Pills */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-green-dark)', letterSpacing: '-0.01em', margin: 0 }}>
                Program Wakaf Yang Sedang Berjalan
              </h2>
              <p style={{ color: 'var(--color-slate)', fontSize: '0.9rem', margin: '4px 0 0' }}>
                Pilih program wakaf pilihan Anda dan tunaikan secara mudah, amanah, dan terverifikasi.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate)' }} />
              <input
                type="text"
                placeholder="Cari program wakaf..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.6rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--border-subtle)',
                  fontSize: '0.875rem',
                  background: '#ffffff',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          {/* Category Filter Pills (Hijau Satin Theme) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-green-dark)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.25rem' }}>
              <Filter size={15} /> Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.825rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  cursor: 'pointer',
                  background: selectedCategory === cat ? 'var(--color-green)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--color-blue)',
                  boxShadow: selectedCategory === cat ? '0 2px 6px rgba(110, 168, 26, 0.35)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: selectedCategory === cat ? 'var(--color-green)' : 'var(--border-subtle)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p style={{ color: 'var(--color-slate)' }}>Memuat program wakaf resmi GMQ...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: 'var(--radius-md)', color: '#991b1b', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPrograms.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#ffffff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <HeartHandshake size={48} color="var(--color-green)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-blue)' }}>Program Tidak Ditemukan</h3>
            <p style={{ color: 'var(--color-slate)', maxWidth: '400px', margin: '0.5rem auto 1.5rem' }}>
              Tidak ada program wakaf yang cocok dengan pencarian atau filter kategori yang dipilih.
            </p>
            <button 
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="btn btn-outline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Cards Grid: Layout Persis Menu Unit Pendidikan */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {filteredPrograms.map((program) => {
            const percent = Math.min(100, Math.round((program.collected_amount / program.target_amount) * 100));
            const isCompleted = program.status === 'completed' || percent >= 100;

            return (
              <div 
                key={program.id}
                className="card card-prestige"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {/* Flyer / Header Image */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: '#f1f5f9' }}>
                  <img 
                    src={program.flyer_image} 
                    alt={program.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    className="unit-card-img"
                  />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(24, 65, 14, 0.88)',
                    color: '#ffffff',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(250, 195, 0, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <HeartHandshake size={13} color="var(--color-gold)" />
                    <span>{program.category}</span>
                  </div>

                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '0.85rem',
                    right: '0.85rem',
                    background: isCompleted ? '#059669' : '#d97706',
                    color: '#ffffff',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    {isCompleted ? 'Tercapai 100%' : 'Program Berjalan'}
                  </div>
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  
                  <h3 style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: 800, 
                    color: 'var(--color-green-dark)', 
                    marginBottom: '0.65rem',
                    lineHeight: 1.35,
                    minHeight: '2.7rem'
                  }}>
                    {program.title}
                  </h3>

                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--color-slate)', 
                    lineHeight: 1.6, 
                    marginBottom: '1.25rem',
                    flex: 1
                  }}>
                    {program.short_desc}
                  </p>

                  {/* Progress Bar & Stats */}
                  <div style={{ 
                    background: 'var(--color-green-subtle)', 
                    padding: '0.9rem', 
                    borderRadius: 'var(--radius-md)', 
                    marginBottom: '1.25rem',
                    border: '1px solid rgba(110, 168, 26, 0.25)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-green-dark)' }}>
                        Dana Terhimpun ({percent}%)
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-gold-dark)' }}>
                        Target: Rp {program.target_amount.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                      <div style={{ 
                        width: `${percent}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, var(--color-green) 0%, var(--color-gold) 100%)',
                        borderRadius: '4px'
                      }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-green-dark)' }}>
                        Rp {program.collected_amount.toLocaleString('id-ID')}
                      </span>
                      <span style={{ color: 'var(--color-slate)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Users size={13} /> {program.donaturs_count} Wakif
                      </span>
                    </div>
                  </div>

                  {/* 2 ACTION BUTTONS: "Info Wakaf" & "Mulai Wakaf" */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: 'auto' }}>
                    
                    {/* Tombol Info Wakaf (Gantikan Brosur Lengkap) */}
                    <button
                      onClick={() => setDetailModalItem(program)}
                      className="btn btn-outline"
                      style={{
                        padding: '0.6rem 0.75rem',
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        borderColor: 'var(--color-green)',
                        color: 'var(--color-green-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <BookOpen size={15} />
                      <span>Info Wakaf</span>
                    </button>

                    {/* Tombol Mulai Wakaf (Gantikan Daftar Unit) */}
                    <button
                      onClick={() => openDonateModal(program, 'bank')}
                      className="btn btn-gold"
                      style={{
                        padding: '0.6rem 0.75rem',
                        fontSize: '0.825rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <HeartHandshake size={15} />
                      <span>Mulai Wakaf</span>
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          MODAL 1: INFO WAKAF (Detail Deskripsi Lengkap & Flyer Image)
          ===================================================================== */}
      {detailModalItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '1.25rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            border: '2px solid var(--color-gold)'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'var(--gradient-green-hero)',
              color: '#ffffff',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px solid var(--color-gold)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <HeartHandshake size={20} color="var(--color-gold)" />
                <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.02em' }}>
                  INFORMASI LENGKAP PROGRAM WAKAF
                </span>
              </div>
              <button
                onClick={() => setDetailModalItem(null)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              
              {/* Flyer High-Res Preview */}
              <div style={{ 
                borderRadius: 'var(--radius-md)', 
                overflow: 'hidden', 
                marginBottom: '1.25rem',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img 
                  src={detailModalItem.flyer_image} 
                  alt={detailModalItem.title} 
                  style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Title & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{
                  background: 'var(--color-green-subtle)',
                  color: 'var(--color-green-dark)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.65rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {detailModalItem.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate)' }}>
                  ID Program: {detailModalItem.id}
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-green-dark)', marginBottom: '1rem', lineHeight: 1.3 }}>
                {detailModalItem.title}
              </h2>

              {/* Deskripsi Lengkap */}
              <div style={{ 
                fontSize: '0.925rem', 
                color: 'var(--color-slate-dark)', 
                lineHeight: 1.8, 
                whiteSpace: 'pre-line',
                marginBottom: '1.5rem',
                background: '#f8fafc',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #e2e8f0'
              }}>
                {detailModalItem.full_desc}
              </div>

              {/* Financial Box */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1rem', 
                background: 'var(--color-green-subtle)', 
                padding: '1rem', 
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                border: '1px solid rgba(110, 168, 26, 0.25)'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-slate)', display: 'block' }}>Kebutuhan Target:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                    Rp {detailModalItem.target_amount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-slate)', display: 'block' }}>Perolehan Terkumpul:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-green-dark)' }}>
                    Rp {detailModalItem.collected_amount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Nadzhir Certificate Assurance */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fffbeb', border: '1px solid #fef3c7', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <Award size={24} color="#d97706" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#92400e', lineHeight: 1.5 }}>
                  <strong>Jaminan Sertifikat Wakaf:</strong> Setiap penyerahan wakaf untuk program ini akan diterbitkan <em>Akta & Sertifikat Wakaf Resmi</em> berlegalitas Yayasan Griya Mahir Al-Qur'an.
                </span>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{ 
              padding: '1rem 1.5rem', 
              background: '#f8fafc', 
              borderTop: '1px solid var(--border-subtle)', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => setDetailModalItem(null)}
                className="btn btn-outline"
                style={{ fontSize: '0.85rem' }}
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  const target = detailModalItem;
                  setDetailModalItem(null);
                  openDonateModal(target, 'bank');
                }}
                className="btn btn-gold"
                style={{ fontSize: '0.875rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <HeartHandshake size={16} />
                <span>Lanjut Salurkan Wakaf</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: MULAI WAKAF (Petunjuk Cara Wakaf: QRIS, Transfer, Konfirmasi, Sertifikat)
          ===================================================================== */}
      {donateModalItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '1.25rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            border: '2.5px solid var(--color-gold)'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'var(--gradient-green-hero)',
              color: '#ffffff',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px solid var(--color-gold)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HeartHandshake size={20} color="var(--color-gold)" />
                  <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.02em' }}>
                    PANDUAN & PENYALURAN WAKAF
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#c5e2be', display: 'block', marginTop: '2px' }}>
                  {donateModalItem.title}
                </span>
              </div>
              <button
                onClick={() => setDonateModalItem(null)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Step Navigation Tabs */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              background: '#f1f5f9', 
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              <button
                onClick={() => setDonateTab('bank')}
                style={{
                  padding: '0.75rem 0.25rem',
                  border: 'none',
                  background: donateTab === 'bank' ? '#ffffff' : 'transparent',
                  color: donateTab === 'bank' ? 'var(--color-green-dark)' : 'var(--color-slate)',
                  borderBottom: donateTab === 'bank' ? '3px solid var(--color-green)' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
                1. Transfer Bank
              </button>

              <button
                onClick={() => setDonateTab('qris')}
                style={{
                  padding: '0.75rem 0.25rem',
                  border: 'none',
                  background: donateTab === 'qris' ? '#ffffff' : 'transparent',
                  color: donateTab === 'qris' ? 'var(--color-green-dark)' : 'var(--color-slate)',
                  borderBottom: donateTab === 'qris' ? '3px solid var(--color-green)' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
                2. QRIS Scan
              </button>

              <button
                onClick={() => setDonateTab('confirm')}
                style={{
                  padding: '0.75rem 0.25rem',
                  border: 'none',
                  background: donateTab === 'confirm' ? '#ffffff' : 'transparent',
                  color: donateTab === 'confirm' ? 'var(--color-green-dark)' : 'var(--color-slate)',
                  borderBottom: donateTab === 'confirm' ? '3px solid var(--color-green)' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
                3. Konfirmasi WA
              </button>

              <button
                onClick={() => setDonateTab('certificate')}
                style={{
                  padding: '0.75rem 0.25rem',
                  border: 'none',
                  background: donateTab === 'certificate' ? '#ffffff' : 'transparent',
                  color: donateTab === 'certificate' ? 'var(--color-green-dark)' : 'var(--color-slate)',
                  borderBottom: donateTab === 'certificate' ? '3px solid var(--color-green)' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
                4. Sertifikat
              </button>
            </div>

            {/* Tab Contents */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              
              {/* TAB 1: TRANSFER BANK */}
              {donateTab === 'bank' && (
                <div>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #18410e 0%, #204d74 100%)', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: '1.5rem', 
                    color: '#ffffff',
                    position: 'relative',
                    boxShadow: 'var(--shadow-md)',
                    border: '1.5px solid var(--color-gold)',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>
                          REKENING KHUSUS WAKAF
                        </span>
                        <h4 style={{ margin: '2px 0 0', fontSize: '1.1rem', fontWeight: 800 }}>
                          {donateModalItem.bank_name}
                        </h4>
                      </div>
                      <Landmark size={28} color="var(--color-gold)" />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#c5e2be', display: 'block', marginBottom: '4px' }}>
                        Nomor Rekening:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.08em', color: '#ffffff' }}>
                          {donateModalItem.bank_account}
                        </span>
                        <button
                          onClick={() => handleCopyAccount(donateModalItem.bank_account)}
                          style={{
                            background: copiedBank ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.2)',
                            color: copiedBank ? '#18410e' : '#ffffff',
                            border: 'none',
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s'
                          }}
                        >
                          <Copy size={13} />
                          <span>{copiedBank ? 'Tersalin!' : 'Salin Rekening'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#c5e2be', display: 'block' }}>
                        Atas Nama Penerima:
                      </span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                        {donateModalItem.bank_holder}
                      </span>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: 'var(--color-slate-dark)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--color-blue)', display: 'block', marginBottom: '4px' }}>Petunjuk Transfer:</strong>
                    <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                      <li>Buka mobile banking (BSI Mobile, Livin, BCA Mobile, dll) atau ATM pilihan Anda.</li>
                      <li>Masukkan Nomor Rekening <strong>{donateModalItem.bank_account}</strong> (Bank BSI - Kode Bank: 451).</li>
                      <li>Masukkan nominal wakaf yang ingin Anda salurkan.</li>
                      <li>Simpan bukti transfer / struk pembayaran.</li>
                      <li>Lanjutkan ke tab <strong>"3. Konfirmasi WA"</strong> agar tim Nadzhir menerbitkan Akta & Sertifikat Wakaf Anda.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* TAB 2: QRIS SCAN */}
              {donateTab === 'qris' && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-slate)', marginBottom: '1.25rem' }}>
                    Scan QRIS resmi Lembaga Wakaf Yayasan Griya Mahir Al-Qur'an melalui aplikasi m-Banking atau e-Wallet apapun:
                  </p>

                  <div style={{
                    display: 'inline-block',
                    background: '#ffffff',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                    border: '2px solid var(--color-green-border)',
                    marginBottom: '1.25rem'
                  }}>
                    {/* Simulated QRIS Code Card */}
                    <div style={{ width: '220px', height: '220px', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-green)', borderRadius: 'var(--radius-md)', margin: '0 auto' }}>
                      <QrCode size={110} color="var(--color-green-dark)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-green-dark)', marginTop: '8px' }}>
                        QRIS WAKAF GMQ
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-slate)' }}>NMID: ID1024356789123</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {['BCA Mobile', 'Livin Mandiri', 'BSI Mobile', 'GoPay', 'OVO', 'ShopeePay', 'Dana'].map((app) => (
                      <span key={app} style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', color: 'var(--color-slate)' }}>
                        ✓ {app}
                      </span>
                    ))}
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--color-slate-dark)', fontStyle: 'italic' }}>
                    Setelah berhasil melakukan pembayaran QRIS, silakan screenshot bukti transaksi dan lakukan konfirmasi pada tab berikutnya.
                  </p>
                </div>
              )}

              {/* TAB 3: KONFIRMASI WA */}
              {donateTab === 'confirm' && (
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-slate)', marginBottom: '1rem' }}>
                    Lengkapi formulir singkat ini. Sistem akan otomatis menyusun pesan WhatsApp resmi ke Layanan Nadzhir Wakaf GMQ:
                  </p>

                  <form onSubmit={handleSendConfirmationWA} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                        Nama Wakif / Atas Nama Wakaf *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: H. Ahmad Subagio / Almarhum Ayahanda"
                        value={wakifName}
                        onChange={(e) => setWakifName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.875rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                          Nomor WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0812xxxxxxxx"
                          value={wakifPhone}
                          onChange={(e) => setWakifPhone(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.65rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1.5px solid var(--border-subtle)',
                            fontSize: '0.875rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                          Nominal Wakaf (Rp)
                        </label>
                        <input
                          type="number"
                          placeholder="Contoh: 1000000"
                          value={wakifAmount}
                          onChange={(e) => setWakifAmount(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.65rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1.5px solid var(--border-subtle)',
                            fontSize: '0.875rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '4px' }}>
                        Pesan Khusus / Doa / Hajat Wakif
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tuliskan permohonan doa untuk didoakan bersama santri tahfidz..."
                        value={wakifPrayer}
                        onChange={(e) => setWakifPrayer(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.875rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-gold"
                      style={{
                        padding: '0.8rem',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem'
                      }}
                    >
                      <Send size={16} />
                      <span>Kirim Konfirmasi ke WhatsApp Admin Wakaf</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: SERTIFIKAT & AKTA WAKAF */}
              {donateTab === 'certificate' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      padding: '1rem',
                      background: 'rgba(250, 195, 0, 0.15)',
                      borderRadius: '50%',
                      color: 'var(--color-gold-dark)',
                      marginBottom: '0.75rem'
                    }}>
                      <Award size={36} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-green-dark)', margin: 0 }}>
                      Sertifikat & Akta Ikrar Wakaf Sah
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-slate)', margin: '4px 0 0' }}>
                      Transparansi dan akuntabilitas penuh bagi setiap wakif di Yayasan Griya Mahir Al-Qur'an
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '0.85rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <FileCheck size={24} color="var(--color-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ fontSize: '0.875rem', color: 'var(--color-blue)', display: 'block' }}>
                          1. Penerbitan Sertifikat Digital (E-Certificate)
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-dark)', lineHeight: 1.5 }}>
                          Diterbitkan secara resmi dalam format PDF ber-barcode keabsahan dalam 1x24 jam setelah konfirmasi wakaf diverifikasi.
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.85rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <Landmark size={24} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ fontSize: '0.875rem', color: 'var(--color-blue)', display: 'block' }}>
                          2. Sertifikat Cetak & Plakat Kehormatan Wakif
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-dark)', lineHeight: 1.5 }}>
                          Bagi wakaf pembebasan lahan atau pembangunan gedung (minimal 1 m² / Rp 1.000.000), sertifikat fisik berbingkai dapat dikirimkan langsung ke alamat rumah wakif.
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.85rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <Users size={24} color="var(--color-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ fontSize: '0.875rem', color: 'var(--color-blue)', display: 'block' }}>
                          3. Laporan Berkala & Doa Bersama Santri Tahfidz
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-dark)', lineHeight: 1.5 }}>
                          Wakif akan menerima buletin laporan fisik progres pemanfaatan wakaf setiap bulan, dan nama wakif/keluarga diikutsertakan dalam munajat doa bersama para santri penghafal 30 juz.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Switcher */}
            <div style={{
              padding: '1rem 1.5rem',
              background: '#f8fafc',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {donateTab !== 'bank' ? (
                <button
                  onClick={() => setDonateTab('bank')}
                  className="btn btn-sm btn-outline"
                >
                  ← Kembali ke Bank
                </button>
              ) : (
                <button
                  onClick={() => setDonateModalItem(null)}
                  className="btn btn-sm btn-outline"
                >
                  Tutup
                </button>
              )}

              {donateTab === 'bank' && (
                <button
                  onClick={() => setDonateTab('confirm')}
                  className="btn btn-sm btn-gold"
                  style={{ fontWeight: 800 }}
                >
                  Sudah Transfer? Konfirmasi WA →
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
