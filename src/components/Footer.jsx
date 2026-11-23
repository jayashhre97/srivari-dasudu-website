import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GOSEVA_CONTACT_INFO, GOSEVA_NAV_SECTIONS } from '../data/gosevaData';

const SOCIAL_ICONS = {
  whatsapp: (
    <img
      src="/images/whatsapp-icon.png"
      alt="WhatsApp"
      className="footer-social-whatsapp-img"
    />
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.458.02.889-.16 1.795-.962 6.15-1.36 8.158-.168.847-.499 1.13-.82 1.158-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.788.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
};

const MAIN_SOCIAL = [
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/919876543210' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me' }
];

function SocialLinks({ links }) {
  return (
    <div className="footer-social-links">
      {links.map((soc) => (
        <a
          key={soc.id}
          href={soc.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-icon-btn social-icon-btn--${soc.id}`}
          aria-label={soc.label}
          title={soc.label}
        >
          {SOCIAL_ICONS[soc.id] || null}
        </a>
      ))}
    </div>
  );
}

export default function Footer({ onNavigate, pageMode }) {
  const { t, isEn } = useLanguage();
  const isGosevaPage = pageMode === 'goseva' || pageMode === 'godhanam';

  const scrollToGosevaSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isGosevaPage) {
    return (
      <footer className="goseva-footer">
        <div className="wrap">
          <div className="fgrid fgrid--compact">
            <div>
              <div className="footer-brand-row">
                <img
                  src="/images/logo.jpg"
                  alt={
                    isEn
                      ? 'Sri Vari Dasudu Adyatmika Kuteer'
                      : 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం'
                  }
                  className="footer-logo-img"
                />
                <h4 className="footer-brand-title">
                  {isEn
                    ? 'Sri Vari Dasudu Adyatmika Kuteer'
                    : 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం'}
                </h4>
              </div>
              <p>
                {isEn
                  ? 'Sacred Gomatha seva — feeding, care, and shelter.'
                  : 'గోమాత సేవ — ఆహారం, సంరక్షణ, ఆశ్రయం.'}
              </p>
              <SocialLinks links={GOSEVA_CONTACT_INFO.socialLinks} />
            </div>

            <div>
              <h4>{isEn ? 'Go Seva' : 'గోసేవ'}</h4>
              <ul>
                {GOSEVA_NAV_SECTIONS.slice(0, 5).map((sec) => (
                  <li key={sec.id}>
                    <button
                      type="button"
                      className="footer-link"
                      onClick={() => scrollToGosevaSection(sec.id)}
                    >
                      {isEn ? sec.labelEn : sec.labelTe}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>{t('footer.trustInfo')}</h4>
              <ul className="footer-contact-list">
                <li>
                  <strong>{GOSEVA_CONTACT_INFO.organisationName}</strong>
                </li>
                <li>{GOSEVA_CONTACT_INFO.phonePlaceholder}</li>
                <li>{GOSEVA_CONTACT_INFO.emailPlaceholder}</li>
              </ul>
            </div>
          </div>

          <div className="copy goseva-footer-copy">
            <div>
              &copy; {new Date().getFullYear()} {GOSEVA_CONTACT_INFO.organisationName}. {t('footer.copy')}
            </div>
            <div className="footer-credits">
              <span>Developed by </span>
              <a
                href="https://sriurjith.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-dev-link"
              >
                Sri Urjith Services
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer>
      <div className="wrap">
        <div className="fgrid fgrid--compact">
          <div>
            <div className="footer-brand-row">
              <img
                src="/images/logo.jpg"
                alt={
                  isEn
                    ? 'Sri Vari Dasudu Adyatmika Kuteer'
                    : 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం'
                }
                className="footer-logo-img"
              />
              <h4 className="footer-brand-title">
                {isEn
                  ? 'Sri Vari Dasudu Adyatmika Kuteer'
                  : 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం'}
              </h4>
            </div>
            <p>{t('footer.brandDesc')}</p>
            <SocialLinks links={MAIN_SOCIAL} />
          </div>

          <div>
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('home')}>
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('about')}>
                  {t('footer.aboutLink')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('muhurtham')}>
                  {t('footer.muhurtham')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('pitru-seva')}>
                  {t('footer.pitru')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('goseva')}>
                  {t('footer.goseva')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('kamyamu')}>
                  {t('footer.kamyamu')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('contact')}>
                  {t('footer.contact')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('admin')} style={{ opacity: 0.6, fontSize: '0.85em' }}>
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.trustInfo')}</h4>
            <ul className="footer-contact-list">
              <li>
                <strong>{t('footer.trustName')}</strong>
              </li>
              <li>{t('footer.founder')}</li>
              <li>{t('footer.helpline')}</li>
              <li>{t('footer.email')}</li>
            </ul>
          </div>
        </div>

        <div className="copy">
          <div>
            &copy; {new Date().getFullYear()} Srivari Dasudu. {t('footer.copy')}
          </div>
          <div className="footer-credits">
            <span>Developed by </span>
            <a
              href="https://sriurjith.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-dev-link"
            >
              Sri Urjith Services
            </a>
          </div>
          <div>{t('footer.mantra')}</div>
        </div>
      </div>
    </footer>
  );
}
