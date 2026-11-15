import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import * as cart from "@/lib/cart";
import { menuById, menuItems } from "@/lib/menu";

const CART_KEY = "fz-cart-v1";
const PRICE_KEY = "fz-sample-prices-v1";

const defaultPrices: cart.PriceBook = Object.fromEntries(menuItems.map((m) => [m.id, m.samplePrice]));

type CartContextValue = {
  lines: cart.CartLine[];
  prices: cart.PriceBook;
  count: number;
  subtotal: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  setPrice: (id: string, price: number) => void;
  resetPrices: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<cart.CartLine[]>([]);
  const [prices, setPrices] = useState<cart.PriceBook>(defaultPrices);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as cart.CartLine[];
      setLines(saved.filter((l) => menuById[l.id] && l.qty > 0));
      const savedPrices = JSON.parse(localStorage.getItem(PRICE_KEY) ?? "{}") as cart.PriceBook;
      setPrices({ ...defaultPrices, ...savedPrices });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(PRICE_KEY, JSON.stringify(prices));
  }, [prices, hydrated]);

  const add = useCallback((id: string) => setLines((l) => cart.addItem(l, id)), []);
  const remove = useCallback((id: string) => setLines((l) => cart.removeItem(l, id)), []);
  const setQty = useCallback((id: string, qty: number) => setLines((l) => cart.setQty(l, id, qty)), []);
  const clear = useCallback(() => setLines([]), []);
  const setPrice = useCallback(
    (id: string, price: number) =>
      setPrices((p) => ({ ...p, [id]: Number.isFinite(price) && price >= 0 ? Math.round(price * 100) / 100 : 0 })),
    [],
  );
  const resetPrices = useCallback(() => setPrices(defaultPrices), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      prices,
      count: cart.itemCount(lines),
      subtotal: cart.subtotal(lines, prices),
      add,
      remove,
      setQty,
      clear,
      setPrice,
      resetPrices,
      open,
      setOpen,
    }),
    [lines, prices, add, remove, setQty, clear, setPrice, resetPrices, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
