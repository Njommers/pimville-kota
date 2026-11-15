import { business } from "@/lib/business";

export function DemoBanner() {
  return (
    <div className="border-b border-gold/20 bg-surface text-center text-[11px] leading-snug text-muted-foreground sm:text-xs">
      <p className="mx-auto max-w-6xl px-4 py-2">
        <span className="font-semibold text-gold">Unofficial demonstration</span> by {business.builtBy}. Menu,
        prices, contact details and ordering are pending approval by Foodie Zone.
      </p>
    </div>
  );
}
