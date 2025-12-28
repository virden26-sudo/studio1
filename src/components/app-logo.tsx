
'use client';

import * as React from 'react';

export function AppLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="hsl(var(--sidebar-accent))"/>
      <circle cx="24" cy="24" r="18" fill="hsl(var(--background))" />
      <circle cx="24" cy="24" r="17" stroke="hsl(var(--border))" strokeWidth="2"/>
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="22"
        fontFamily="'Segoe Script', cursive"
        fontWeight="bold"
        fontStyle="italic"
        fill="url(#grad1)"
        dy=".1em"
      >
        A+
      </text>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
    </svg>
  );
}
