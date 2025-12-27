
"use client";

import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center w-12 h-12 bg-card shadow-md",
        className
      )}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
         <path 
            d="M21.72 11.68C22.5153 10.7494 23.952 10.6401 24.9393 11.3934C25.9267 12.1467 26.3134 13.4357 25.86 14.56L17.52 35.8H14.16L22.92 13.48C23.16 12.8933 22.9527 12.2134 22.44 11.84C21.9273 11.4667 21.2133 11.4134 20.64 11.72L20.28 11.92L21.72 11.68ZM32.4 20.08H38.28V23.44H32.4V29.56H28.92V23.44H23.04V20.08H28.92V14.1999H32.4V20.08Z"
            fill="url(#grad1)"
          />
      </svg>
    </div>
  );
}
