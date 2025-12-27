
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
          <stop offset="0%" style={{ stopColor: '#0052D4' }} />
          <stop offset="50%" style={{ stopColor: '#4364F7' }} />
          <stop offset="100%" style={{ stopColor: '#6FB1FC' }} />
        </linearGradient>
         <linearGradient id="logoGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#00B09B' }} />
          <stop offset="100%" style={{ stopColor: '#96E6A1' }} />
        </linearGradient>
         <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
            <feOffset dx="1" dy="1" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
            </feMerge>
        </filter>
      </defs>
      <g filter="url(#drop-shadow)">
        <path
          d="M32,85 C15,85 15,65 30,65 C40,65 45,75 45,75 M32,85 C32,85 50,85 55,85 C75,85 80,60 60,30 C50,15 35,20 35,20 C35,20 55,45 65,55 C75,65 80,65 80,65 M60,50 C60,50 68,58 75,58 M45,75 C45,75 50,80 55,85"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M85,50 L105,50 M95,40 L95,60"
          fill="none"
          stroke="url(#logoGradient2)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
