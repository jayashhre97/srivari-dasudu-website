import React from 'react';
import RemediesView from '../components/RemediesView';

export default function RemediesPage({ onNavigate, onBook }) {
  return (
    <div className="page-wrapper remedies-page">
      <RemediesView onNavigate={onNavigate} onBook={onBook} />
    </div>
  );
}

