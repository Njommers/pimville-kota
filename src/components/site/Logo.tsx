import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="group inline-flex items-baseline gap-1.5" aria-label="Foodie Zone home">
      <span className="font-display text-2xl uppercase tracking-wide text-foreground">Foodie</span>
      <span className="font-display text-2xl uppercase tracking-wide text-flame">Zone</span>
    </Link>
  );
}
