import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Trash2, 
  Eye, 
  Search, 
  X
} from 'lucide-react';
import type { Inquiry, InquiryStatus } from '../../types';

interface AdminInquiriesTabProps {
  inquiries: Inquiry[];
  onChangeStatus: (id: string, status: InquiryStatus) => Promise<Inquiry>;
  onRemoveInquiry: (id: string) => Promise<void>;
}

export const AdminInquiriesTab: React.FC<AdminInquiriesTabProps> = ({
  inquiries,
  onChangeStatus,
  onRemoveInquiry
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [activeModalInquiry, setActiveModalInquiry] = useState<Inquiry | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchQuery = inq.name.toLowerCase().includes(search.toLowerCase()) ||
                       inq.subject.toLowerCase().includes(search.toLowerCase()) ||
                       inq.phone.includes(search) ||
                       inq.message.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchQuery;
  });

  const handleStatusUpdate = async (id: string, newStatus: InquiryStatus) => {
    try {
      await onChangeStatus(id, newStatus);
      setFeedbackMsg({ type: 'success', text: `Status berhasil diubah menjadi "${newStatus === 'new' ? 'Baru' : newStatus === 'in_progress' ? 'Sedang Dihubungi' : 'Selesai'}"` });
      if (activeModalInquiry && activeModalInquiry.id === id) {
        setActiveModalInquiry((prev) => prev ? { ...prev, status: newStatus } : null);
      }
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch {
      setFeedbackMsg({ type: 'error', text: 'Gagal memperbarui status.' });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus data permohonan dari ${name}?`)) {
      await onRemoveInquiry(id);
      if (activeModalInquiry && activeModalInquiry.id === id) {
        setActiveModalInquiry(null);
      }
      setFeedbackMsg({ type: 'success', text: 'Permohonan berhasil dihapus.' });
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  const createWhatsAppLink = (inq: Inquiry) => {
    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
    let formattedPhone = cleanPhone;
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }
    const message = `Assalamu'alaikum wr. wb. Bapak/Ibu ${inq.name},\n\nKami dari Sekretariat Yayasan Griya Mahir Al-Qur'an (GMQ) menindaklanjuti permohonan pendaftaran / konsultasi Anda mengenai:\n"${inq.subject}".\n\nApakah ada waktu luang untuk kami jelaskan lebih lanjut mengenai alur pendaftaran dan jadwal talaqqi? Terima kasih.`;
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.65rem', color: 'var(--color-blue)', margin: '0 0 0.35rem', fontWeight: 800 }}>
          Pendaftaran Masuk & Pesan Konsultasi (PSB)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Tindak lanjuti formulir pendaftaran calon santri baru, pertanyaan orang tua wali, serta konfirmasi infaq/wakaf dakwah Qur'an.
        </p>
      </div>

      {feedbackMsg && (
        <div style={{ 
          background: feedbackMsg.type === 'success' ? 'var(--color-green-subtle)' : '#fee2e2', 
          border: `1px solid ${feedbackMsg.type === 'success' ? 'var(--color-green)' : '#f87171'}`,
          color: feedbackMsg.type === 'success' ? 'var(--color-green-dark)' : '#991b1b',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          {feedbackMsg.text}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--color-green)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Cari nama, nomor WA, subjek..." 
            style={{ paddingLeft: '2.4rem', fontSize: '0.875rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setStatusFilter('all')}
            style={{
              background: statusFilter === 'all' ? 'var(--color-blue)' : '#ffffff',
              color: statusFilter === 'all' ? '#ffffff' : 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              border: statusFilter === 'all' ? '1px solid var(--color-blue)' : '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            Semua ({inquiries.length})
          </button>
          <button
            onClick={() => setStatusFilter('new')}
            style={{
              background: statusFilter === 'new' ? '#e11d48' : '#ffffff',
              color: statusFilter === 'new' ? '#ffffff' : '#e11d48',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #e11d48',
              cursor: 'pointer'
            }}
          >
            Baru ({inquiries.filter((i) => i.status === 'new').length})
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            style={{
              background: statusFilter === 'in_progress' ? 'var(--color-gold-dark)' : '#ffffff',
              color: statusFilter === 'in_progress' ? '#ffffff' : 'var(--color-gold-dark)',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-gold-dark)',
              cursor: 'pointer'
            }}
          >
            Dihubungi ({inquiries.filter((i) => i.status === 'in_progress').length})
          </button>
          <button
            onClick={() => setStatusFilter('resolved')}
            style={{
              background: statusFilter === 'resolved' ? 'var(--color-green)' : '#ffffff',
              color: statusFilter === 'resolved' ? '#ffffff' : 'var(--color-green-dark)',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-green)',
              cursor: 'pointer'
            }}
          >
            Selesai ({inquiries.filter((i) => i.status === 'resolved').length})
          </button>
        </div>
      </div>

      {/* Table of Inquiries */}
      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Nama Pemohon</th>
                <th style={{ padding: '1rem 1.25rem' }}>Keperluan / Unit</th>
                <th style={{ padding: '1rem 1.25rem' }}>Kontak</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem' }}>Tanggal</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} style={{ borderBottom: '1px solid var(--border-subtle)', background: inq.status === 'new' ? 'rgba(254, 242, 242, 0.45)' : 'transparent' }}>
                  
                  {/* Name */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-blue)', fontSize: '0.95rem' }}>
                      {inq.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {inq.email}
                    </div>
                  </td>

                  {/* Subject */}
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '240px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-blue-dark)', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {inq.subject}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {inq.message}
                    </div>
                  </td>

                  {/* Contact */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {inq.phone}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusUpdate(inq.id, e.target.value as InquiryStatus)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: '1px solid var(--border-subtle)',
                        background: inq.status === 'new' ? '#ffe4e6' : inq.status === 'in_progress' ? '#fef3c7' : '#dcfce7',
                        color: inq.status === 'new' ? '#9f1239' : inq.status === 'in_progress' ? '#92400e' : '#166534'
                      }}
                    >
                      <option value="new">🔴 Baru</option>
                      <option value="in_progress">🟡 Dihubungi</option>
                      <option value="resolved">🟢 Selesai</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(inq.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                      
                      {/* WhatsApp Direct */}
                      {inq.phone && inq.phone !== '-' && (
                        <a 
                          href={createWhatsAppLink(inq)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-gold"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
                          title="Buka WhatsApp & Kirim Jawaban"
                          onClick={() => {
                            if (inq.status === 'new') {
                              handleStatusUpdate(inq.id, 'in_progress');
                            }
                          }}
                        >
                          <MessageCircle size={13} />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {/* Detail Modal Button */}
                      <button 
                        onClick={() => setActiveModalInquiry(inq)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: 'var(--color-blue)' }}
                        title="Baca Pesan Lengkap"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Delete */}
                      <button 
                        onClick={() => handleDelete(inq.id, inq.name)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: '#e11d48', borderColor: 'rgba(225, 29, 72, 0.3)' }}
                        title="Hapus Permohonan"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <Mail size={36} color="var(--color-green)" style={{ margin: '0 auto 0.75rem' }} />
                    <p style={{ margin: 0 }}>Tidak ada permohonan atau pesan yang cocok.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Pesan Masuk */}
      {activeModalInquiry && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 30, 45, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-xl)',
            borderTop: '6px solid var(--color-green)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={20} color="var(--color-green)" />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-blue)', margin: 0, fontWeight: 800 }}>
                  Detail Permohonan / Pendaftaran
                </h3>
              </div>
              <button 
                onClick={() => setActiveModalInquiry(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Nama Pemohon</small>
                  <div style={{ fontWeight: 700, color: 'var(--color-blue)' }}>{activeModalInquiry.name}</div>
                </div>
                <div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Tanggal Masuk</small>
                  <div style={{ fontWeight: 600 }}>{new Date(activeModalInquiry.created_at).toLocaleString('id-ID')}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Nomor WhatsApp</small>
                  <div style={{ fontWeight: 700, color: 'var(--color-green-dark)' }}>{activeModalInquiry.phone}</div>
                </div>
                <div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Alamat Email</small>
                  <div>{activeModalInquiry.email}</div>
                </div>
              </div>

              <div>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Pilihan Unit / Subjek</small>
                <div style={{ fontWeight: 700, color: 'var(--color-blue-dark)' }}>{activeModalInquiry.subject}</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--color-blue-dark)', marginBottom: '0.5rem' }}>Isi Pesan / Keterangan Calon Santri:</h4>
              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: 'var(--text-main)' }}>
                {activeModalInquiry.message}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <div>
                <select
                  value={activeModalInquiry.status}
                  onChange={(e) => handleStatusUpdate(activeModalInquiry.id, e.target.value as InquiryStatus)}
                  className="form-select"
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
                >
                  <option value="new">🔴 Status: Baru</option>
                  <option value="in_progress">🟡 Status: Sedang Dihubungi</option>
                  <option value="resolved">🟢 Status: Selesai</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {activeModalInquiry.phone && activeModalInquiry.phone !== '-' && (
                  <a 
                    href={createWhatsAppLink(activeModalInquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ fontSize: '0.85rem', gap: '0.4rem', fontWeight: 700 }}
                  >
                    <MessageCircle size={15} />
                    <span>Balas via WA</span>
                  </a>
                )}
                <button 
                  onClick={() => setActiveModalInquiry(null)}
                  className="btn btn-outline"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
