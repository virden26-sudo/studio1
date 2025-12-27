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
        width="40"
        height="40"
        viewBox="0 0 40 40"
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
            d="M17.4,31.5l-2.8-8.2h-5.2l-2.8,8.2H2.5L9.8,9.2h4.3l7.3,22.3H17.4z M13.5,19.9l-2.1-6.5c-0.3-1-0.5-2.2-0.8-3.5h-0.1 c-0.2,1.3-0.5,2.5-0.8,3.5l-2.1,6.5H13.5z M25.8,31.5V18.8h-4.3v-3.7h4.3v-4.3h3.7v4.3h4.3v3.7h-4.3v12.7H25.8z"
            fill="url(#grad1)"
          />
      </svg>
    </div>
  );
}
