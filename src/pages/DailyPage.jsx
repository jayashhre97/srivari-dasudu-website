import React from 'react';
import DailyView from '../components/DailyView';

export default function DailyPage({ onNavigate }) {
  return (
    <div className="page-wrapper daily-page">
      <DailyView onNavigate={onNavigate} />
    </div>
  );
}

