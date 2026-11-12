import React, { useEffect } from 'react';
import GosevaView from '../components/GosevaView';

export default function GosevaPage({ onNavigate, onBook }) {
  useEffect(() => {
    document.title = 'Go Seva – Serve, Protect & Care for Gomatha | Srivari Dasudu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-wrapper goseva-page">
      <GosevaView onNavigate={onNavigate} onBook={onBook} />
    </div>
  );
}
