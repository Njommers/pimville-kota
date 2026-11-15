import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import beefKota from "@/assets/beef-kota.webp";
import heroImage from "@/assets/hero-spread.webp";
import { LocationSection } from "@/components/site/LocationSection";
import { ProductCard } from "@/components/site/ProductCard";
import { WhatsAppOrderLink } from "@/components/site/WhatsAppOrderLink";
import { categories, menuItems } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Foodie Zone Pimville | Good Food. Great Moments." },
      { name: "description", content: "Discover delicious meals and satisfy your cravings at Foodie Zone, Pimville, Soweto." },
      { property: "og:title", content: "Foodie Zone Pimville | Good Food. Great Moments." },
      { property: "og:description", content: "Discover delicious meals and satisfy your cravings at Foodie Zone, Pimville." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = menuItems.filter((m) => m.featured);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Kota, cheesy smash burger and chips on a dark table"
          width={1600}
          height={1104}
          fetchPriority="high"
          className="animate-slow-zoom absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="bg-fade-side absolute inset-0 -z-10 hidden md:block" />
        <div className="bg-fade-down absolute inset-0 -z-10 md:hidden" />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-40 md:justify-center md:pb-20">
          <p className="eyebrow animate-rise mb-5">Pimville · Soweto</p>
          <h1 className="animate-rise max-w-2xl text-6xl sm:text-7xl md:text-8xl" style={{ animationDelay: "80ms" }}>
            Good food.
            <br />
            <span className="text-flame">Great moments.</span>
          </h1>
          <p className="animate-rise mt-6 max-w-md text-lg text-foreground/85" style={{ animationDelay: "160ms" }}>
            Discover delicious meals and satisfy your cravings at Foodie Zone, Pimville.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-flame px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-flame transition-transform hover:scale-[1.03]"
            >
              Explore Menu <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppOrderLink className="bg-background/40 backdrop-blur" />
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto flex max-w-6xl gap-x-8 gap-y-2 overflow-x-auto px-4 py-5 font-display text-xl uppercase tracking-wide text-muted-foreground sm:justify-between">
          {categories.map((c, i) => (
            <span key={c.id} className="flex shrink-0 items-center gap-8">
              {c.label}
              {i < categories.length - 1 && <span className="text-primary" aria-hidden>✦</span>}
            </span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Featured meals</p>
            <h2 className="text-5xl sm:text-6xl">Crowd favourites</h2>
          </div>
          <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            View full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          All prices shown are sample prices for demonstration. Final menu and prices will be supplied by Foodie Zone.
        </p>
      </section>

      {/* About teaser */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={beefKota}
              alt="Beef kota with chips, cheese and atchar"
              width={800}
              height={800}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow mb-3">About Foodie Zone</p>
            <h2 className="text-5xl sm:text-6xl">
              Pimville's <span className="text-flame">flavour stop</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Foodie Zone serves South African street-food favourites in Pimville, Soweto, from loaded kotas and
              dagwoods to cheesy smash burgers and steaks.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
            >
              More about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <LocationSection />
      </section>
    </>
  );
}
