import { createFileRoute } from "@tanstack/react-router";
import { Pencil, RotateCcw } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart-context";
import { categories, menuItems, type CategoryId } from "@/lib/menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Foodie Zone Pimville" },
      { name: "description", content: "Kotas, dagwoods, burgers, steaks, chips and drinks at Foodie Zone in Pimville, Soweto." },
      { property: "og:title", content: "Menu | Foodie Zone Pimville" },
      { property: "og:description", content: "Kotas, dagwoods, burgers, steaks, chips and drinks at Foodie Zone, Pimville." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const [editing, setEditing] = useState(false);
  const { resetPrices } = useCart();

  const shown = active === "all" ? categories : categories.filter((c) => c.id === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3">The menu</p>
        <h1 className="text-6xl sm:text-7xl">
          Eat <span className="text-flame">your fill</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Built around meals publicly linked to Foodie Zone. Product options, ingredients, portion sizes and prices will
          be confirmed by the restaurant. Items marked “Sample item” are placeholders for the design only.
        </p>
      </header>

      <div className="sticky top-16 z-30 -mx-4 mb-10 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu categories">
            {[{ id: "all" as const, label: "All" }, ...categories].map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {editing && (
              <button
                type="button"
                onClick={resetPrices}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
            <button
              type="button"
              onClick={() => setEditing((e) => !e)}
              aria-pressed={editing}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                editing ? "border-gold bg-gold text-gold-foreground" : "border-gold/40 text-gold hover:bg-gold/10",
              )}
            >
              <Pencil className="h-3.5 w-3.5" />
              {editing ? "Done editing" : "Edit sample prices"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {shown.map((cat) => {
          const items = menuItems.filter((m) => m.category === cat.id);
          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              <div className="mb-6 flex items-center gap-4">
                <h2 id={`cat-${cat.id}`} className="text-4xl">{cat.label}</h2>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <ProductCard key={item.id} item={item} editing={editing} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
