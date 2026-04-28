import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import FeaturedMachines from "@/components/FeaturedMachines";
import ROICalculator from "@/components/ROICalculator";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";

import HomeReviews from "@/components/HomeReviews";
import HomeFAQ from "@/components/HomeFAQ";
import QuizCTABanner from "@/components/QuizCTABanner";
import NewsletterForm from "@/components/NewsletterForm";
import Footer from "@/components/Footer";
import RecentPurchasePopup from "@/components/RecentPurchasePopup";
import UrgencyBanner from "@/components/UrgencyBanner";
import SEOHead from "@/components/SEOHead";

export default function Index() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vending Machine Hub (VMH)",
    alternateName: "VMH",
    url: "https://autovend.lovable.app",
    description: "Buy premium vending machines for sale at Vending Machine Hub (VMH). Pokemon vending machines, combo, snack & drink machines. One-time payment or $150/mo plan. Free shipping nationwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://autovend.lovable.app/machines?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vending Machine Hub",
    alternateName: "VMH",
    url: "https://autovend.lovable.app",
    logo: "https://autovend.lovable.app/favicon.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-VEND",
      contactType: "sales",
      availableLanguage: ["English", "Spanish"],
    },
    sameAs: ["https://facebook.com/vendingmachinehub", "https://instagram.com/vendingmachinehub", "https://twitter.com/vendingmachinehub"],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Vending Machines for Sale | Pokemon Vending Machine — Vending Machine Hub (VMH)"
        description="Buy premium vending machines for sale at Vending Machine Hub (VMH). Pokemon vending machines, combo, snack & drink machines. One-time payment or $150/mo plan. Free shipping nationwide."
        keywords="vending machine for sale, vending machine, pokemon vending machine, buy vending machine, vending machine business, snack machine, drink machine, combo vending machine, vending machine hub, vmh"
        canonical="https://autovend.lovable.app/"
        structuredData={[structuredData, orgData]}
      />
      <TopBar />
      <UrgencyBanner />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <FeaturedMachines />
        <ROICalculator />
        <HowItWorks />
        <TrustSection />
        <HomeReviews />
        
        <HomeFAQ />
        <QuizCTABanner />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
      <RecentPurchasePopup />
    </div>
  );
}
