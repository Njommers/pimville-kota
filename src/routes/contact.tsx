import { createFileRoute } from "@tanstack/react-router";

import { LocationSection } from "@/components/site/LocationSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location | Foodie Zone Pimville" },
      { name: "description", content: "Find Foodie Zone at 10681 Bhele Street, Pimville, Soweto, Gauteng." },
      { property: "og:title", content: "Contact & Location | Foodie Zone Pimville" },
      { property: "og:description", content: "Find Foodie Zone at 10681 Bhele Street, Pimville, Soweto." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <LocationSection headingLevel="h1" />
    </div>
  );
}
