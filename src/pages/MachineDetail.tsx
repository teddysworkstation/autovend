import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Video, Package, RotateCcw, Truck, Star, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductBySlug, products, formatPrice, type Product } from "@/data/products";
import { useState } from "react";

const trustBadges = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: Check, label: "Verified Supplier" },
  { icon: Video, label: "Video Proof Included" },
  { icon: RotateCcw, label: "Refundable Deposit" },
  { icon: Truck, label: "Nationwide Delivery" },
];

const tabs = ["Features", "Earnings", "Specifications", "Delivery", "Reviews"];

export default function MachineDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const [activeTab, setActiveTab] = useState("Features");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Machine Not Found</h1>
          <Link to="/machines" className="text-primary mt-4 inline-block">← Back to Machines</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const effectivePrice = product.salePrice || product.price;
  const remainingBalance = effectivePrice - product.deposit;
  const related = products.filter(p => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/machines" className="hover:text-foreground transition-colors">Machines</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="aspect-square bg-surface-2 flex items-center justify-center p-8">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[11px] font-display font-bold tracking-[2px] uppercase text-primary">
                  {product.category}
                </span>
                <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-wide uppercase text-foreground mt-2">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-baseline gap-3">
                  {product.salePrice ? (
                    <>
                      <span className="font-mono text-3xl font-bold text-primary">{formatPrice(product.salePrice)}</span>
                      <span className="font-mono text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                    </>
                  ) : (
                    <span className="font-mono text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                  )}
                </div>
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-primary font-semibold">
                    OR start with a {formatPrice(product.deposit)} deposit today
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Balance due after video proof: {formatPrice(remainingBalance)}
                  </p>
                </div>
              </div>

              {/* Income estimate */}
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                <div>
                  <p className="text-xs font-display font-bold tracking-widest uppercase text-muted-foreground">Est. Monthly Income</p>
                  <p className="font-mono text-xl font-bold text-primary mt-1">
                    {formatPrice(product.estimatedMonthlyIncomeMin)} – {formatPrice(product.estimatedMonthlyIncomeMax)}
                  </p>
                </div>
                <div className="border-l border-border pl-4">
                  <p className="text-xs font-display font-bold tracking-widest uppercase text-muted-foreground">ROI</p>
                  <p className="font-mono text-xl font-bold text-foreground mt-1">~{product.roiMonths} mo</p>
                </div>
              </div>

              {/* Stock */}
              {product.stockCount <= 5 ? (
                <p className="text-sm text-destructive font-semibold animate-pulse">
                  🔥 Almost Gone — Only {product.stockCount} left in stock
                </p>
              ) : (
                <p className="text-sm text-success font-semibold">
                  ✓ In Stock — {product.stockCount} available
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 h-[52px] font-display text-sm font-bold tracking-widest uppercase">
                  Pay {formatPrice(product.deposit)} Deposit
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 h-[52px] font-display text-sm font-bold tracking-widest uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Request Video Proof
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {trustBadges.map((badge) => (
                  <span key={badge.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <badge.icon className="w-3.5 h-3.5 text-primary" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-1 border-b border-border overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-display text-xs font-bold tracking-widest uppercase px-6 py-3 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === "Features" && (
                <div className="space-y-3">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{f}</span>
                    </div>
                  ))}
                  <div className="mt-6 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                </div>
              )}
              {activeTab === "Earnings" && (
                <div className="max-w-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between p-4 bg-card border border-border rounded-lg">
                      <span className="text-sm text-muted-foreground">Monthly Income Range</span>
                      <span className="font-mono text-sm font-bold text-primary">
                        {formatPrice(product.estimatedMonthlyIncomeMin)} – {formatPrice(product.estimatedMonthlyIncomeMax)}
                      </span>
                    </div>
                    <div className="flex justify-between p-4 bg-card border border-border rounded-lg">
                      <span className="text-sm text-muted-foreground">Annual Income Range</span>
                      <span className="font-mono text-sm font-bold text-foreground">
                        {formatPrice(product.estimatedMonthlyIncomeMin * 12)} – {formatPrice(product.estimatedMonthlyIncomeMax * 12)}
                      </span>
                    </div>
                    <div className="flex justify-between p-4 bg-card border border-border rounded-lg">
                      <span className="text-sm text-muted-foreground">Estimated ROI</span>
                      <span className="font-mono text-sm font-bold text-foreground">~{product.roiMonths} months</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-6">
                    * Income estimates based on industry averages and location type. Actual results vary.
                  </p>
                </div>
              )}
              {activeTab === "Specifications" && (
                <p className="text-sm text-muted-foreground">Detailed specifications available upon request. Contact us for a full spec sheet.</p>
              )}
              {activeTab === "Delivery" && (
                <div className="space-y-3 max-w-lg">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-foreground font-semibold">Estimated Delivery: 5–10 business days</p>
                    <p className="text-xs text-muted-foreground mt-1">Nationwide shipping included. White-glove delivery available.</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-foreground font-semibold">1-Year Limited Parts Warranty</p>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime toll-free technical support included with every machine.</p>
                  </div>
                </div>
              )}
              {activeTab === "Reviews" && (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on verified customer reviews</p>
                </div>
              )}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12 border-t border-border pt-12">
              <h2 className="font-display text-2xl font-bold tracking-wide uppercase text-foreground mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/machines/${p.slug}`}
                    className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <div className="aspect-square bg-surface-2 overflow-hidden">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-xs font-bold tracking-wide uppercase text-foreground line-clamp-2">{p.title}</h3>
                      <p className="font-mono text-sm font-bold text-primary mt-2">{formatPrice(p.salePrice || p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 flex gap-3 lg:hidden z-40">
        <Button size="lg" className="flex-1 h-12 font-display text-xs font-bold tracking-widest uppercase">
          Pay {formatPrice(product.deposit)} Deposit
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 h-12 font-display text-xs font-bold tracking-widest uppercase border-primary text-primary"
        >
          Video Proof
        </Button>
      </div>

      <Footer />
    </div>
  );
}
