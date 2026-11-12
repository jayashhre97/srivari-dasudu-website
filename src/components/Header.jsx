import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Header({ activeTab, onSelectTab, onOpenQuickBooking }) {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sevaDropdownOpen, setSevaDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSevaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sevaSubItems = [
    { id: 'muhurtham', titleKey: 'nav.muhurtham' },
    { id: 'pitru-seva', titleKey: 'nav.pitruSeva' },
    { id: 'smartam', titleKey: 'nav.smartam' },
    { id: 'smarta-seva', titleKey: 'nav.smartaSeva' },
    { id: 'kamyamu', titleKey: 'nav.kamyamu' }
  ];

  const isSevaActive = ['muhurtham', 'pitru-seva', 'smartam', 'smarta-seva', 'kamyamu', 'kamayamu'].includes(activeTab);

  const handleNavClick = (id) => {
    onSelectTab(id);
    setMenuOpen(false);
    setSevaDropdownOpen(false);
  };

  const toggleSevaDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSevaDropdownOpen((prev) => !prev);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="wrap nav-container">
        <div
          className="brand"
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
        >
          <img src="/images/logo.jpg" alt="Sri Vari Dasudu Adyamika Kuteer Logo" className="brand-logo-img" />
          <div className="brand-text">
            <span className="brand-title">Sri Vari Dasudu</span>
            <span className="brand-subtitle">Adyamika Kuteer</span>
          </div>
        </div>

        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                {t('nav.home')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                {t('nav.about')}
              </button>
            </li>

            <li
              className={`nav-dropdown-item ${sevaDropdownOpen ? 'open' : ''}`}
              ref={dropdownRef}
              onMouseEnter={() => setSevaDropdownOpen(true)}
              onMouseLeave={() => setSevaDropdownOpen(false)}
            >
              <button
                type="button"
                className={`nav-link nav-dropdown-toggle ${isSevaActive ? 'active' : ''}`}
                onClick={toggleSevaDropdown}
                aria-haspopup="true"
                aria-expanded={sevaDropdownOpen}
              >
                <span>{t('nav.ourSeva')}</span>
                <span className="dropdown-caret" aria-hidden="true">
                  {sevaDropdownOpen ? '▲' : '▼'}
                </span>
              </button>

              <div className={`nav-dropdown-menu ${sevaDropdownOpen ? 'show' : ''}`} role="menu">
                {sevaSubItems.map((sub) => {
                  const isActive = activeTab === sub.id || (sub.id === 'godhanam' && activeTab === 'goseva');
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      role="menuitem"
                      className={`nav-dropdown-link ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(sub.id)}
                    >
                      <span className="dropdown-link-title">{t(sub.titleKey)}</span>
                    </button>
                  );
                })}
              </div>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'remedies' || activeTab === 'remedy-detail' ? 'active' : ''}`}
                onClick={() => handleNavClick('remedies')}
              >
                {t('nav.remedies')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'vedic-school' ? 'active' : ''}`}
                onClick={() => handleNavClick('vedic-school')}
              >
                {t('nav.vedicSchool')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'goseva' || activeTab === 'godhanam' ? 'active' : ''}`}
                onClick={() => handleNavClick('goseva')}
              >
                {t('nav.goseva')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                {t('nav.contact')}
              </button>
            </li>

            <li className="mobile-nav-cta">
              <button
                type="button"
                className="btn primary mobile-booking-btn"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenQuickBooking();
                }}
              >
                <span>{t('nav.quickBooking')}</span>
              </button>
            </li>

            <li className="mobile-lang-switcher">
              <div className="lang-switcher" role="group" aria-label="Language">
                <button
                  type="button"
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => setLang('en')}
                  aria-pressed={lang === 'en'}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`lang-btn ${lang === 'te' ? 'active' : ''}`}
                  onClick={() => setLang('te')}
                  aria-pressed={lang === 'te'}
                >
                  తెలుగు
                </button>
              </div>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="lang-switcher desktop-lang" role="group" aria-label="Language">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'te' ? 'active' : ''}`}
              onClick={() => setLang('te')}
              aria-pressed={lang === 'te'}
            >
              తెలుగు
            </button>
          </div>

          <button
            type="button"
            className="nav-cta-btn"
            onClick={onOpenQuickBooking}
          >
            <span>{t('nav.quickBooking')}</span>
          </button>

          <button
            type="button"
            className={`burger ${menuOpen ? 'active' : ''}`}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
