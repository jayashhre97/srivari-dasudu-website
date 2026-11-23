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
import RemedyItemPage from './pages/RemedyItemPage';
import SmartamPage from './pages/SmartamPage';
import SmartaSevaPage from './pages/SmartaSevaPage';
import KamyamuPage from './pages/KamyamuPage';
import GosevaPage from './pages/GosevaPage';
import VedicSchoolPage from './pages/VedicSchoolPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

const VALID_PAGES = [
  'home',
  'about',
  'muhurtham',
  'pitru-seva',
  'godhanam',
  'goseva',
  'gouseva',
  'smartam',
  'smarta-seva',
  'kamyamu',
  'kamayamu',
  'remedies',
  'vedic-school',
  'vedicschool',
  'vedic',
  'events',
  'contact',
  'admin'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentRemedyId, setCurrentRemedyId] = useState(null);
  const [currentRemedyItemNo, setCurrentRemedyItemNo] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    serviceName: '',
    pricingType: null,
    havanamId: null,
    onBooked: null,
  });

  const parseRemedyRoute = (lower) => {
    const remPath = lower.replace('remedy/', '');
    const parts = remPath.split('/').filter(Boolean);
    if (parts.length >= 2 && /^\d+$/.test(parts[1])) {
      return { page: 'remedy-item', categoryId: parts[0], itemNo: parts[1] };
    }
    return { page: 'remedy-detail', categoryId: parts[0] || remPath, itemNo: null };
  };

  // Sync navigation with browser URL hash
  useEffect(() => {
    const handleLocationChange = () => {
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      const lower = rawHash.toLowerCase();

      if (lower.startsWith('remedy/')) {
        const route = parseRemedyRoute(lower);
        setCurrentPage(route.page);
        setCurrentRemedyId(route.categoryId);
        setCurrentRemedyItemNo(route.itemNo);
      } else if (VALID_PAGES.includes(lower)) {
        setCurrentPage(lower);
        setCurrentRemedyId(null);
        setCurrentRemedyItemNo(null);
      } else if (!lower) {
        setCurrentPage('home');
        setCurrentRemedyId(null);
        setCurrentRemedyItemNo(null);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const navigateTo = (page) => {
    const lower = page.toLowerCase();

    if (lower.startsWith('remedy/')) {
      const route = parseRemedyRoute(lower);
      setCurrentPage(route.page);
      setCurrentRemedyId(route.categoryId);
      setCurrentRemedyItemNo(route.itemNo);
      window.location.hash = `/${lower}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (VALID_PAGES.includes(lower)) {
      setCurrentPage(lower);
      setCurrentRemedyId(null);
      setCurrentRemedyItemNo(null);
      window.location.hash = `/${lower}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (serviceNameOrOptions) => {
    if (typeof serviceNameOrOptions === 'object' && serviceNameOrOptions) {
      setModalState({
        isOpen: true,
        serviceName: serviceNameOrOptions.serviceName || '',
        pricingType: serviceNameOrOptions.pricingType || null,
        havanamId: serviceNameOrOptions.havanamId || null,
        onBooked: serviceNameOrOptions.onBooked || null,
      });
      return;
    }
    setModalState({
      isOpen: true,
      serviceName: serviceNameOrOptions || '',
      pricingType: null,
      havanamId: null,
      onBooked: null,
    });
  };

  const handleCloseBooking = () => {
    setModalState({
      isOpen: false,
      serviceName: '',
      pricingType: null,
      havanamId: null,
      onBooked: null,
    });
  };

  // Render the active dedicated React Page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'remedy-item':
        return (
          <RemedyItemPage
            categoryId={currentRemedyId}
            itemNo={currentRemedyItemNo}
            onNavigate={navigateTo}
            onBook={handleOpenBooking}
          />
        );
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
      case 'gouseva':
        return <GosevaPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} onBook={handleOpenBooking} />;
      case 'admin':
        return <AdminPage onNavigate={navigateTo} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigateTo} onBook={handleOpenBooking} />;
    }
  };

  const isAdmin = currentPage === 'admin';

  return (
    <div className="react-app-root">
      {/* Devotional Preheader Ticker */}
      {!isAdmin && <Marquee />}

      {/* 1. Header Navigation */}
      {!isAdmin && (
        <Header
          activeTab={
            currentPage === 'remedy-detail' || currentPage === 'remedy-item'
              ? 'remedies'
              : currentPage
          }
          onSelectTab={navigateTo}
          onOpenQuickBooking={(service = 'Vedic Ritual / Seva Booking', pricingType = 'general', havanamId = null) =>
            handleOpenBooking(service, pricingType, havanamId)
          }
        />
      )}

      {/* Main Dynamic React Page Mount */}
      <main className="react-page-content" role="main">
        {renderCurrentPage()}
      </main>

      {/* 8. Footer */}
      {!isAdmin && <Footer onNavigate={navigateTo} pageMode={currentPage} />}

      {/* Booking Modal Dialog */}
      {!isAdmin && (
        <BookingModal
          isOpen={modalState.isOpen}
          serviceName={modalState.serviceName}
          pricingType={modalState.pricingType}
          havanamId={modalState.havanamId}
          onBooked={modalState.onBooked}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
}
