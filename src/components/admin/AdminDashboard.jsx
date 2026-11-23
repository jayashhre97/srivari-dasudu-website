import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import AdminRecentActivities from './AdminRecentActivities';
import AdminKamyamu from './AdminKamyamu';
import AdminSmartam from './AdminSmartam';
import AdminSmartaSeva from './AdminSmartaSeva';
import AdminRemedies from './AdminRemedies';
import AdminGoseva from './AdminGoseva';
import AdminVedicSchool from './AdminVedicSchool';
import AdminContact from './AdminContact';

const ADMIN_SECTIONS = [
  { id: 'recent-activities', label: 'Recent Activities', icon: '🏠' },
  { id: 'kamyamu', label: 'Kamyamu Homams', icon: '🔥' },
  { id: 'smartam', label: 'Smartam Functions', icon: '📿' },
  { id: 'smarta-seva', label: 'Smarta Seva', icon: '🪔' },
  { id: 'remedies', label: 'Remedies', icon: '💊' },
  { id: 'goseva', label: 'Gouseva', icon: '🐄' },
  { id: 'vedic-school', label: 'Vedic School', icon: '📚' },
  { id: 'contact', label: 'Contact Info', icon: '📞' }
];

export default function AdminDashboard({ user }) {
  const [activeSection, setActiveSection] = useState('recent-activities');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('srivari_admin_logged_in');
    try {
      await signOut(auth);
    } catch (e) {}
    window.location.hash = '/home';
    window.location.reload();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'recent-activities': return <AdminRecentActivities />;
      case 'kamyamu': return <AdminKamyamu />;
      case 'smartam': return <AdminSmartam />;
      case 'smarta-seva': return <AdminSmartaSeva />;
      case 'remedies': return <AdminRemedies />;
      case 'goseva': return <AdminGoseva />;
      case 'vedic-school': return <AdminVedicSchool />;
      case 'contact': return <AdminContact />;
      default: return <AdminRecentActivities />;
    }
  };

  const currentLabel = ADMIN_SECTIONS.find(s => s.id === activeSection)?.label || '';

  return (
    <div className="admin-dashboard">
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <button className="admin-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <span className="admin-mobile-title">{currentLabel}</span>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2>🙏 Admin Panel</h2>
          <p className="admin-user-email">{user?.email}</p>
        </div>

        <nav className="admin-nav">
          {ADMIN_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              className={`admin-nav-item ${activeSection === sec.id ? 'is-active' : ''}`}
              onClick={() => { setActiveSection(sec.id); setSidebarOpen(false); }}
            >
              <span className="admin-nav-icon">{sec.icon}</span>
              <span className="admin-nav-label">{sec.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-btn admin-btn-outline" onClick={() => { window.location.hash = '/home'; }}>
            ← View Website
          </button>
          <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-content-header">
          <h1>{currentLabel}</h1>
        </div>
        <div className="admin-content-body">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

