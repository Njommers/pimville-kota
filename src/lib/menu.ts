import beefKota from "@/assets/beef-kota.webp";
import ribKota from "@/assets/rib-kota.webp";
import beefDagwood from "@/assets/beef-dagwood.webp";
import smashBurger from "@/assets/cheesy-smash-burger.webp";
import steak from "@/assets/steak.webp";
import chips from "@/assets/chips.webp";
import drinks from "@/assets/cold-drinks.webp";

export type CategoryId = "kotas" | "dagwoods" | "burgers" | "steaks" | "sides" | "drinks";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "kotas", label: "Kotas" },
  { id: "dagwoods", label: "Dagwoods" },
  { id: "burgers", label: "Burgers" },
  { id: "steaks", label: "Steaks" },
  { id: "sides", label: "Chips & Sides" },
  { id: "drinks", label: "Drinks" },
];

export type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  image: string;
  /** Sample price in Rand. Not an actual Foodie Zone price. */
  samplePrice: number;
  /** True when the item name appears in public Foodie Zone references. */
  publiclyListed: boolean;
  featured?: boolean;
};

export const menuItems: MenuItem[] = [
  { id: "beef-kota", name: "Beef Kota", category: "kotas", image: beefKota, samplePrice: 65, publiclyListed: true, featured: true },
  { id: "rib-kota", name: "Rib Kota", category: "kotas", image: ribKota, samplePrice: 80, publiclyListed: true, featured: true },
  { id: "beef-dagwood", name: "Beef Dagwood", category: "dagwoods", image: beefDagwood, samplePrice: 85, publiclyListed: true, featured: true },
  { id: "cheesy-smash-burger", name: "Cheesy Smash Burger", category: "burgers", image: smashBurger, samplePrice: 90, publiclyListed: true, featured: true },
  { id: "steak", name: "Steak", category: "steaks", image: steak, samplePrice: 150, publiclyListed: true },
  { id: "sample-chips", name: "Chips", category: "sides", image: chips, samplePrice: 35, publiclyListed: false },
  { id: "sample-cold-drink", name: "Cold Drink", category: "drinks", image: drinks, samplePrice: 20, publiclyListed: false },
];

export const menuById = Object.fromEntries(menuItems.map((m) => [m.id, m])) as Record<string, MenuItem | undefined>;
