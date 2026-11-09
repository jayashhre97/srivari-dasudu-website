import React from 'react';
import ContactView from '../components/ContactView';

export default function ContactPage({ onNavigate, onBook }) {
  return (
    <div className="page-wrapper contact-page">
      <ContactView onNavigate={onNavigate} onBook={onBook} />
    </div>
  );
}

