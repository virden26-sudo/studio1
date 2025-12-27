
import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center w-12 h-12 bg-card shadow-md",
        className
      )}
    >
      <span className="font-headline text-2xl text-gradient">A+</span>
    </div>
  );
}
