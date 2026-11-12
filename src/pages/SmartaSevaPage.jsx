import React from 'react';
import SmartaSevaView from '../components/SmartaSevaView';

export default function SmartaSevaPage({ onNavigate, onBook }) {
  return <SmartaSevaView onNavigate={onNavigate} onBook={onBook} />;
}

