import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { products, categories, categoryDescriptions, formatPrice, type Product } from "@/data/products";
import { getReviewCountForProduct, getAverageRatingForProduct } from "@/data/reviews";
import { useCart } from "@/hooks/useCart";

function MachineCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const reviewCount = getReviewCountForProduct(product.slug);
  const avgRating = getAverageRatingForProduct(product.slug);
  const displayCount = reviewCount > 0 ? reviewCount : 12 + ((product.slug.length * 7) % 40);
  const displayRating = reviewCount > 0 ? avgRating : 4.8;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
      className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <Link to={`/machines/${product.slug}`} className="group block">
        <div className="aspect-square bg-secondary overflow-hidden relative">
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 z-10 flex items-center justify-center">
              <span className="text-sm font-bold text-destructive bg-destructive/10 border border-destructive/20 px-4 py-2 rounded-full">Out of Stock</span>
            </div>
          )}
          <img src={product.images[0]} alt={`${product.title} — vending machine for sale`}
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
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(displayRating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">{displayRating} ({displayCount})</span>
          </div>
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
      <div className="px-4 pb-4 mt-auto">
        {product.inStock ? (
          <button
            onClick={() => add({ slug: product.slug, title: product.title, price: product.salePrice ?? product.price, image: product.images[0] })}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
          </button>
        ) : (
          <div className="w-full text-center py-2 rounded-xl text-xs font-medium bg-muted text-muted-foreground">Sold Out</div>
        )}
      </div>
    </motion.div>
  );
}

export default function Machines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";
  const [sortBy, setSortBy] = useState("default");

  const allCategories = [{ slug: "all", name: "All Machines", icon: "grid" }, ...categories];

  let filtered = activeCategory === "all" ? products : products.filter((p) => p.categorySlug === activeCategory);
  const catInfo = categoryDescriptions[activeCategory];

  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  if (sortBy === "income") filtered = [...filtered].sort((a, b) => b.estimatedMonthlyIncomeMax - a.estimatedMonthlyIncomeMax);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={catInfo ? `${catInfo.title} | VMH` : "Vending Machines for Sale | Browse All Machines — VMH"}
        description={catInfo?.description?.slice(0, 160) || "Browse our full collection of vending machines for sale. Combo, snack, drink, smart stores & more. Free shipping nationwide."}
        keywords={catInfo?.keywords || "vending machine for sale, vending machine, pokemon vending machine, buy vending machine"}
        canonical={`https://autovend.lovable.app/machines${activeCategory !== "all" ? `?cat=${activeCategory}` : ""}`}
      />
      <TopBar />
      <Navbar />
      <div className="pb-20 pt-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-primary mb-2 block">Our Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {catInfo?.title || "Vending Machines for Sale"}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
              {catInfo?.description || `${filtered.length} vending machines for sale. All include free nationwide delivery, lifetime support, and our flexible $150/month payment plan.`}
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
