import React, { useState, useEffect } from 'react';
import Marquee from './components/Marquee';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Dedicated React Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MuhurthamPage from './pages/MuhurthamPage';
import PitruSevaPage from './pages/PitruSevaPage';
import RemediesPage from './pages/RemediesPage';
import RemedyDetailPage from './pages/RemedyDetailPage';
import SmartamPage from './pages/SmartamPage';
import SmartaSevaPage from './pages/SmartaSevaPage';
import KamyamuPage from './pages/KamyamuPage';
import GosevaPage from './pages/GosevaPage';
import VedicSchoolPage from './pages/VedicSchoolPage';
import ContactPage from './pages/ContactPage';

const VALID_PAGES = [
  'home',
  'about',
  'muhurtham',
  'pitru-seva',
  'godhanam',
  'goseva',
  'smartam',
  'smarta-seva',
  'kamyamu',
  'kamayamu',
  'remedies',
  'vedic-school',
  'vedicschool',
  'vedic',
  'events',
  'contact'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentRemedyId, setCurrentRemedyId] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    serviceName: '',
  });

  // Sync navigation with browser URL hash
  useEffect(() => {
    const handleLocationChange = () => {
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      const lower = rawHash.toLowerCase();

      if (lower.startsWith('remedy/')) {
        const remId = lower.replace('remedy/', '');
        setCurrentPage('remedy-detail');
        setCurrentRemedyId(remId);
      } else if (VALID_PAGES.includes(lower)) {
        setCurrentPage(lower);
        setCurrentRemedyId(null);
      } else if (!lower) {
        setCurrentPage('home');
        setCurrentRemedyId(null);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const navigateTo = (page) => {
    const lower = page.toLowerCase();

    if (lower.startsWith('remedy/')) {
      const remId = lower.replace('remedy/', '');
      setCurrentPage('remedy-detail');
      setCurrentRemedyId(remId);
      window.location.hash = `/${lower}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (VALID_PAGES.includes(lower)) {
      setCurrentPage(lower);
      setCurrentRemedyId(null);
      window.location.hash = `/${lower}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (serviceName) => {
    setModalState({
      isOpen: true,
      serviceName,
    });
  };

  const handleCloseBooking = () => {
    setModalState({
      isOpen: false,
      serviceName: '',
    });
  };

  // Render the active dedicated React Page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'remedy-detail':
        return (
          <RemedyDetailPage
            remedyId={currentRemedyId}
            onNavigate={navigateTo}
            onBook={handleOpenBooking}
          />
        );
      case 'about':
        return <AboutPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'muhurtham':
        return <MuhurthamPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'pitru-seva':
        return <PitruSevaPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'remedies':
        return <RemediesPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'smartam':
        return <SmartamPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'smarta-seva':
        return <SmartaSevaPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'kamyamu':
      case 'kamayamu':
      case 'events':
        return <KamyamuPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'vedic-school':
      case 'vedicschool':
      case 'vedic':
        return <VedicSchoolPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'godhanam':
      case 'goseva':
        return <GosevaPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigateTo} onBook={handleOpenBooking} />;
    }
  };

  return (
    <div className="react-app-root">
      {/* Devotional Preheader Ticker */}
      <Marquee />

      {/* 1. Header Navigation */}
      <Header
        activeTab={currentPage === 'remedy-detail' ? 'remedies' : currentPage}
        onSelectTab={navigateTo}
        onOpenQuickBooking={() => handleOpenBooking('Vedic Ritual / Seva Booking')}
      />

      {/* Main Dynamic React Page Mount */}
      <main className="react-page-content" role="main">
        {renderCurrentPage()}
      </main>

      {/* 8. Footer */}
      <Footer onNavigate={navigateTo} pageMode={currentPage} />

      {/* Floating Quick Action - Removed from Home page as requested */}
      {currentPage !== 'home' && (
        <div className="floating-action">
          <button
            type="button"
            className="floating-btn"
            aria-label="Quick WhatsApp Seva Booking"
            onClick={() => handleOpenBooking('Devotee Inquiry & Seva')}
          >
            <span>🪔</span>
            <span>Book Seva</span>
          </button>
        </div>
      )}

      {/* Booking Modal Dialog */}
      <BookingModal
        isOpen={modalState.isOpen}
        serviceName={modalState.serviceName}
        onClose={handleCloseBooking}
      />
    </div>
  );
}
