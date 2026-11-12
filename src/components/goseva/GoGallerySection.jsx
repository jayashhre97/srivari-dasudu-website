import React, { useState } from 'react';
import LotusDivider from '../LotusDivider';
import { GOSEVA_GALLERY } from '../../data/gosevaData';
import { useEscapeKey } from './gosevaHelpers';

const GALLERY_FILTERS = [
  { id: 'All', labelEn: 'All Moments', labelTe: 'అన్నీ' },
  { id: 'Feeding', labelEn: 'Cow Feeding', labelTe: 'ఆహార సేవ' },
  { id: 'Pooja', labelEn: 'Monthly Go Pooja', labelTe: 'మాసిక గోపూజ' },
  { id: 'Healthcare', labelEn: 'Cow Healthcare', labelTe: 'వైద్య సేవ' },
  { id: 'Volunteers & Events', labelEn: 'Volunteers & Events', labelTe: 'సేవకులు & కార్యక్రమాలు' }
];

export default function GoGallerySection({ isEn }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEscapeKey(Boolean(lightboxItem), () => setLightboxItem(null));

  const visibleItems =
    activeCategory === 'All'
      ? GOSEVA_GALLERY
      : GOSEVA_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <section
      id="goseva-gallery"
      className="goseva-section goseva-gallery-section"
      aria-labelledby="gallery-heading"
    >
      <div className="goseva-container">
        <div className="goseva-section-header">
          <div className="goseva-sec-eyebrow">
            <span aria-hidden="true">✦</span>
            <span>{isEn ? 'MOMENTS OF DEVOTION' : 'గోసేవ దృశ్యాలు'}</span>
            <span aria-hidden="true">✦</span>
          </div>
          <h2 id="gallery-heading" className="goseva-sec-heading">
            {isEn ? 'Photo Gallery' : 'ఫోటో గ్యాలరీ'}
          </h2>
          <LotusDivider />
          <p className="goseva-sec-sub">
            {isEn
              ? 'Glimpses of daily cow feeding, Monthly Go Pooja, cow healthcare, dedicated volunteers, and sacred community Go Seva events.'
              : 'నిత్య గోఆహార సేవ, మాసిక గోపూజ, వైద్య సంరక్షణ, స్వచ్ఛంద సేవకులు మరియు గోసేవ కార్యక్రమాల చిత్రమాలిక.'}
          </p>
        </div>

        <div className="goseva-gallery-filters" role="tablist" aria-label="Filter gallery photos">
          {GALLERY_FILTERS.map((filter) => {
            const active = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`goseva-filter-pill ${active ? 'active' : ''}`}
                onClick={() => setActiveCategory(filter.id)}
              >
                {isEn ? filter.labelEn : filter.labelTe}
              </button>
            );
          })}
        </div>

        <div className="goseva-gallery-grid">
          {visibleItems.map((item) => (
            <figure key={item.id} className="goseva-gallery-item">
              <button
                type="button"
                className="goseva-gallery-trigger"
                onClick={() => setLightboxItem(item)}
                aria-label={`View larger image: ${isEn ? item.titleEn : item.titleTe}`}
              >
                <img
                  src={item.image}
                  alt={isEn ? item.titleEn : item.titleTe}
                  loading="lazy"
                />
                <figcaption className="goseva-gallery-overlay">
                  <strong>{isEn ? item.titleEn : item.titleTe}</strong>
                  <span>{isEn ? item.captionEn : item.captionTe}</span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {lightboxItem && (
        <div
          className="goseva-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={isEn ? lightboxItem.titleEn : lightboxItem.titleTe}
          onClick={() => setLightboxItem(null)}
        >
          <div className="goseva-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="goseva-modal-close"
              onClick={() => setLightboxItem(null)}
              aria-label="Close image preview"
            >
              ✕
            </button>
            <img
              src={lightboxItem.image}
              alt={isEn ? lightboxItem.titleEn : lightboxItem.titleTe}
              className="goseva-lightbox-img"
            />
            <div className="goseva-lightbox-caption">
              <h3>{isEn ? lightboxItem.titleEn : lightboxItem.titleTe}</h3>
              <p>{isEn ? lightboxItem.captionEn : lightboxItem.captionTe}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
