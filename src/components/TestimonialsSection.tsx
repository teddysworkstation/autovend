import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  { name: "Marcus T.", location: "Atlanta, GA", machine: "Express Combo", income: "$1,200/mo", rating: 5, quote: "I was skeptical at first, but after receiving video proof of my machine, I felt confident. Now I have three machines earning passive income." },
  { name: "Sarah K.", location: "Dallas, TX", machine: "MarketOne 5W", income: "$900/mo", rating: 5, quote: "The deposit model made it risk-free for me. I saw my exact machine working before paying the full balance. Best investment I've made." },
  { name: "James R.", location: "Phoenix, AZ", machine: "ePay Combo", income: "$1,400/mo", rating: 5, quote: "As a side hustle, this has been incredible. The cashless machine pays for itself. AutoVend made the process seamless." },
  { name: "Lisa M.", location: "Chicago, IL", machine: "MarketOne 3W", income: "$750/mo", rating: 4, quote: "I placed my machine in a local gym and it started generating income within the first week. Customer support has been amazing." },
  { name: "David H.", location: "Miami, FL", machine: "Large Capacity Snack", income: "$1,100/mo", rating: 5, quote: "I now own five machines across different locations. AutoVend helped me build a real business with minimal time investment." },
  { name: "Amanda C.", location: "Seattle, WA", machine: "MarketOne Coffee", income: "$1,600/mo", rating: 5, quote: "The coffee machine was the perfect fit for my office building location. Premium drinks = premium profits. Couldn't be happier." },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide uppercase text-gradient-gold">
            Real People. Real Income.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-primary">{t.income}</p>
                  <p className="text-[10px] text-muted-foreground">{t.machine}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] text-success font-bold tracking-wider uppercase mt-3">
                ✅ Verified Buyer
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/machines"
            className="inline-flex items-center gap-2 font-display text-sm font-bold tracking-widest uppercase text-primary hover:text-gold-light transition-colors"
          >
            Join 1,000+ Entrepreneurs → Browse Machines
          </Link>
        </div>
      </div>
    </section>
  );
}
