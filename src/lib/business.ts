/**
 * Foodie Zone business details. Anything marked `verified: false` comes from
 * public listings and must be confirmed by the owner before going live.
 */
export const business = {
  name: "Foodie Zone",
  area: "Pimville, Soweto",
  address: {
    line1: "10681 Bhele Street",
    line2: "Pimville, Soweto",
    line3: "Gauteng, South Africa",
    verified: false,
  },
  phone: { display: "+27 69 836 3353", verified: false },
  instagram: { handle: "@the_zone_for_the_foodie", verified: false },
  /**
   * WhatsApp ordering number in international format without "+" (e.g. "27698363353").
   * Leave null until the owner confirms it; ordering stays switched off while null.
   */
  whatsappNumber: null as string | null,
  builtBy: "NextWave Web Solutions",
} as const;

export const fullAddress = `${business.address.line1}, ${business.address.line2}, ${business.address.line3}`;

export const mapsQuery = encodeURIComponent("10681 Bhele Street, Pimville, Soweto, South Africa");
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
