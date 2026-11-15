import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import { business, fullAddress, mapsEmbedUrl, mapsLinkUrl } from "@/lib/business";
import { PendingBadge } from "./PendingBadge";

export function LocationSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-6">
        <div>
          <p className="eyebrow mb-3">Contact &amp; location</p>
          <Heading className="text-5xl sm:text-6xl">Find Foodie Zone</Heading>
          <p className="mt-4 text-muted-foreground">
            The details below come from public listings. They will be confirmed with Foodie Zone before the website goes live.
          </p>
        </div>
        <ul className="space-y-3">
          <ContactRow icon={<MapPin className="h-5 w-5" />} label="Address">
            <span>{fullAddress}</span>
            <PendingBadge>Publicly listed, needs confirmation</PendingBadge>
          </ContactRow>
          <ContactRow icon={<Phone className="h-5 w-5" />} label="Telephone">
            <span className="tabular-nums">{business.phone.display}</span>
            <PendingBadge>Publicly listed, needs confirmation</PendingBadge>
          </ContactRow>
          <ContactRow icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp orders">
            <span className="text-muted-foreground">Ordering number to be confirmed</span>
            <PendingBadge />
          </ContactRow>
          <ContactRow icon={<Instagram className="h-5 w-5" />} label="Instagram">
            <span>{business.instagram.handle}</span>
            <PendingBadge />
          </ContactRow>
          <ContactRow icon={<Clock className="h-5 w-5" />} label="Opening hours">
            <span className="text-muted-foreground">To be confirmed by Foodie Zone</span>
          </ContactRow>
        </ul>
        <a
          href={mapsLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-flame transition-transform hover:scale-[1.03]"
        >
          <MapPin className="h-4 w-4" />
          Open in Google Maps
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <iframe
          title="Map of 10681 Bhele Street, Pimville, Soweto"
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[360px] w-full grayscale-[35%] lg:h-full lg:min-h-[460px]"
        />
      </div>
    </div>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 rounded-xl border border-border bg-card p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">{icon}</span>
      <div className="flex min-w-0 flex-col items-start gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        {children}
      </div>
    </li>
  );
}
