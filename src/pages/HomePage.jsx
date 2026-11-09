import React from 'react';
import Hero from '../components/Hero';
import HomeIntroduction from '../components/HomeIntroduction';
import HomeRemedies from '../components/HomeRemedies';
import HomeMonthlyEvents from '../components/HomeMonthlyEvents';
import HomeGosevaUpdates from '../components/HomeGosevaUpdates';
import HomeCTA from '../components/HomeCTA';

export default function HomePage({ onNavigate, onBook }) {
  return (
    <div className="page-wrapper home-page">
      {/* 2. Hero Video (PERFECT - STRICTLY UNTOUCHED) */}
      <Hero onNavigate={onNavigate} />

      {/* 3. Introduction to Srivari Dasudu */}
      <HomeIntroduction onNavigate={onNavigate} />

      {/* 4. Featured Spiritual Remedies */}
      <HomeRemedies onNavigate={onNavigate} onBook={onBook} />

      {/* 5. Upcoming Sacred Rituals */}
      <HomeMonthlyEvents onNavigate={onNavigate} onBook={onBook} />

      {/* 6. GoSeva / Go Dhanam Updates */}
      <HomeGosevaUpdates onNavigate={onNavigate} onBook={onBook} />

      {/* 7. Final Devotional Closing CTA */}
      <HomeCTA onNavigate={onNavigate} onBook={onBook} />
    </div>
  );
}
