
import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-300 to-blue-300",
        className
      )}
    >
      <span className="font-headline text-2xl text-white">A+</span>
    </div>
  );
}
