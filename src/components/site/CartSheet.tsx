import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatZAR, lineTotal } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";
import { menuById } from "@/lib/menu";
import { QtyControl } from "./QtyControl";

export function CartSheet() {
  const { lines, prices, subtotal, setQty, remove, open, setOpen } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col border-border bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-display text-3xl uppercase">Your order</SheetTitle>
          <SheetDescription className="text-xs">Sample prices shown for demonstration only.</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/menu"
              onClick={() => setOpen(false)}
              className="rounded-full bg-flame px-6 py-3 text-sm font-bold text-primary-foreground shadow-flame"
            >
              Explore menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {lines.map((l) => {
                const item = menuById[l.id];
                const price = prices[l.id] ?? 0;
                return (
                  <li key={l.id} className="flex gap-4 py-4">
                    <img src={item.image} alt={item.name} width={72} height={72} loading="lazy" className="h-18 w-18 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold leading-tight">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{formatZAR(price)} each</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(l.id)}
                          className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <QtyControl qty={l.qty} name={item.name} onChange={(q) => setQty(l.id, q)} />
                        <span className="font-bold tabular-nums">{formatZAR(lineTotal(l.qty, price))}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-4 border-t border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl tabular-nums">{formatZAR(subtotal)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-flame py-3.5 text-center font-bold text-primary-foreground shadow-flame transition-transform hover:scale-[1.01]"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
