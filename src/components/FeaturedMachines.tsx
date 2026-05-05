import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Star, ShoppingCart } from "lucide-react";
import { useProducts, formatPrice, type Product } from "@/data/products";
import { getReviewCountForProduct, getAverageRatingForProduct } from "@/data/reviews";
import { useCart } from "@/hooks/useCart";
import ViewerCount from "@/components/ViewerCount";

const tabs = [
  { key: "all", label: "All" },
  { key: "ai-vending", label: "AI Vending" },
  { key: "combo", label: "Combo" },
  { key: "snack", label: "Snack" },
  { key: "drink", label: "Drink" },
  { key: "smart-store", label: "Smart Stores" },
  { key: "specialized", label: "Specialized" },
];

function MachineCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const reviewCount = getReviewCountForProduct(product.slug);
  const avgRating = getAverageRatingForProduct(product.slug);
  const displayCount = reviewCount > 0 ? reviewCount : 12 + ((product.slug.length * 7) % 40);
  const displayRating = reviewCount > 0 ? avgRating : 4.8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
    >
      <Link to={`/machines/${product.slug}`} className="block">
        <div className="aspect-square bg-secondary overflow-hidden relative">
          {!product.inStock ? (
            <div className="absolute inset-0 bg-background/60 z-10 flex items-center justify-center">
              <span className="text-sm font-bold text-destructive bg-destructive/10 border border-destructive/20 px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          ) : null}
          <img
            src={product.images[0]}
            alt={`${product.title} — vending machine for sale`}
            className={`w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500 ${!product.inStock ? "opacity-50 grayscale" : ""}`}
            loading="lazy"
          />
          {product.inStock && product.stockCount <= 5 && (
            <span className="absolute top-3 left-3 text-[10px] font-semibold bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" /> Only {product.stockCount} left
            </span>
          )}
          {product.salePrice && (
            <span className="absolute top-3 right-3 text-[10px] font-semibold bg-accent text-accent-foreground px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
        <div className="p-4 sm:p-5">
          <span className="text-[11px] font-medium text-primary">{product.category}</span>
          <h3 className="font-display text-sm font-semibold text-foreground mt-1.5 leading-snug line-clamp-2">
            {product.title}
          </h3>
          {!product.hideReviews && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.round(displayRating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground">
                {displayRating} ({displayCount})
              </span>
            </div>
          )}
          <div className="flex items-baseline gap-2 mt-2">
            {product.salePrice ? (
              <>
                <span className="font-mono text-lg font-bold text-primary">{formatPrice(product.salePrice)}</span>
                <span className="font-mono text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-mono text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Est. {formatPrice(product.estimatedMonthlyIncomeMin)}–{formatPrice(product.estimatedMonthlyIncomeMax)}/mo
          </p>
          {product.inStock && !product.hideViewers && (
            <div className="mt-2">
              <ViewerCount slug={product.slug} />
            </div>
          )}
        </div>
      </Link>
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        {product.inStock ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              add({
                slug: product.slug,
                title: product.title,
                price: product.salePrice ?? product.price,
                image: product.images[0],
              });
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
          </button>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-muted text-muted-foreground cursor-not-allowed">
            Sold Out
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturedMachines() {
  const [activeTab, setActiveTab] = useState("all");
  const { products } = useProducts();
  const featured = products.filter((p) => p.isFeatured);

  const filtered = activeTab === "all"
    ? featured
    : featured.filter((p) => p.categorySlug === activeTab);

  return (
    <section id="featured" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">Our Collection</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Best-Selling Machines
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
              className={`text-sm font-medium px-5 py-2 rounded-full transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((product, i) => (
            <MachineCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/machines"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            View All {featured.length}+ Machines <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
