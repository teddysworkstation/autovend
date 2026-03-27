import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPokemon from "@/assets/hero-pokemon-vending.jpg";
import heroMachines from "@/assets/hero-machines-row.jpg";
import heroLifestyle from "@/assets/hero-lifestyle.jpg";

const trustItems = [
  "1,000+ Entrepreneurs",
  "Beginner-Friendly",
  "Nationwide Delivery",
  "Video Proof Guarantee",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-dark min-h-[90vh] flex items-center">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-20 pt-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/20">
              <Zap className="w-4 h-4" />
              Premium Vending Machines
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Start Your
              <span className="text-gradient-hero block">Vending Machine</span>
              Business Today
            </h1>

            <p className="text-lg text-white/60 max-w-md mb-8 leading-relaxed">
              Own a machine. Generate passive income. No experience needed.
              Join 1,000+ entrepreneurs already earning.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button asChild size="lg" className="h-12 px-8 font-display font-semibold text-base rounded-xl">
                <Link to="/machines">
                  Browse Machines <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 font-display font-semibold text-base rounded-xl border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white"
              >
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              {trustItems.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-white/50">
                  <Star className="w-3 h-3 text-primary fill-primary" /> {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main image - Pokemon vending */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
              >
                <img
                  src={heroPokemon}
                  alt="Pokemon vending machine"
                  className="w-full h-[420px] object-cover"
                  width={800}
                  height={1024}
                />
              </motion.div>

              {/* Floating card - row of machines */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-10 w-48 rounded-xl overflow-hidden shadow-xl border border-white/10 z-30"
              >
                <img
                  src={heroMachines}
                  alt="Vending machines in office"
                  className="w-full h-32 object-cover"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
              </motion.div>

              {/* Floating card - lifestyle */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -right-6 w-40 rounded-xl overflow-hidden shadow-xl border border-white/10 z-30"
              >
                <img
                  src={heroLifestyle}
                  alt="Person using vending machine"
                  className="w-full h-28 object-cover"
                  loading="lazy"
                  width={800}
                  height={1024}
                />
              </motion.div>

              {/* Stats floating card */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -left-16 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10 z-30"
              >
                <p className="font-mono text-xs text-white/50">Monthly Avg</p>
                <p className="font-display text-xl font-bold text-white">$1,200</p>
                <p className="text-xs text-primary">+23% this month</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
