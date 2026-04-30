import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Truck } from "lucide-react";

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Secure Payment Processing",
    desc: "All transactions are processed with bank-level encryption. Your payment information is never stored on our servers.",
    accent: "primary" as const,
  },
  {
    icon: BadgeCheck,
    title: "Verified Supplier Network",
    desc: "Every machine in our catalog comes from verified, commercial-grade manufacturers with full warranties and U.S. parts inventory.",
    accent: "accent" as const,
  },
  {
    icon: Truck,
    title: "Free Nationwide Delivery",
    desc: "Every order ships free across the lower 48 states with white-glove delivery available — fully insured from our warehouse to your door.",
    accent: "primary" as const,
  },
];

export default function TrustSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent mb-2 block">Why VMH</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Built on Trust
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustCards.map((card, i) => {
            const isAccent = card.accent === "accent";
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                    isAccent ? "bg-accent/10" : "bg-primary/10"
                  }`}
                >
                  <card.icon className={`w-6 h-6 ${isAccent ? "text-accent" : "text-primary"}`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
