
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
        <span className="font-headline text-2xl text-gradient">a+</span>
      ) : (
        <span className="font-headline text-2xl">a+</span>
      )}
    </div>
  );
}
