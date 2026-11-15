import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import burger from "@/assets/cheesy-smash-burger.webp";
import dagwood from "@/assets/beef-dagwood.webp";
import ribKota from "@/assets/rib-kota.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Foodie Zone Pimville" },
      { name: "description", content: "Foodie Zone serves kotas, dagwoods, burgers and steaks in Pimville, Soweto." },
      { property: "og:title", content: "About Foodie Zone Pimville" },
      { property: "og:description", content: "South African street-food favourites in Pimville, Soweto." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">About us</p>
          <h1 className="text-6xl sm:text-7xl">
            Made for <span className="text-flame">cravings</span>
          </h1>
          <p className="mt-6 text-lg text-foreground/85">
            Foodie Zone is a fast-food spot on Bhele Street in Pimville, Soweto, known for hearty South African
            street-food favourites.
          </p>
          <p className="mt-4 text-muted-foreground">
            On the menu you’ll find loaded kotas, stacked dagwoods, cheesy smash burgers and steaks: food made to share
            with friends and family, or to enjoy all on your own.
          </p>
          <Link
            to="/menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-flame px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-flame transition-transform hover:scale-[1.03]"
          >
            Explore Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={ribKota} alt="Rib kota" width={800} height={800} loading="lazy" className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover" />
          <img src={dagwood} alt="Beef dagwood" width={800} height={800} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
          <img src={burger} alt="Cheesy smash burger" width={800} height={800} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
        </div>
      </div>
      <p className="mt-16 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm text-muted-foreground">
        <span className="font-semibold text-gold">Note for Foodie Zone:</span> this introduction is intentionally short.
        Your story, history and team details can be added here once you share them.
      </p>
    </div>
  );
}
