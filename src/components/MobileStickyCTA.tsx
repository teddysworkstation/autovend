import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";

/**
 * High-converting mobile sticky bar — always visible on small screens.
 * Hides on /checkout and /cart-related routes.
 */
export default function MobileStickyCTA() {
  const { itemCount } = useCart();
  const { pathname } = useLocation();
  if (pathname.startsWith("/checkout")) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border px-3 py-2 flex gap-2">
      <Link
        to="/quiz"
        className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl bg-secondary text-foreground text-sm font-semibold"
      >
        <MessageCircle className="w-4 h-4" /> Find My Machine
      </Link>
      <Link
        to="/checkout"
        className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold relative"
      >
        <ShoppingCart className="w-4 h-4" />
        {itemCount > 0 ? `Checkout (${itemCount})` : "Browse & Buy"}
      </Link>
    </div>
  );
}
