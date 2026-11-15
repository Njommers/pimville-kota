export type CartLine = { id: string; qty: number };
export type PriceBook = Record<string, number>;
export type NamedLine = { id: string; name: string; qty: number; unitPrice: number };

export const MAX_QTY = 50;

export function addItem(lines: CartLine[], id: string, qty = 1): CartLine[] {
  const existing = lines.find((l) => l.id === id);
  if (existing) {
    return lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
  }
  return [...lines, { id, qty: Math.min(MAX_QTY, Math.max(1, qty)) }];
}

export function removeItem(lines: CartLine[], id: string): CartLine[] {
  return lines.filter((l) => l.id !== id);
}

/** Sets quantity; zero or less removes the line. */
export function setQty(lines: CartLine[], id: string, qty: number): CartLine[] {
  if (qty <= 0) return removeItem(lines, id);
  return lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, Math.floor(qty)) } : l));
}

export function itemCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}

/** Works in cents to avoid floating-point drift. */
export function lineTotal(qty: number, unitPrice: number): number {
  return Math.round(qty * Math.round(unitPrice * 100)) / 100;
}

export function subtotal(lines: CartLine[], prices: PriceBook): number {
  const cents = lines.reduce((sum, l) => sum + l.qty * Math.round((prices[l.id] ?? 0) * 100), 0);
  return cents / 100;
}

export function formatZAR(amount: number): string {
  return `R${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\u00a0/g, " ")}`;
}

export function buildWhatsAppMessage(
  lines: NamedLine[],
  opts: { customerName?: string; notes?: string } = {},
): string {
  const total = lines.reduce((s, l) => s + Math.round(l.unitPrice * 100) * l.qty, 0) / 100;
  const parts = ["Hi Foodie Zone, I'd like to place an order:", ""];
  for (const l of lines) {
    parts.push(`${l.qty} x ${l.name} @ ${formatZAR(l.unitPrice)} = ${formatZAR(lineTotal(l.qty, l.unitPrice))}`);
  }
  parts.push("", `Total: ${formatZAR(total)}`);
  if (opts.customerName?.trim()) parts.push(`Name: ${opts.customerName.trim()}`);
  if (opts.notes?.trim()) parts.push(`Notes: ${opts.notes.trim()}`);
  return parts.join("\n");
}

/** Returns null when no confirmed number is configured, so ordering stays off. */
export function whatsappOrderUrl(number: string | null, message: string): string | null {
  if (!number) return null;
  const digits = number.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
