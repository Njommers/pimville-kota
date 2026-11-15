import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/** Leads to checkout, where the WhatsApp order message is prepared. */
export function WhatsAppOrderLink({ className }: { className?: string }) {
  return (
    <Link
      to="/checkout"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-foreground/25 px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" />
      Order via WhatsApp
    </Link>
  );
}
