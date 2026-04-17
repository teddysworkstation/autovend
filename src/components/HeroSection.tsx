import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroWarehouse from "@/assets/hero-warehouse-stock.jpg";
import heroShowroom from "@/assets/hero-showroom.jpg";
import heroDelivery from "@/assets/hero-delivery-fleet.jpg";
import heroPokemon from "@/assets/hero-pokemon-vending.jpg";

const slides = [
  { image: heroWarehouse, alt: "Warehouse with rows of premium vending machines in stock for sale" },
  { image: heroShowroom, alt: "Modern combo snack and drink vending machines in showroom" },
  { image: heroDelivery, alt: "AutoVend delivery fleet shipping vending machines nationwide" },
  { image: heroPokemon, alt: "Pokemon vending machine for sale" },
];

const trustItems = [
  "1,000+ Entrepreneurs",
  "Beginner-Friendly",
  "Nationwide Delivery",
  "Video Proof Guarantee",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden bg-hero-dark min-h-[90vh] flex items-center">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image}
              alt={slides[current].alt}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              Premium Vending Machines
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
              Start Your
              <span className="text-gradient-hero block">Vending Machine</span>
              Business Today
            </h1>

            <p className="text-lg text-white/90 max-w-md mb-8 leading-relaxed drop-shadow-md">
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
                <span key={item} className="flex items-center gap-1.5 text-sm text-white/85 drop-shadow">
                  <Star className="w-3 h-3 text-primary fill-primary" /> {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-4 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
