import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/data/products";
import { useState } from "react";

export default function CartDrawer() {
  const { items, remove, updateQty, itemCount, subtotal } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label={`Open cart (${itemCount} items)`}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display">Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
              <Link to="/machines" onClick={() => setOpen(false)}>
                <Button variant="outline">Browse Machines</Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.slug} className="flex gap-3 p-3 bg-card border border-border rounded-xl">
                  <Link to={`/machines/${it.slug}`} onClick={() => setOpen(false)} className="shrink-0">
                    <img src={it.image} alt="vending machine for sale" className="w-16 h-16 object-contain bg-secondary rounded-lg" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/machines/${it.slug}`} onClick={() => setOpen(false)}>
                      <p className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary">{it.title}</p>
                    </Link>
                    <p className="text-sm font-mono font-bold text-primary mt-1">{formatPrice(it.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(it.slug, it.quantity - 1)} className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{it.quantity}</span>
                      <button onClick={() => updateQty(it.slug, it.quantity + 1)} className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => remove(it.slug)} className="ml-auto text-muted-foreground hover:text-destructive p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono font-bold text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <Button
              size="lg"
              className="w-full h-12 font-display font-semibold rounded-xl"
              onClick={() => { setOpen(false); navigate("/checkout"); }}
            >
              Checkout
            </Button>
            <p className="text-xs text-center text-muted-foreground">Free nationwide shipping included</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
