import React, { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import GosevaHero from './goseva/GosevaHero';
import GosevaAbout from './goseva/GosevaAbout';
import MonthlyGoPooja from './goseva/MonthlyGoPooja';
import GoProductsSection from './goseva/GoProductsSection';
import GoActivitiesSection from './goseva/GoActivitiesSection';
import GosevaDonation from './goseva/GosevaDonation';
import GoGallerySection from './goseva/GoGallerySection';
import GoContactSection from './goseva/GoContactSection';

export default function GosevaView({ onNavigate, onBook }) {
  const { isEn } = useLanguage();

  const handleScrollTo = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="goseva-redesign-wrapper">
      <GosevaHero isEn={isEn} />

      <GosevaAbout isEn={isEn} onScrollTo={handleScrollTo} />

      <MonthlyGoPooja isEn={isEn} />

      <GoProductsSection isEn={isEn} />

      <GoActivitiesSection isEn={isEn} />

      <GosevaDonation isEn={isEn} />

      <GoGallerySection isEn={isEn} />

      <GoContactSection
        isEn={isEn}
        onNavigate={onNavigate}
        onBook={onBook}
      />
    </div>
  );
}
