import { describe, expect, it } from "vitest";

import {
  addItem,
  buildWhatsAppMessage,
  formatZAR,
  itemCount,
  removeItem,
  setQty,
  subtotal,
  whatsappOrderUrl,
} from "@/lib/cart";

const prices = { kota: 65, burger: 89.9, drink: 20 };

describe("cart", () => {
  it("adding the same meal twice increases its quantity", () => {
    const lines = addItem(addItem([], "kota"), "kota");
    expect(lines).toEqual([{ id: "kota", qty: 2 }]);
  });

  it("decreasing quantity to zero removes the meal", () => {
    expect(setQty([{ id: "kota", qty: 1 }], "kota", 0)).toEqual([]);
  });

  it("remove deletes only that meal", () => {
    expect(removeItem([{ id: "kota", qty: 2 }, { id: "drink", qty: 1 }], "kota")).toEqual([{ id: "drink", qty: 1 }]);
  });

  it("subtotal adds quantity × price without rounding errors", () => {
    const lines = [
      { id: "kota", qty: 2 },
      { id: "burger", qty: 3 },
      { id: "drink", qty: 1 },
    ];
    expect(subtotal(lines, prices)).toBe(419.7);
    expect(itemCount(lines)).toBe(6);
  });

  it("formats Rand with two decimals", () => {
    expect(formatZAR(419.7)).toBe("R419.70");
  });

  it("WhatsApp message lists meals, quantities and the total", () => {
    const msg = buildWhatsAppMessage([
      { id: "kota", name: "Beef Kota", qty: 2, unitPrice: 65 },
      { id: "drink", name: "Cold Drink", qty: 1, unitPrice: 20 },
    ]);
    expect(msg).toContain("2 x Beef Kota @ R65.00 = R130.00");
    expect(msg).toContain("1 x Cold Drink @ R20.00 = R20.00");
    expect(msg).toContain("Total: R150.00");
  });

  it("WhatsApp ordering stays off without a confirmed number", () => {
    expect(whatsappOrderUrl(null, "hi")).toBeNull();
    expect(whatsappOrderUrl("27698363353", "hi")).toBe("https://wa.me/27698363353?text=hi");
  });
});
