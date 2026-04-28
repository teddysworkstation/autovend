import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Globe, Bitcoin, Smartphone, ArrowRight, Shield, Lock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
  { id: "bank", label: "Bank Transfer", icon: Building2, desc: "ACH or domestic wire" },
  { id: "wire", label: "Wire Transfer", icon: Globe, desc: "International wire" },
  { id: "bitcoin", label: "Bitcoin", icon: Bitcoin, desc: "BTC payment" },
  { id: "zelle", label: "Zelle", icon: Smartphone, desc: "Instant transfer" },
];

const bankDetails: Record<string, { instructions: string; details: string[] }> = {
  bank: {
    instructions: "Send payment via ACH transfer to:",
    details: ["Bank: Chase Bank", "Account Name: Vending Machine Hub LLC", "Routing: 021000021", "Account: XXXX-XXXX-4521", "Reference: Your order number"],
  },
  wire: {
    instructions: "Send wire transfer to:",
    details: ["Bank: Chase Bank, New York", "SWIFT: CHASUS33", "Account Name: Vending Machine Hub LLC", "Account: XXXX-XXXX-4521", "Reference: Your order number"],
  },
  bitcoin: {
    instructions: "Send BTC to the following address:",
    details: ["Wallet: bc1q...xk9f (full address shown after order)", "Network: Bitcoin mainnet only", "Confirmations required: 3", "Amount will be calculated at current rate"],
  },
  zelle: {
    instructions: "Send Zelle payment to:",
    details: ["Email: payments@vmh.com", "Name: Vending Machine Hub LLC", "Include your order number in memo"],
  },
};

type PlanId = "onetime" | "monthly";

export default function Checkout() {
  const { toast } = useToast();
  const [method, setMethod] = useState("bank");
  const [plan, setPlan] = useState<PlanId>("onetime");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "",
    txRef: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Order Submitted!", description: plan === "monthly" ? "Your $150/month plan is set up. Confirmation email sent." : "You'll receive a confirmation email shortly." });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pb-20 pt-10">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
              <h1 className="font-display text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-2">Thank you for your order. A confirmation has been sent to your email.</p>
              <div className="bg-card border border-border rounded-2xl p-6 mt-6 text-left">
                <p className="text-sm font-semibold text-foreground mb-3">{bankDetails[method]?.instructions}</p>
                <ul className="space-y-1">
                  {bankDetails[method]?.details.map((d, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{d}</li>
                  ))}
                </ul>
              </div>
              <Link to="/machines">
                <Button size="lg" className="mt-8 h-12 font-display font-semibold rounded-xl">
                  Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pb-20 pt-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Checkout</h1>
              <p className="text-muted-foreground mt-2">Complete your purchase securely.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name *</label>
                      <Input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name *</label>
                      <Input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                      <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Address *</label>
                      <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">City *</label>
                      <Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">State *</label>
                        <Input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">ZIP *</label>
                        <Input value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} required />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Plan */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-1">Choose Your Payment Plan</h2>
                  <p className="text-xs text-muted-foreground mb-4">Pay in full once, or spread the cost over a low monthly subscription.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button type="button" onClick={() => setPlan("onetime")} className={`p-5 rounded-xl border text-left transition-all ${plan === "onetime" ? "bg-primary/10 border-primary ring-2 ring-primary/30" : "bg-background border-border hover:border-primary/40"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-foreground">One-Time Payment</p>
                        {plan === "onetime" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">Pay the full machine price upfront. No recurring charges.</p>
                      <p className="text-[11px] text-success font-semibold mt-2">✓ Best long-term value</p>
                    </button>
                    <button type="button" onClick={() => setPlan("monthly")} className={`p-5 rounded-xl border text-left transition-all ${plan === "monthly" ? "bg-primary/10 border-primary ring-2 ring-primary/30" : "bg-background border-border hover:border-primary/40"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-foreground">Monthly Plan — <span className="text-primary">$150/mo</span></p>
                        {plan === "monthly" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">$150/month subscription. Cancel anytime after 12 months.</p>
                      <p className="text-[11px] text-accent font-semibold mt-2">✓ Lowest barrier to entry</p>
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">Payment Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {paymentMethods.map((pm) => (
                      <button key={pm.id} type="button" onClick={() => setMethod(pm.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          method === pm.id
                            ? "bg-primary/10 border-primary"
                            : "bg-background border-border hover:border-primary/40"
                        }`}>
                        <pm.icon className={`w-5 h-5 mb-2 ${method === pm.id ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="text-sm font-semibold text-foreground">{pm.label}</p>
                        <p className="text-xs text-muted-foreground">{pm.desc}</p>
                      </button>
                    ))}
                  </div>

                  {bankDetails[method] && (
                    <div className="bg-secondary/50 rounded-xl p-5">
                      <p className="text-sm font-semibold text-foreground mb-3">{bankDetails[method].instructions}</p>
                      <ul className="space-y-1.5">
                        {bankDetails[method].details.map((d, i) => (
                          <li key={i} className="text-sm text-muted-foreground font-mono">{d}</li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Transaction Reference</label>
                        <Input placeholder="Enter your transaction ID" value={form.txRef} onChange={e => setForm({ ...form, txRef: e.target.value })} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">Order Summary</h2>
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    Your cart is empty. <Link to="/machines" className="text-primary hover:underline">Browse machines</Link>
                  </div>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-success font-mono">Free</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground font-mono">$0.00</span>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full h-12 mt-6 font-display font-semibold rounded-xl">
                    <Lock className="w-4 h-4 mr-2" /> Place Order
                  </Button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5" /> Secure 256-bit SSL encrypted
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
