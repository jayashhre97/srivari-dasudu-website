import React from 'react';

/**
 * Decorative lotus divider used across temple pages.
 * align: 'start' | 'center' (default)
 * tone: 'gold' | 'light' (default gold)
 */
export default function LotusDivider({ align = 'center', tone = 'gold', className = '' }) {
  const lineClass = tone === 'light' ? 'divider-line gold-line' : 'divider-line';

  return (
    <div
      className={`temple-lotus-divider align-${align} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className={`${lineClass} line-short`} />
      <svg width="24" height="16" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z"
          fill="#C9972D"
        />
        <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
      </svg>
      <span className={`${lineClass} line-medium`} />
    </div>
  );
}
