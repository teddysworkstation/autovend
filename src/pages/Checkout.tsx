import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight, Shield, Lock, CheckCircle2, Mail, Phone, Trash2,
  Building2, Banknote, Bitcoin, Wallet, Download, Plus, Minus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { downloadInvoicePDF, type InvoiceData } from "@/lib/invoice";
import { supabase } from "@/integrations/supabase/client";

type PlanId = "onetime" | "monthly";
type PaymentMethod = "bank" | "wire" | "zelle" | "btc";

const PAYMENT_METHODS: { id: PaymentMethod; label: string; desc: string; icon: any }[] = [
  { id: "bank", label: "Bank Transfer (ACH)", desc: "Domestic ACH from your bank account.", icon: Building2 },
  { id: "wire", label: "Wire Transfer", desc: "Same-day domestic or international wire.", icon: Banknote },
  { id: "zelle", label: "Zelle", desc: "Instant transfer via your bank's Zelle service.", icon: Wallet },
  { id: "btc", label: "Bitcoin (BTC)", desc: "Pay with BTC at the network rate at confirmation.", icon: Bitcoin },
];

const MONTHLY_PRICE = 150;

export default function Checkout() {
  const { toast } = useToast();
  const { items, updateQty, remove, subtotal, clear } = useCart();
  const [plan, setPlan] = useState<PlanId>("onetime");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [generating, setGenerating] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    altPhone: "", company: "", businessType: "",
    address: "", city: "", state: "", zip: "",
    preferredContact: "Email", preferredTime: "9am – 12pm",
    notes: "",
  });

  const buildInvoiceData = (orderNo: string): InvoiceData => ({
    orderNumber: orderNo,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    customer: { ...form },
    items,
    subtotal,
    plan,
    paymentMethod,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast({ title: "Your cart is empty", description: "Add a machine to your cart before checking out.", variant: "destructive" });
      return;
    }
    setGenerating(true);
    const orderNo = `VMH-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNo);
    const total = plan === "monthly" ? MONTHLY_PRICE : subtotal;

    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("create-order", {
        body: {
          order: {
            order_number: orderNo, status: "pending", plan, payment_method: paymentMethod,
            subtotal, total,
            first_name: form.firstName, last_name: form.lastName, email: form.email, phone: form.phone,
            alt_phone: form.altPhone || null, company: form.company || null, business_type: form.businessType || null,
            address: form.address, city: form.city, state: form.state, zip: form.zip,
            preferred_contact: form.preferredContact, preferred_time: form.preferredTime, notes: form.notes || null,
          },
          items: items.map(it => ({
            product_slug: it.slug, title: it.title, price: it.price, quantity: it.quantity, image_url: it.image,
          })),
        },
      });

      if (fnError) throw new Error(fnError.message || "Failed to save order");
      if (result?.error) throw new Error(result.error);
      toast({ title: "Order received!", description: "Download your invoice on the next page. We'll contact you shortly." });
      setSubmitted(true);
      clear();
    } catch (err: any) {
      toast({ title: "Could not save order", description: err?.message || "Please try again.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const planTotal = plan === "monthly" ? MONTHLY_PRICE : subtotal;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pb-20 pt-10">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
              <h1 className="font-display text-3xl font-bold text-foreground mb-3">Order Received!</h1>
              <p className="text-sm text-muted-foreground mb-1">Order # <span className="font-mono font-semibold text-foreground">{orderNumber}</span></p>
              <p className="text-muted-foreground mb-2">
                Your invoice has been downloaded. A VMH specialist will reach out shortly to confirm details and share secure payment instructions for your selected method.
              </p>
              <div className="bg-card border border-border rounded-2xl p-6 mt-6 text-left">
                <p className="text-sm font-semibold text-foreground mb-3">What happens next</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Confirmation email within 15 minutes.</li>
                  <li className="flex gap-2"><Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" /> A specialist calls to verify your order.</li>
                  <li className="flex gap-2"><Lock className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Secure payment instructions sent after confirmation.</li>
                </ul>
              </div>
              <Button
                size="lg"
                onClick={() => downloadInvoicePDF(buildInvoiceData(orderNumber))}
                className="mt-6 h-12 font-display font-semibold rounded-xl w-full"
              >
                <Download className="w-4 h-4 mr-2" /> Download Invoice (PDF)
              </Button>
              <Link to={`/track-order`}>
                <Button variant="outline" size="lg" className="mt-3 h-12 font-display font-semibold rounded-xl w-full">
                  Track Your Order <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/machines">
                <Button variant="ghost" size="lg" className="mt-2 h-12 font-display font-semibold rounded-xl w-full">
                  Continue Shopping
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
              <p className="text-muted-foreground mt-2">Complete your purchase securely. Payment instructions sent after order confirmation.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-2 space-y-6">
                {/* Contact / Shipping */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">Contact & Shipping</h2>
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
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
                      <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Alternate Phone</label>
                      <Input value={form.altPhone} onChange={e => setForm({ ...form, altPhone: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name</label>
                      <Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Acme Vending LLC" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Business Type / Use Case</label>
                      <Input value={form.businessType} onChange={e => setForm({ ...form, businessType: e.target.value })} placeholder="Office, gym, apartment complex, hobby store…" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Contact Method</label>
                      <select value={form.preferredContact} onChange={e => setForm({ ...form, preferredContact: e.target.value })}
                        className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                        <option>Email</option><option>Phone Call</option><option>Text / SMS</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Best Time to Contact</label>
                      <select value={form.preferredTime} onChange={e => setForm({ ...form, preferredTime: e.target.value })}
                        className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                        <option>9am – 12pm</option><option>12pm – 3pm</option><option>3pm – 6pm</option><option>Evenings</option><option>Anytime</option>
                      </select>
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
                      <p className="font-mono text-base font-bold text-primary mt-2">${subtotal.toLocaleString()}</p>
                    </button>
                    <button type="button" onClick={() => setPlan("monthly")} className={`p-5 rounded-xl border text-left transition-all ${plan === "monthly" ? "bg-primary/10 border-primary ring-2 ring-primary/30" : "bg-background border-border hover:border-primary/40"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-foreground">Monthly Plan</p>
                        {plan === "monthly" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">Low monthly subscription. Cancel anytime after 12 months.</p>
                      <p className="font-mono text-base font-bold text-accent mt-2">${MONTHLY_PRICE} / mo</p>
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" /> Payment Method
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4">Select your preferred payment method. Account / wallet details will be sent after order confirmation.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map((m) => (
                      <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                        className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${paymentMethod === m.id ? "bg-primary/10 border-primary ring-2 ring-primary/30" : "bg-background border-border hover:border-primary/40"}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${paymentMethod === m.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                          <m.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-foreground">{m.label}</p>
                            {paymentMethod === m.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-sm text-foreground font-semibold mb-1">Payment details will be communicated after order confirmation.</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Once you place your order, a VMH specialist will contact you within 1 business hour to verify your details and securely share account, wallet, or routing information for your selected payment method.
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Order Notes (optional)</label>
                    <Input placeholder="Anything we should know about your order or location?"
                      value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6 lg:sticky lg:top-24">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">Order Summary</h2>

                  {items.length === 0 ? (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                      Your cart is empty.<br />
                      <Link to="/machines" className="text-primary hover:underline font-medium">Browse machines →</Link>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto -mx-2 px-2">
                      {items.map((item) => (
                        <div key={item.slug} className="flex gap-3 pb-3 border-b border-border last:border-b-0">
                          <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg bg-secondary object-contain p-1 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground line-clamp-2">{item.title}</p>
                            <p className="font-mono text-xs text-primary mt-0.5">${(item.price * item.quantity).toLocaleString()}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <button type="button" onClick={() => updateQty(item.slug, item.quantity - 1)}
                                className="w-6 h-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs w-6 text-center">{item.quantity}</span>
                              <button type="button" onClick={() => updateQty(item.slug, item.quantity + 1)}
                                className="w-6 h-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
                                <Plus className="w-3 h-3" />
                              </button>
                              <button type="button" onClick={() => remove(item.slug)}
                                className="ml-auto w-6 h-6 rounded-md text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-border pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-mono">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-success font-mono">FREE</span>
                    </div>
                    {plan === "monthly" && (
                      <div className="flex justify-between text-xs bg-accent/10 -mx-2 px-2 py-1.5 rounded">
                        <span className="text-accent font-medium">Monthly Plan Selected</span>
                        <span className="text-accent font-mono font-bold">${MONTHLY_PRICE}/mo</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                      <span className="text-foreground">{plan === "monthly" ? "Today" : "Total"}</span>
                      <span className="text-foreground font-mono">
                        {plan === "monthly" ? `$${MONTHLY_PRICE}` : `$${subtotal.toLocaleString()}`}
                      </span>
                    </div>
                    {plan === "monthly" && subtotal > 0 && (
                      <p className="text-[11px] text-muted-foreground text-right">
                        Full machine value: ${subtotal.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <Button type="submit" size="lg" disabled={items.length === 0 || generating}
                    className="w-full h-12 mt-6 font-display font-semibold rounded-xl">
                    {generating ? "Processing…" : (
                      <>
                        <Lock className="w-4 h-4 mr-2" /> Place Order
                      </>
                    )}
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" /> PDF invoice auto-downloads on submit
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
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
