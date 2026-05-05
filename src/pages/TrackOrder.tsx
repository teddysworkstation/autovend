import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Package, CheckCircle2, Clock, Truck, CreditCard, XCircle } from "lucide-react";

const STATUS_META: Record<string, { label: string; icon: any; color: string }> = {
  pending: { label: "Pending Review", icon: Clock, color: "text-amber-600" },
  processing: { label: "Processing", icon: Package, color: "text-blue-600" },
  awaiting_payment: { label: "Awaiting Payment", icon: CreditCard, color: "text-orange-600" },
  shipped: { label: "Shipped", icon: Truck, color: "text-indigo-600" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-green-600" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-600" },
};

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setOrder(null); setItems([]);
    const { data, error: err } = await supabase.rpc("lookup_order", { _order_number: orderNumber.trim(), _email: email.trim() });
    if (err) { setError("Lookup failed. Please try again."); setLoading(false); return; }
    if (!data || data.length === 0) { setError("No order matches that order number and email."); setLoading(false); return; }
    setOrder(data[0]);
    const { data: itemsData } = await supabase.rpc("lookup_order_items", { _order_number: orderNumber.trim(), _email: email.trim() });
    setItems(itemsData || []);
    setLoading(false);
  };

  const meta = order ? STATUS_META[order.status] || STATUS_META.pending : null;
  const StatusIcon = meta?.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-8">Enter your order number and the email you used at checkout to see live status.</p>

        <form onSubmit={handleLookup} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div>
            <Label>Order Number</Label>
            <Input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="VMH-12345678" required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl font-semibold">
            {loading ? "Looking up…" : "Track Order"}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </form>

        {order && meta && StatusIcon && (
          <div className="bg-card border border-border rounded-2xl p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <StatusIcon className={`w-10 h-10 ${meta.color}`} />
              <div>
                <p className="text-xs text-muted-foreground">Order #{order.order_number}</p>
                <p className="font-display text-xl font-bold text-foreground">{meta.label}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-muted-foreground">Customer</p><p className="font-medium">{order.first_name} {order.last_name}</p></div>
              <div><p className="text-muted-foreground">Plan</p><p className="font-medium capitalize">{order.plan === "monthly" ? "$150/month" : "One-time"}</p></div>
              <div><p className="text-muted-foreground">Payment Method</p><p className="font-medium uppercase">{order.payment_method}</p></div>
              <div><p className="text-muted-foreground">Total</p><p className="font-mono font-bold">${Number(order.total).toLocaleString()}</p></div>
              <div className="col-span-2"><p className="text-muted-foreground">Last Updated</p><p className="font-medium">{new Date(order.updated_at).toLocaleString()}</p></div>
            </div>
            {items.length > 0 && (
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Items</p>
                <div className="space-y-2">
                  {items.map((it, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{it.title} × {it.quantity}</span>
                      <span className="font-mono">${(Number(it.price) * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
