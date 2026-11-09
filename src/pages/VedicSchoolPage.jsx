import React from 'react';
import VedicSchoolView from '../components/VedicSchoolView';

export default function VedicSchoolPage({ onNavigate, onBook }) {
  return <VedicSchoolView onNavigate={onNavigate} onBook={onBook} />;
}
