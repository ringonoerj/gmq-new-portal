import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export const WhatsAppButton: React.FC = () => {
  const { config } = useSiteConfig();
  const cleanPhone = config.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=Halo%20Tim%20GMQ,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20portal%20dan%20solusi%20enterprise.`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp GMQ"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99,
        background: '#25D366',
        color: '#ffffff',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
      }}
    >
      <MessageCircle size={30} fill="#ffffff" stroke="#25D366" strokeWidth={1} />
    </a>
  );
};
