import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck } from "lucide-react";

const trustCards = [
  { icon: ShieldCheck, title: "Secure Payment Processing", desc: "All transactions are processed through Stripe with bank-level encryption. Your payment information is never stored." },
  { icon: BadgeCheck, title: "Verified Supplier Network", desc: "Every machine in our catalog comes from verified, commercial-grade manufacturers with full warranties." },
];

export default function TrustSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">Why VMH</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Built on Trust
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
