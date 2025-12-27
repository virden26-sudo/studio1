
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
          <stop offset="0%" stopColor="hsl(217, 89%, 61%)" />
          <stop offset="50%" stopColor="hsl(140, 70%, 50%)" />
          <stop offset="100%" stopColor="hsl(90, 100%, 75%)" />
        </linearGradient>
        <filter id="drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="2" dy="3" result="offsetBlur" />
           <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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
      </g>
    </svg>
  );
}
