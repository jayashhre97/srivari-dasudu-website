import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="footer-brand-row">
              <img src="/images/logo.jpg" alt="Srivari Dasudu" className="footer-logo-img" />
              <h4 className="footer-brand-title">Srivari Dasudu</h4>
            </div>
            <p>{t('footer.brandDesc')}</p>
            <div className="footer-social-links">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="YouTube"
                title="YouTube"
              >
                YouTube
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Telegram"
                title="Telegram"
              >
                Telegram
              </a>
            </div>
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
                <button type="button" className="footer-link" onClick={() => onNavigate('smartam')}>
                  {t('footer.smartam')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('kamyamu')}>
                  {t('footer.kamyamu')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('remedies')}>
                  {t('footer.remedies')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('vedic-school')}>
                  {t('footer.vedic')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('contact')}>
                  {t('footer.contact')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.ourSeva')}</h4>
            <ul>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('smartam')}>
                  {t('footer.marriage')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('kamyamu')}>
                  {t('footer.sudarshana')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('pitru-seva')}>
                  {t('footer.taddinam')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('muhurtham')}>
                  {t('footer.muhurthamGuide')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('kamyamu')}>
                  {t('footer.rudra')}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('goseva')}>
                  {t('footer.kamadhenu')}
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
              <li>{t('footer.hours')}</li>
            </ul>
          </div>
        </div>

        <div className="copy">
          <div>
            &copy; {new Date().getFullYear()} Srivari Dasudu. {t('footer.copy')}
          </div>
          <div>{t('footer.mantra')}</div>
        </div>
      </div>
    </footer>
  );
}
