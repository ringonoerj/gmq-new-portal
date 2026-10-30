import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { NewsPage } from './pages/public/NewsPage';
import { NewsDetailPage } from './pages/public/NewsDetailPage';
import { ContactPage } from './pages/public/ContactPage';
import { WakafPage } from './pages/public/WakafPage';
import { AdminEntryPage } from './pages/admin/AdminEntryPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Public Portal Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/layanan" element={<ServicesPage />} />
              <Route path="/wakaf" element={<WakafPage />} />
              <Route path="/berita" element={<NewsPage />} />
              <Route path="/berita/:slug" element={<NewsDetailPage />} />
              <Route path="/kontak" element={<ContactPage />} />

              {/* Admin & CMS Backoffice */}
              <Route path="/admin/*" element={<AdminEntryPage />} />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </AuthProvider>
  );
}
