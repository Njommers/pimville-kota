import { Minus, Plus } from "lucide-react";

export function QtyControl({ qty, onChange, name }: { qty: number; onChange: (q: number) => void; name: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
        aria-label={`Decrease ${name} quantity`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-7 text-center text-sm font-bold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
        aria-label={`Increase ${name} quantity`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
