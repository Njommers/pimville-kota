import { Link } from "@tanstack/react-router";

import { business, fullAddress } from "@/lib/business";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">Good food. Great moments. {business.area}.</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="text-muted-foreground hover:text-foreground">Menu</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact &amp; location</Link></li>
            <li><Link to="/checkout" className="text-muted-foreground hover:text-foreground">Checkout</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Find us</p>
          <p className="text-sm text-muted-foreground">{fullAddress}</p>
          <p className="mt-2 text-xs text-muted-foreground">Listed publicly; awaiting owner confirmation.</p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground">
          Website proposal by {business.builtBy}. Unofficial demonstration, not yet approved by Foodie Zone.
        </p>
      </div>
    </footer>
  );
}
