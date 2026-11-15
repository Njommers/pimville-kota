import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Lock, MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PendingBadge } from "@/components/site/PendingBadge";
import { QtyControl } from "@/components/site/QtyControl";
import { business } from "@/lib/business";
import { buildWhatsAppMessage, formatZAR, lineTotal, whatsappOrderUrl } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";
import { menuById } from "@/lib/menu";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Foodie Zone Pimville" },
      { name: "description", content: "Review your Foodie Zone order and prepare it for WhatsApp." },
      { property: "og:title", content: "Checkout | Foodie Zone Pimville" },
      { property: "og:description", content: "Review your Foodie Zone order and prepare it for WhatsApp." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, prices, subtotal, setQty, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const named = useMemo(
    () => lines.map((l) => ({ id: l.id, name: menuById[l.id]?.name ?? l.id, qty: l.qty, unitPrice: prices[l.id] ?? 0 })),
    [lines, prices],
  );
  const message = buildWhatsAppMessage(named, { customerName: name, notes });
  const waUrl = whatsappOrderUrl(business.whatsappNumber, message);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Order message copied");
    } catch {
      toast.error("Couldn't copy. Please select the message and copy it manually.");
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h1 className="mt-6 text-5xl">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a few meals from the menu to build your order.</p>
        <Link
          to="/menu"
          className="mt-8 rounded-full bg-flame px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-flame"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow mb-3">Checkout</p>
      <h1 className="text-6xl sm:text-7xl">Your order</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Items */}
        <section aria-label="Selected meals" className="h-fit rounded-2xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {lines.map((l) => {
              const item = menuById[l.id];
              if (!item) return null;
              const price = prices[l.id] ?? 0;
              return (
                <li key={l.id} className="flex items-center gap-4 p-4 sm:p-5">
                  <img src={item.image} alt={item.name} width={80} height={80} loading="lazy" className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{formatZAR(price)} each · sample price</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <QtyControl qty={l.qty} name={item.name} onChange={(q) => setQty(l.id, q)} />
                      <span className="w-24 text-right font-bold tabular-nums">{formatZAR(lineTotal(l.qty, price))}</span>
                      <button
                        type="button"
                        onClick={() => remove(l.id)}
                        className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-destructive"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t border-border p-5">
            <button type="button" onClick={clear} className="text-sm font-semibold text-muted-foreground hover:text-destructive">
              Clear cart
            </button>
            <Link to="/menu" className="text-sm font-bold text-primary hover:underline">
              Add more meals
            </Link>
          </div>
        </section>

        {/* Summary */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-3xl">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {named.map((l) => (
                <div key={l.id} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{l.qty} × {l.name}</dt>
                  <dd className="tabular-nums">{formatZAR(lineTotal(l.qty, l.unitPrice))}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between border-t border-border pt-3">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-3xl tabular-nums" data-testid="order-total">{formatZAR(subtotal)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-muted-foreground">Sample prices. Delivery and payment terms to be confirmed by Foodie Zone.</p>

            <div className="mt-5 space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block font-semibold">Your name (optional)</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-semibold">Notes (optional)</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={300}
                  rows={2}
                  placeholder="e.g. no atchar"
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-3xl">
                <MessageCircle className="h-6 w-6 text-primary" /> WhatsApp order
              </h2>
              {!waUrl && <PendingBadge>Number pending</PendingBadge>}
            </div>
            <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-background p-4 font-sans text-sm leading-relaxed text-foreground/90">
              {message}
            </pre>
            <div className="mt-4 grid gap-3">
              {waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-flame py-3.5 font-bold text-primary-foreground shadow-flame"
                >
                  <MessageCircle className="h-4 w-4" /> Send order on WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-muted py-3.5 font-bold text-muted-foreground"
                >
                  <Lock className="h-4 w-4" /> Send on WhatsApp (not yet active)
                </button>
              )}
              <button
                type="button"
                onClick={copyMessage}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/25 py-3 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
              >
                <Copy className="h-4 w-4" /> Copy order message
              </button>
            </div>
            {!waUrl && (
              <p className="mt-3 text-xs text-muted-foreground">
                WhatsApp ordering switches on once Foodie Zone confirms its ordering number.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
