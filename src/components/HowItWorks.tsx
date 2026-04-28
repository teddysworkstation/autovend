import { motion } from "framer-motion";
import { LayoutGrid, Lock, ShieldCheck, Truck } from "lucide-react";

const steps = [
  { num: "01", icon: LayoutGrid, title: "Choose Your Machine", desc: "Browse our catalog and select the machine that fits your budget and location goals.", color: "bg-primary/10 text-primary" },
  { num: "02", icon: Lock, title: "Pick Your Plan", desc: "Pay in full upfront, or start with our $150/month plan. Refundable $500 deposit either way.", color: "bg-accent/10 text-accent" },
  { num: "03", icon: ShieldCheck, title: "Order Verified & Built", desc: "We confirm your order, build your machine to spec, and run full quality assurance before shipping.", color: "bg-success/10 text-success" },
  { num: "04", icon: Truck, title: "Machine Delivered", desc: "Your machine ships to your door. Start placing it and earning within days.", color: "bg-primary/10 text-primary" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary mb-2 block">Simple Process</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
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
              className="relative bg-background rounded-2xl p-6 text-center border border-border hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-4`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">Step {step.num}</span>
              <h3 className="font-display text-base font-semibold text-foreground mt-1 mb-2">
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
