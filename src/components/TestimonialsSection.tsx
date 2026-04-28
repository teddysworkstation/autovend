import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  { name: "Marcus T.", location: "Atlanta, GA", machine: "Express Combo", income: "$1,200/mo", rating: 5, quote: "I was skeptical at first, but the $150/month plan made it affordable to start, and the machine quality blew me away. Now I have three machines earning passive income.", avatar: "MT" },
  { name: "Sarah K.", location: "Dallas, TX", machine: "MarketOne 5W", income: "$900/mo", rating: 5, quote: "The deposit model made it risk-free for me. I saw my exact machine working before paying the full balance. Best investment I've made.", avatar: "SK" },
  { name: "James R.", location: "Phoenix, AZ", machine: "ePay Combo", income: "$1,400/mo", rating: 5, quote: "As a side hustle, this has been incredible. The cashless machine pays for itself. VMH made the process seamless.", avatar: "JR" },
  { name: "Lisa M.", location: "Chicago, IL", machine: "MarketOne 3W", income: "$750/mo", rating: 4, quote: "I placed my machine in a local gym and it started generating income within the first week. Customer support has been amazing.", avatar: "LM" },
  { name: "David H.", location: "Miami, FL", machine: "Large Capacity Snack", income: "$1,100/mo", rating: 5, quote: "I now own five machines across different locations. VMH helped me build a real business with minimal time investment.", avatar: "DH" },
  { name: "Amanda C.", location: "Seattle, WA", machine: "MarketOne Coffee", income: "$1,600/mo", rating: 5, quote: "The coffee machine was the perfect fit for my office building location. Premium drinks = premium profits.", avatar: "AC" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">Customer Stories</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
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
              className="bg-background rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < t.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-primary">{t.income}</p>
                  <p className="text-[10px] text-muted-foreground">{t.machine}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/machines" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
            Join 1,000+ Entrepreneurs →
          </Link>
        </div>
      </div>
    </section>
  );
}
