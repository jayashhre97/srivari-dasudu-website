import React, { useEffect } from 'react';
import GosevaView from '../components/GosevaView';

export default function GosevaPage({ onNavigate, onBook }) {
  useEffect(() => {
    document.title = 'Go Dhanam Seva — The Sacred Gift of a Cow | Srivari Dasudu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-wrapper goseva-page">
      <GosevaView onNavigate={onNavigate} onBook={onBook} />
    </div>
  );
}
