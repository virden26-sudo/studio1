
'use client';

import * as React from 'react';

export function AppLogo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Agenda+ Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(217, 100%, 50%)' }} />
          <stop offset="45%" style={{ stopColor: 'hsl(120, 80%, 60%)' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(90, 100%, 70%)' }} />
        </linearGradient>
        <filter id="drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
          <feOffset in="blur" dx="1" dy="2" result="offsetBlur" />
           <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.7}} />
            <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.1}} />
        </linearGradient>
      </defs>
      <g filter="url(#drop-shadow)">
        <path
          d="M32,85 C15,85 15,65 30,65 C40,65 45,75 45,75 M32,85 C32,85 50,85 55,85 C75,85 80,60 60,30 C50,15 35,20 35,20 C35,20 55,45 65,55 C75,65 80,65 80,65 M60,50 C60,50 68,58 75,58 M45,75 C45,75 50,80 55,85"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M85,50 L105,50 M95,40 L95,60"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Highlights */}
        <path
          d="M32,85 C15,85 15,65 30,65 C40,65 45,75 45,75 M32,85 C32,85 50,85 55,85 C75,85 80,60 60,30 C50,15 35,20 35,20 C35,20 55,45 65,55 C75,65 80,65 80,65 M60,50 C60,50 68,58 75,58 M45,75 C45,75 50,80 55,85"
          fill="none"
          stroke="url(#highlightGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M85,50 L105,50 M95,40 L95,60"
          fill="none"
          stroke="url(#highlightGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
