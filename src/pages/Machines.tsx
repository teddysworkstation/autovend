import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, categories, formatPrice, type Product } from "@/data/products";

function MachineCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.3 }}
    >
      <Link
        to={`/machines/${product.slug}`}
        className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
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
        </div>
        <div className="p-4">
          <span className="text-[10px] font-display font-bold tracking-[2px] uppercase text-primary">
            {product.category}
          </span>
          <h3 className="font-display text-sm font-bold tracking-wide uppercase text-foreground mt-1.5 leading-tight line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            {product.salePrice ? (
              <>
                <span className="font-mono text-base font-bold text-primary">{formatPrice(product.salePrice)}</span>
                <span className="font-mono text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-mono text-base font-bold text-foreground">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">
            Est. {formatPrice(product.estimatedMonthlyIncomeMin)}–{formatPrice(product.estimatedMonthlyIncomeMax)}/mo
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Machines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";
  const [sortBy, setSortBy] = useState("default");

  const allCategories = [{ slug: "all", name: "All Machines", icon: "grid" }, ...categories];

  let filtered = activeCategory === "all"
    ? products
    : products.filter((p) => {
        const cat = p.category.toLowerCase();
        if (activeCategory === "combo") return cat.includes("combo");
        if (activeCategory === "drink") return (cat.includes("drink") || cat.includes("soda")) && !cat.includes("combo") && !cat.includes("cold food");
        if (activeCategory === "snack") return cat.includes("snack");
        if (activeCategory === "coffee") return cat.includes("coffee") || cat.includes("hot");
        if (activeCategory === "frozen") return cat.includes("frozen") || cat.includes("cold food");
        if (activeCategory === "specialized") return cat.includes("specialized");
        if (activeCategory === "used") return cat.includes("used");
        return false;
      });

  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  if (sortBy === "income") filtered = [...filtered].sort((a, b) => b.estimatedMonthlyIncomeMax - a.estimatedMonthlyIncomeMax);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-wide uppercase text-gradient-gold">
              Vending Machines
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              {filtered.length} machines available. All include nationwide delivery and lifetime support.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSearchParams(cat.slug === "all" ? {} : { cat: cat.slug })}
                  className={`font-display text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-lg border transition-all ${
                    activeCategory === cat.slug
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-xs text-foreground font-display tracking-wider uppercase"
            >
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="income">Highest Income</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <MachineCard key={product.slug} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No machines found in this category.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
