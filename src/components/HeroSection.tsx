import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const trustItems = [
  "Trusted by 1,000+ Entrepreneurs",
  "Beginner-Friendly System",
  "Fast Nationwide Delivery",
  "Video Proof Before Final Payment",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-texture">
      <div className="absolute inset-0 bg-gold-glow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 container mx-auto px-4 text-center pt-20 pb-24"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground text-[11px] font-bold tracking-[2.5px] uppercase py-1.5 px-5 rounded-full">
            ⚡ Premium Vending Machines
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold text-gradient-gold uppercase leading-[1.05] tracking-wide"
          style={{ fontSize: "clamp(44px, 7vw, 88px)" }}
        >
          Start Your Vending
          <br />
          Machine Business Today
        </motion.h1>

        <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
          Own a machine. Generate passive income. No experience needed.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button asChild size="lg" className="h-[52px] min-w-[200px] font-display text-sm font-bold tracking-widest uppercase">
            <Link to="/machines">Browse Machines</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-[52px] min-w-[200px] font-display text-sm font-bold tracking-widest uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-12">
          {trustItems.map((item) => (
            <span key={item} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-primary">✓</span> {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-16"
        >
          <a href="#featured" className="inline-block animate-bounce">
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
