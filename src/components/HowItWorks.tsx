import { motion } from "framer-motion";
import { LayoutGrid, Lock, Video, Truck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: LayoutGrid,
    title: "Choose Your Machine",
    desc: "Browse our catalog and select the machine that fits your budget and location goals.",
  },
  {
    num: "02",
    icon: Lock,
    title: "Pay $500 Deposit",
    desc: "Secure your machine with a refundable $500 deposit. No commitment until you see proof.",
  },
  {
    num: "03",
    icon: Video,
    title: "Receive Video Proof",
    desc: "We send you a real-time video of your exact machine before you pay the balance.",
  },
  {
    num: "04",
    icon: Truck,
    title: "Machine Delivered",
    desc: "Your machine ships to your door. Start placing it and earning within days.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide uppercase text-gradient-gold">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Four simple steps to owning your first vending machine business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative bg-card border border-border rounded-xl p-6 text-center group hover:border-primary/30 transition-colors"
            >
              <span className="font-display text-4xl font-extrabold text-primary/20 absolute top-4 right-4">
                {step.num}
              </span>
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-bold tracking-wide uppercase text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
