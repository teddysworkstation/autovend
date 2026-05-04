import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, BadgeCheck, Wallet, Sparkles } from "lucide-react";

const features = [
  { icon: BadgeCheck, title: "Industry-Leading Quality", desc: "Commercial-grade machines used by Fortune 500 break rooms, gyms, and hospitals nationwide." },
  { icon: Wallet, title: "Pay In Full or $150/mo", desc: "Pay once, or spread the cost across a low monthly subscription. No deposit on the monthly plan." },
  { icon: Truck, title: "Free Nationwide Delivery", desc: "Free delivery on every order. White-glove placement available in all 50 states." },
  { icon: ShieldCheck, title: "1-Year Parts Warranty", desc: "Every machine ships with a 1-year limited parts warranty plus lifetime toll-free technical support." },
  { icon: Headphones, title: "Real Human Support", desc: "Talk to a vending specialist before AND after your purchase. No bots. No long waits." },
  { icon: Sparkles, title: "Higher Margins", desc: "Cashless-ready, AI tracking on select models, and remote inventory tools = more revenue per machine." },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">Why Vending Machine Hub</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Why Choose VMH for Your Vending Business
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            We built VMH to solve every frustration first-time vending operators face — from quality concerns to upfront cost to ongoing support.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
