import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Video, Package, RotateCcw, Truck, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProductReviews from "@/components/ProductReviews";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { getReviewsForProduct, getAllReviews } from "@/data/reviews";
import { useState } from "react";

const trustBadges = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: Check, label: "Verified Supplier" },
  { icon: Video, label: "Video Proof Included" },
  { icon: RotateCcw, label: "Refundable Deposit" },
  { icon: Truck, label: "Nationwide Delivery" },
];

const tabs = ["Features", "Earnings", "Delivery", "Reviews"];

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
  const productReviews = getReviewsForProduct(product.slug);
  const displayReviews = productReviews.length > 0 ? productReviews : getAllReviews().slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/machines" className="hover:text-primary transition-colors">Machines</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border">
              <div className="aspect-square bg-secondary flex items-center justify-center p-8">
                <img src={product.images[0]} alt={product.title} className="max-w-full max-h-full object-contain" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <span className="text-sm font-medium text-primary">{product.category}</span>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">{product.title}</h1>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
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
                <div className="mt-4 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                  <p className="text-sm text-primary font-semibold">Or start with a {formatPrice(product.deposit)} deposit</p>
                  <p className="text-xs text-muted-foreground mt-1">Balance due after video proof: {formatPrice(remainingBalance)}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 bg-card border border-border rounded-2xl">
                <div>
                  <p className="text-xs text-muted-foreground">Est. Monthly Income</p>
                  <p className="font-mono text-xl font-bold text-primary mt-0.5">
                    {formatPrice(product.estimatedMonthlyIncomeMin)} – {formatPrice(product.estimatedMonthlyIncomeMax)}
                  </p>
                </div>
                <div className="border-l border-border pl-6">
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <p className="font-mono text-xl font-bold text-foreground mt-0.5">~{product.roiMonths} mo</p>
                </div>
              </div>

              {product.stockCount <= 5 ? (
                <p className="text-sm text-destructive font-semibold">🔥 Almost Gone — Only {product.stockCount} left</p>
              ) : (
                <p className="text-sm text-success font-semibold">✓ In Stock — {product.stockCount} available</p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 h-12 font-display font-semibold rounded-xl">
                  Pay {formatPrice(product.deposit)} Deposit
                </Button>
                <Button size="lg" variant="outline" className="flex-1 h-12 font-display font-semibold rounded-xl">
                  Request Video Proof
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                {trustBadges.map((b) => (
                  <span key={b.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <b.icon className="w-3.5 h-3.5 text-primary" /> {b.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-1 border-b border-border overflow-x-auto">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium px-6 py-3 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}>
                  {tab} {tab === "Reviews" && `(${displayReviews.length})`}
                </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === "Features" && (
                <div className="space-y-3">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl">
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
                <div className="max-w-lg space-y-4">
                  <div className="flex justify-between p-4 bg-card border border-border rounded-xl">
                    <span className="text-sm text-muted-foreground">Monthly Income Range</span>
                    <span className="font-mono text-sm font-bold text-primary">{formatPrice(product.estimatedMonthlyIncomeMin)} – {formatPrice(product.estimatedMonthlyIncomeMax)}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-card border border-border rounded-xl">
                    <span className="text-sm text-muted-foreground">Annual Income Range</span>
                    <span className="font-mono text-sm font-bold text-foreground">{formatPrice(product.estimatedMonthlyIncomeMin * 12)} – {formatPrice(product.estimatedMonthlyIncomeMax * 12)}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-card border border-border rounded-xl">
                    <span className="text-sm text-muted-foreground">Estimated ROI</span>
                    <span className="font-mono text-sm font-bold text-foreground">~{product.roiMonths} months</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">* Estimates based on industry averages.</p>
                </div>
              )}
              {activeTab === "Delivery" && (
                <div className="max-w-lg space-y-3">
                  <div className="p-5 bg-card border border-border rounded-xl">
                    <p className="text-sm font-semibold text-foreground">Estimated Delivery: 5–10 business days</p>
                    <p className="text-xs text-muted-foreground mt-1">Nationwide shipping included. White-glove delivery available.</p>
                  </div>
                  <div className="p-5 bg-card border border-border rounded-xl">
                    <p className="text-sm font-semibold text-foreground">1-Year Limited Parts Warranty</p>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime toll-free technical support included.</p>
                  </div>
                </div>
              )}
              {activeTab === "Reviews" && (
                <ProductReviews reviews={displayReviews} />
              )}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12 border-t border-border pt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => (
                  <Link key={p.slug} to={`/machines/${p.slug}`}
                    className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-all">
                    <div className="aspect-square bg-secondary overflow-hidden">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-xs font-semibold text-foreground line-clamp-2">{p.title}</h3>
                      <p className="font-mono text-sm font-bold text-primary mt-2">{formatPrice(p.salePrice || p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border p-4 flex gap-3 lg:hidden z-40">
        <Button size="lg" className="flex-1 h-12 font-display font-semibold text-sm rounded-xl">
          Pay {formatPrice(product.deposit)} Deposit
        </Button>
        <Button size="lg" variant="outline" className="flex-1 h-12 font-display font-semibold text-sm rounded-xl">
          Video Proof
        </Button>
      </div>

      <Footer />
    </div>
  );
}
