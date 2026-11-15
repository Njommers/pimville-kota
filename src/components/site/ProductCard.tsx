import { Plus } from "lucide-react";
import { toast } from "sonner";

import { formatZAR } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";
import type { MenuItem } from "@/lib/menu";

export function ProductCard({
  item,
  editing = false,
  categoryLabel,
}: {
  item: MenuItem;
  editing?: boolean;
  categoryLabel?: string;
}) {
  const { add, prices, setPrice } = useCart();
  const price = prices[item.id] ?? item.samplePrice;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          width={800}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!item.publiclyListed && (
          <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur">
            Sample item
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          {categoryLabel && <p className="eyebrow mb-1.5 text-[10px]">{categoryLabel}</p>}
          <h3 className="text-2xl">{item.name}</h3>
        </div>
        <p className="text-xs text-muted-foreground">Ingredients and portion size to be confirmed.</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          {editing ? (
            <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
              Sample price (R)
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={1}
                value={price}
                onChange={(e) => setPrice(item.id, e.target.valueAsNumber)}
                className="w-24 rounded-lg border border-input bg-background px-2 py-1.5 text-base font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={`Sample price for ${item.name}`}
              />
            </label>
          ) : (
            <div>
              <p className="font-display text-3xl leading-none tabular-nums">{formatZAR(price)}</p>
              <p className="mt-1 whitespace-nowrap text-[11px] uppercase tracking-wider text-muted-foreground">Sample price</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              add(item.id);
              toast.success(`${item.name} added to cart`);
            }}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-flame px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-flame transition-transform hover:scale-[1.04] active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
