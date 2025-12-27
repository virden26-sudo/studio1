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
      <span
        className="font-headline text-4xl text-gradient"
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
      >
        A+
      </span>
    </div>
  );
}
