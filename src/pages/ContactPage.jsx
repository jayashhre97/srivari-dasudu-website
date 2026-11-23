import React from 'react';
import ContactView from '../components/ContactView';

export default function ContactPage({ onNavigate, onBook }) {
  return <ContactView onNavigate={onNavigate} onBook={onBook} />;
}
