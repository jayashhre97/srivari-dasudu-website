import React from 'react';
import SmartamView from '../components/SmartamView';

export default function SmartamPage({ onNavigate, onBook }) {
  return <SmartamView onNavigate={onNavigate} onBook={onBook} />;
}

