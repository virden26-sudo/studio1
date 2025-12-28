'use client';

import * as React from 'react';

export function AppLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" stroke="hsl(var(--border))" strokeWidth="2" fill="hsl(var(--card))" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="28"
        fontFamily="Great Vibes, cursive"
        fill="url(#grad1)"
        dy=".1em"
      >
        A+
      </text>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity:1}} />
        </linearGradient>
      </defs>
    </svg>
  );
}
