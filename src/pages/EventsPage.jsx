import React from 'react';
import EventsView from '../components/EventsView';

export default function EventsPage({ onNavigate, onBook }) {
  return (
    <div className="page-wrapper events-page">
      <EventsView onNavigate={onNavigate} onBook={onBook} />
    </div>
  );
}

