import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { products, categories, formatPrice, type Product } from "@/data/products";

function MachineCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
    >
      <Link to={`/machines/${product.slug}`}
        className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-square bg-secondary overflow-hidden relative">
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 z-10 flex items-center justify-center">
              <span className="text-sm font-bold text-destructive bg-destructive/10 border border-destructive/20 px-4 py-2 rounded-full">Out of Stock</span>
            </div>
          )}
          <img src={product.images[0]} alt={`${product.title} - Vending Machine for Sale`}
            className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ${!product.inStock ? "opacity-50 grayscale" : ""}`} loading="lazy" />
          {product.inStock && product.stockCount <= 5 && (
            <span className="absolute top-3 left-3 text-[10px] font-semibold bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full">
              Only {product.stockCount} left
            </span>
          )}
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-primary">{product.category}</span>
          <h3 className="font-display text-sm font-semibold text-foreground mt-1 leading-snug line-clamp-2">{product.title}</h3>
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

  let filtered = activeCategory === "all" ? products : products.filter((p) => {
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
      <SEOHead
        title="Vending Machines for Sale | Browse All Machines — VMH"
        description="Browse our full collection of vending machines for sale. Combo machines, snack machines, drink machines, Pokemon vending machines & more. Free shipping nationwide."
        keywords="vending machine for sale, vending machine, pokemon vending machine, buy vending machine, combo vending machine, snack machine"
        canonical="https://autovend.lovable.app/machines"
      />
      <TopBar />
      <Navbar />
      <div className="pb-20 pt-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-primary mb-2 block">Our Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Vending Machines for Sale</h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              {filtered.length} machines available. All include nationwide delivery and lifetime support.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button key={cat.slug}
                  onClick={() => setSearchParams(cat.slug === "all" ? {} : { cat: cat.slug })}
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${
                    activeCategory === cat.slug
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                  }`}>
                  {cat.name}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border rounded-xl px-4 py-2 text-sm text-foreground">
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="income">Highest Income</option>
            </select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
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
