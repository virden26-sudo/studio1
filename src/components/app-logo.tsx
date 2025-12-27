
"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function AppLogo({ className }: { className?: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center w-12 h-12 bg-card shadow-md",
        className
      )}
    >
      {isClient ? (
        <span className="font-headline text-3xl text-gradient" style={{ textShadow: '1px 1px 2px hsl(var(--primary) / 0.3)' }}>A+</span>
      ) : (
        <span className="font-headline text-3xl">A+</span>
      )}
    </div>
  );
}
