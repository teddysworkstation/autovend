import { motion } from "framer-motion";
import { Video, ShieldCheck, BadgeCheck } from "lucide-react";

const trustCards = [
  {
    icon: Video,
    title: "Video Proof Before You Pay",
    desc: "We record and send you a real-time video of your exact machine in operation before you pay the remaining balance. Full transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment Processing",
    desc: "All transactions are processed through Stripe with bank-level encryption. Your payment information is never stored on our servers.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Supplier Network",
    desc: "Every machine in our catalog comes from verified, commercial-grade manufacturers with full warranties and lifetime support.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 border-b border-border bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-bold tracking-wide uppercase text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <span className="font-mono text-sm text-muted-foreground">
            🚚 <span className="text-primary font-bold">247</span> machines delivered this month
          </span>
        </div>
      </div>
    </section>
  );
}
