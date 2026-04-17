import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Package, RotateCcw, Truck, Check, ArrowRight, Flame, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProductReviews from "@/components/ProductReviews";
import ReviewForm from "@/components/ReviewForm";
import ViewerCount from "@/components/ViewerCount";
import ProductGallery from "@/components/ProductGallery";
import SEOHead from "@/components/SEOHead";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { getReviewsForProduct, getAllReviews } from "@/data/reviews";
import { useState } from "react";

const trustBadges = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: Check, label: "Verified Supplier" },
  { icon: RotateCcw, label: "Refundable Deposit" },
  { icon: Truck, label: "Nationwide Delivery" },
];

const tabs = ["Features", "Earnings", "Delivery", "Reviews"];

export default function MachineDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const [activeTab, setActiveTab] = useState("Features");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReviews, setUserReviews] = useState<any[]>([]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <div className="pt-16 text-center">
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
  const displayReviews = [
    ...userReviews,
    ...(productReviews.length > 0 ? productReviews : getAllReviews().slice(0, 4)),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.excerpt,
    image: product.images,
    sku: product.slug,
    mpn: product.slug,
    brand: { "@type": "Brand", name: "AutoVend Solutions" },
    category: "Vending Machine",
    offers: {
      "@type": "Offer",
      url: `https://autovend.lovable.app/machines/${product.slug}`,
      priceCurrency: "USD",
      price: product.salePrice || product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "AutoVend Solutions" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 10, unitCode: "DAY" } },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      reviewCount: displayReviews.length.toString(),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://autovend.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "Vending Machines for Sale", item: "https://autovend.lovable.app/machines" },
      { "@type": "ListItem", position: 3, name: product.title, item: `https://autovend.lovable.app/machines/${product.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does the ${product.title} cost?`,
        acceptedAnswer: { "@type": "Answer", text: `The ${product.title} is priced at ${formatPrice(effectivePrice)}. You can start with a ${formatPrice(product.deposit)} refundable deposit and pay the balance after receiving video proof of your machine.` },
      },
      {
        "@type": "Question",
        name: `How much money can I make with the ${product.title}?`,
        acceptedAnswer: { "@type": "Answer", text: `The estimated monthly income for the ${product.title} is ${formatPrice(product.estimatedMonthlyIncomeMin)} to ${formatPrice(product.estimatedMonthlyIncomeMax)}, with an ROI of approximately ${product.roiMonths} months depending on location and product selection.` },
      },
      {
        "@type": "Question",
        name: "Does AutoVend offer free shipping on vending machines?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, AutoVend Solutions offers free nationwide shipping on all vending machines. White-glove delivery is also available." },
      },
    ],
  };

  const handleReviewSubmit = (review: any) => {
    setUserReviews(prev => [{
      id: `user-${Date.now()}`,
      name: review.name,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      date: new Date().toISOString().split("T")[0],
      location: review.location,
      verified: false,
      helpful: 0,
      machineSlug: product.slug,
    }, ...prev]);
    setActiveTab("Reviews");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${product.title} | Vending Machine for Sale — AutoVend`}
        description={`Buy ${product.title} for ${formatPrice(effectivePrice)}. ${product.excerpt.slice(0, 120)}. Free shipping, financing available. Start with $${product.deposit} deposit.`}
        keywords={`${product.title.toLowerCase()}, vending machine for sale, vending machine, ${product.category.toLowerCase()}, buy vending machine, pokemon vending machine`}
        canonical={`https://autovend.lovable.app/machines/${product.slug}`}
        ogImage={product.images[0]}
        structuredData={[structuredData, breadcrumbSchema, faqSchema]}
      />
      <TopBar />
      <Navbar />
      <div>
        <div className="container mx-auto px-4 py-10">
          {/* Breadcrumb with structured data */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/machines" className="hover:text-primary transition-colors">Vending Machines for Sale</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProductGallery images={product.images} title={product.title} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <span className="text-sm font-medium text-primary">{product.category}</span>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">{product.title}</h1>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{product.excerpt}</p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-baseline gap-3">
                  {product.salePrice ? (
                    <>
                      <span className="font-mono text-3xl font-bold text-primary">{formatPrice(product.salePrice)}</span>
                      <span className="font-mono text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                      <span className="text-xs font-semibold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                        Save {formatPrice(product.price - product.salePrice)}
                      </span>
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

              {product.stockCount <= 5 && product.stockCount > 0 ? (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-destructive font-semibold flex items-center gap-1.5">
                    <Flame className="w-4 h-4" /> Almost Gone — Only {product.stockCount} left
                  </p>
                  <ViewerCount slug={product.slug} />
                </div>
              ) : product.stockCount > 0 ? (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-primary font-semibold">✓ In Stock — {product.stockCount} available</p>
                  <ViewerCount slug={product.slug} />
                </div>
              ) : (
                <p className="text-sm text-destructive font-semibold">Out of Stock</p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 h-12 font-display font-semibold rounded-xl" asChild>
                  <Link to="/checkout">Pay {formatPrice(product.deposit)} Deposit</Link>
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
                <div>
                  {!showReviewForm && (
                    <div className="mb-6">
                      <Button onClick={() => setShowReviewForm(true)} className="h-10 px-6 font-display font-semibold rounded-xl">
                        <PenLine className="w-4 h-4 mr-2" /> Write a Review
                      </Button>
                    </div>
                  )}
                  {showReviewForm && (
                    <ReviewForm
                      productTitle={product.title}
                      onSubmit={handleReviewSubmit}
                      onClose={() => setShowReviewForm(false)}
                    />
                  )}
                  <ProductReviews reviews={displayReviews} />
                </div>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12 border-t border-border pt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {related.map((p) => (
                  <Link key={p.slug} to={`/machines/${p.slug}`}
                    className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-all">
                    <div className="aspect-square bg-secondary overflow-hidden">
                      <img src={p.images[0]} alt={`${p.title} - Vending Machine for Sale`} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
        <Button size="lg" className="flex-1 h-12 font-display font-semibold text-sm rounded-xl" asChild>
          <Link to="/checkout">Pay {formatPrice(product.deposit)} Deposit</Link>
        </Button>
        <Button size="lg" variant="outline" className="flex-1 h-12 font-display font-semibold text-sm rounded-xl">
          Video Proof
        </Button>
      </div>

      <Footer />
    </div>
  );
}
