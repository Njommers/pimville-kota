import { cn } from "@/lib/utils";

export function PendingBadge({ children = "Awaiting owner confirmation", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-gold",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </span>
  );
}
