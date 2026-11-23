import React, { useEffect, useMemo, useState } from 'react';
import { REMEDIES_DATA, YOUTUBE_CHANNEL_URL } from '../data/remediesData';
import { useLanguage } from '../context/LanguageContext';
import {
  getCategorySubtitle,
  getCategoryTitle,
  getItemDescription,
  getItemTitle
} from '../utils/remedyLocale';

const CARD_IMAGES = [
  '/images/cards/remedy-2-prosperity.jpg',
  '/images/cards/remedy-3-family.jpg',
  '/images/cards/event-11-lakshmi-ganapathi.jpg',
  '/images/cards/event-14-lakshmi.jpg',
  '/images/cards/remedy-1-health.jpg',
  '/images/family.jpg',
  '/images/cards/remedy-4-peace.jpg',
  '/images/homam.jpg',
  '/images/parayanam.jpg',
  '/images/cards/event-01-homam.jpg'
];

export default function RemedyItemPage({ categoryId, itemNo, onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const category = useMemo(
    () => REMEDIES_DATA.find((r) => r.id === categoryId) || REMEDIES_DATA[0],
    [categoryId]
  );

  const item = useMemo(() => {
    const list = category?.items || [];
    return list.find((i) => String(i.no) === String(itemNo)) || list[0];
  }, [category, itemNo]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryId, itemNo]);

  useEffect(() => {
    if (!shareOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setShareOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shareOpen]);

  if (!category || !item) {
    return (
      <div className="page-wrapper remedy-detail-page-wrapper">
        <div className="remedies-container" style={{ padding: '48px 16px' }}>
          <p>{t('remedies.notFound')}</p>
          <button type="button" className="btn primary" onClick={() => onNavigate('remedies')}>
            {t('remedies.backRemedies')}
          </button>
        </div>
      </div>
    );
  }

  const hasVideo = Boolean(item.youtubeId);
  const categoryTitle = getCategoryTitle(category, isEn);
  const itemTitle = getItemTitle(item, isEn);
  const itemDescription = getItemDescription(item, isEn);
  const pageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#/remedy/${category.id}/${item.no}`
      : `#/remedy/${category.id}/${item.no}`;
  const shareTitle = `${itemTitle} | Sri Vari Dasudu`;
  const shareText = isEn
    ? `Watch this sacred remedy from Sri Vari Dasudu:\n${itemTitle}\nCategory: ${categoryTitle}`
    : `శ్రీవారి దాసుడు పవిత్ర పరిహారం చూడండి:\n${itemTitle}\nవర్గం: ${categoryTitle}`;

  const openNativeOrSheet = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: pageUrl });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    setShareOpen(true);
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pageUrl);
      } else {
        const input = document.createElement('input');
        input.value = pageUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const encodedShare = encodeURIComponent(`${shareText}\n${pageUrl}`);
  const shareTargets = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedShare}`,
      icon: 'WA'
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: 'TG'
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      icon: 'FB'
    },
    {
      id: 'sms',
      label: t('remedies.messages'),
      href: `sms:?&body=${encodedShare}`,
      icon: 'SMS'
    },
    {
      id: 'email',
      label: 'Email',
      href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodedShare}`,
      icon: 'EM'
    }
  ];

  const infoCards = [
    {
      key: 'category',
      label: t('remedies.categoryLabel'),
      value: categoryTitle,
      hint: isEn ? category.remedyNo : getCategorySubtitle(category, false)
    },
    {
      key: 'focus',
      label: t('remedies.focusLabel'),
      value: getCategorySubtitle(category, isEn),
      hint: t('remedies.sacredIntent')
    },
    {
      key: 'guidance',
      label: t('remedies.guidanceLabel'),
      value: t('remedies.guidanceText'),
      hint: t('remedies.priestSupport')
    }
  ];

  return (
    <div className="page-wrapper remedy-detail-page-wrapper">
      <section className="remedy-detail-hero" aria-label="Remedy Video Header">
        <div className="remedy-detail-hero-frame" aria-hidden="true" />
        <div className="remedies-container">
          <div className="remedy-detail-header-content">
            <div className="remedy-detail-eyebrow">
              <span className="eyebrow-accent">✦</span>
              <span>
                {t('remedies.sacredGuidance', {
                  no: String(item.no).padStart(2, '0')
                })}
              </span>
              <span className="eyebrow-accent">✦</span>
            </div>
            <h1 className="remedy-detail-title">{itemTitle}</h1>
            <div className="remedy-detail-subtitle">({categoryTitle})</div>
          </div>
        </div>
      </section>

      <section className="remedy-detail-body-section">
        <div className="remedies-container remedy-detail-inner-wrap">
          <div className="remedy-detail-body-nav">
            <button
              type="button"
              className="btn ghost remedy-nav-back-btn"
              onClick={() => onNavigate(`remedy/${category.id}`)}
            >
              {t('remedies.backCategory')}
            </button>
          </div>

          <div className="remedy-theater-card remedy-item-video-card">
            <span className="card-corner corner-tl" aria-hidden="true" />
            <span className="card-corner corner-tr" aria-hidden="true" />
            <span className="card-corner corner-bl" aria-hidden="true" />
            <span className="card-corner corner-br" aria-hidden="true" />

            <div className="remedy-yt-bar">
              <div className="yt-channel-badge">
                <span className="yt-icon">▶</span>
                <span>@Srivari.Dasudu</span>
              </div>
              <div className="remedy-yt-actions">
                <a
                  href={item.youtubeUrl || YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-open-link"
                >
                  {t('remedies.openYt')}
                </a>
                <button type="button" className="yt-share-btn" onClick={openNativeOrSheet}>
                  {t('remedies.share')}
                </button>
              </div>
            </div>

            {hasVideo ? (
              <div className="remedy-video-container">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
                  title={itemTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="remedy-video-iframe"
                />
              </div>
            ) : (
              <div className="remedy-video-missing">
                <p>{t('remedies.videoSoon')}</p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost"
                >
                  {t('remedies.visitYt')}
                </a>
              </div>
            )}
          </div>

          <article className="remedy-item-desc-card">
            <div className="remedy-item-desc-badge">{t('remedies.sacredDesc')}</div>
            <h2>{t('remedies.about')}</h2>
            <p>{itemDescription}</p>

            <div className="remedy-info-cards">
              {infoCards.map((card) => (
                <article key={card.key} className="remedy-info-card">
                  <div className="remedy-info-card-top">
                    <span className="remedy-info-card-label">{card.label}</span>
                    <span className="remedy-info-card-hint">{card.hint}</span>
                  </div>
                  <p className="remedy-info-card-value">{card.value}</p>
                </article>
              ))}
            </div>

            <div className="remedy-item-desc-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => onBook(`${categoryTitle} — ${itemTitle}`)}
              >
                {t('remedies.bookGuidance')}
              </button>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                  isEn
                    ? `Namaskaram Acharyulu Garu,\nI watched the remedy video and need guidance.\n\nCategory: ${categoryTitle}\nRemedy No: ${item.no}\nRemedy: ${itemTitle}`
                    : `నమస్కారం ఆచార్యులు గారు,\nపరిహారం వీడియో చూశాను. మార్గదర్శనం కావాలి.\n\nవర్గం: ${categoryTitle}\nపరిహారం సంఖ్య: ${item.no}\nపరిహారం: ${itemTitle}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost"
              >
                {t('remedies.waEnquiry')}
              </a>
            </div>
          </article>

          <div className="remedy-item-more-row">
            <div className="remedy-items-section-head">
              <h2>{isEn ? 'Recommended Remedy Videos' : 'సిఫార్సు చేసిన పరిహారాల వీడియోలు'}</h2>
              <p>{t('remedies.moreInCategoryDesc')}</p>
            </div>
            <div className="remedy-items-grid">
              {(category.items || [])
                .filter((i) => i.no !== item.no)
                .slice(0, 6)
                .map((i, index) => {
                  const openItem = () => onNavigate(`remedy/${category.id}/${i.no}`);
                  const moreTitle = getItemTitle(i, isEn);
                  const img = CARD_IMAGES[index % CARD_IMAGES.length] || category.image;
                  return (
                    <article key={i.no} className="remedy-devotional-card remedy-item-visual-card">
                      <span className="card-corner corner-tl" aria-hidden="true" />
                      <span className="card-corner corner-tr" aria-hidden="true" />
                      <span className="card-corner corner-bl" aria-hidden="true" />
                      <span className="card-corner corner-br" aria-hidden="true" />

                      <div
                        className="remedy-card-image-wrap is-clickable"
                        onClick={openItem}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openItem()}
                      >
                        <img
                          src={img}
                          alt={moreTitle}
                          className="remedy-card-img"
                          loading="lazy"
                        />
                        <div className="remedy-img-gradient" aria-hidden="true" />
                      </div>

                      <div className="remedy-card-content">
                        <div className="remedy-title-group">
                          <h3 className="remedy-card-heading is-clickable" onClick={openItem}>
                            {moreTitle}
                          </h3>
                        </div>
                        <div className="remedy-card-divider" aria-hidden="true" />
                        <div className="remedy-card-actions">
                          <button
                            type="button"
                            className="btn primary remedy-view-action-btn"
                            onClick={openItem}
                          >
                            <span>{t('remedies.viewRemedy')}</span>
                            <span>&rarr;</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {shareOpen && (
        <div
          className="remedy-share-overlay"
          role="presentation"
          onClick={() => setShareOpen(false)}
        >
          <div
            className="remedy-share-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={t('remedies.share')}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="remedy-share-handle" aria-hidden="true" />
            <div className="remedy-share-head">
              <h3>{t('remedies.share')}</h3>
              <button
                type="button"
                className="remedy-share-close"
                onClick={() => setShareOpen(false)}
                aria-label={t('remedies.close')}
              >
                ×
              </button>
            </div>
            <p className="remedy-share-preview">{itemTitle}</p>
            <div className="remedy-share-grid">
              {shareTargets.map((target) => (
                <a
                  key={target.id}
                  href={target.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`remedy-share-app remedy-share-app-${target.id}`}
                  onClick={() => setShareOpen(false)}
                >
                  <span className="remedy-share-app-icon" aria-hidden="true">
                    {target.icon}
                  </span>
                  <span>{target.label}</span>
                </a>
              ))}
              <button
                type="button"
                className="remedy-share-app remedy-share-app-copy"
                onClick={copyLink}
              >
                <span className="remedy-share-app-icon" aria-hidden="true">
                  {copied ? '✓' : 'LINK'}
                </span>
                <span>{copied ? t('remedies.copied') : t('remedies.copyLink')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
