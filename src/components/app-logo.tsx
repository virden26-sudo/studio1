import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "tie-dye-gradient text-primary-foreground rounded-lg p-2 flex items-center justify-center w-12 h-12 shadow-md",
        className
      )}
    >
      <span className="text-3xl font-headline">A+</span>
    </div>
  );
}
