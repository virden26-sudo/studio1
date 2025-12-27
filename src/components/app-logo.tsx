import { cn } from "@/lib/utils";
import Image from "next/image";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center w-12 h-12",
        className
      )}
    >
      <Image src="/logo.png" alt="Agenda+ Logo" width={48} height={48} />
    </div>
  );
}
