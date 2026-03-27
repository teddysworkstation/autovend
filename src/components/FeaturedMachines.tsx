import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getFeaturedProducts, formatPrice, type Product } from "@/data/products";

const tabs = [
  { key: "all", label: "All" },
  { key: "combo", label: "Combo" },
  { key: "snack", label: "Snack" },
  { key: "drink", label: "Drink" },
  { key: "specialized", label: "Specialized" },
];

function MachineCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link
        to={`/machines/${product.slug}`}
        className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
      >
        <div className="aspect-square bg-surface-2 overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.stockCount <= 5 && (
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-destructive text-destructive-foreground px-2 py-1 rounded">
              Only {product.stockCount} left
            </span>
          )}
          {product.salePrice && (
            <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase bg-primary text-primary-foreground px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>
        <div className="p-5">
          <span className="text-[10px] font-display font-bold tracking-[2px] uppercase text-primary">
            {product.category}
          </span>
          <h3 className="font-display text-base font-bold tracking-wide uppercase text-foreground mt-2 leading-tight">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 mt-3">
            {product.salePrice ? (
              <>
                <span className="font-mono text-lg font-bold text-primary">{formatPrice(product.salePrice)}</span>
                <span className="font-mono text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-mono text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Est. {formatPrice(product.estimatedMonthlyIncomeMin)}–{formatPrice(product.estimatedMonthlyIncomeMax)}/mo income
          </p>
          <div className="mt-4 text-center py-2.5 border border-border rounded-lg font-display text-xs font-bold tracking-widest uppercase text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
            View Machine
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedMachines() {
  const [activeTab, setActiveTab] = useState("all");
  const featured = getFeaturedProducts();

  const filtered = activeTab === "all"
    ? featured
    : featured.filter((p) => {
        const cat = p.category.toLowerCase();
        return cat.includes(activeTab);
      });

  return (
    <section id="featured" className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide uppercase text-gradient-gold">
            Our Best-Selling Machines
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Premium vending machines built for entrepreneurs who want reliable passive income.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-display text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-lg border transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <MachineCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/machines"
            className="inline-flex items-center gap-2 font-display text-sm font-bold tracking-widest uppercase text-primary hover:text-gold-light transition-colors"
          >
            View All Machines →
          </Link>
        </div>
      </div>
    </section>
  );
}
