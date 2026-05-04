import { Truck, Shield, BadgeCheck } from "lucide-react";

/**
 * Free shipping / trust strip — high-converting subtle reassurance.
 */
export default function FreeShippingBar() {
  return (
    <div className="bg-primary text-primary-foreground border-b border-primary/20">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-6 text-[11px] sm:text-xs font-medium overflow-x-auto whitespace-nowrap">
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5" /> Free Nationwide Shipping
        </span>
        <span className="flex items-center gap-1.5 hidden sm:inline-flex">
          <BadgeCheck className="w-3.5 h-3.5" /> 1-Year Parts Warranty
        </span>
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" /> Pay After Order Confirmation
        </span>
      </div>
    </div>
  );
}
