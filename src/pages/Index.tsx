import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import FeaturedMachines from "@/components/FeaturedMachines";
import ROICalculator from "@/components/ROICalculator";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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
    name: "AutoVend Solutions",
    url: "https://autovend.lovable.app",
    description: "Buy premium vending machines for sale. Start your vending machine business with our Pokemon vending machine, combo machines, snack & drink vending machines. Free shipping nationwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://autovend.lovable.app/machines?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AutoVend Solutions",
    url: "https://autovend.lovable.app",
    logo: "https://autovend.lovable.app/favicon.ico",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-VEND",
      contactType: "sales",
      availableLanguage: ["English", "Spanish"],
    },
    sameAs: ["https://facebook.com/autovend", "https://instagram.com/autovend", "https://twitter.com/autovend"],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Vending Machines for Sale | Buy Premium Vending Machines — AutoVend Solutions"
        description="Buy premium vending machines for sale. Start your vending machine business with Pokemon vending machines, combo machines, snack & drink machines. Free shipping, financing available."
        keywords="vending machine for sale, vending machine, pokemon vending machine, buy vending machine, vending machine business, snack machine, drink machine, combo vending machine"
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
        <TestimonialsSection />
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
