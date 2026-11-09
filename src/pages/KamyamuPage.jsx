import React from 'react';
import KamyamuView from '../components/KamyamuView';

export default function KamyamuPage({ onNavigate, onBook }) {
  return <KamyamuView onNavigate={onNavigate} onBook={onBook} />;
}

