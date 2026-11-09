import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Marquee() {
  const { t } = useLanguage();
  const text = `${t('marquee.text')} `.repeat(6);

  return (
    <div className="marq">
      <div className="marq-content">{text}</div>
    </div>
  );
}
