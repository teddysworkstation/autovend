import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import FeaturedMachines from "@/components/FeaturedMachines";
import ROICalculator from "@/components/ROICalculator";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuizCTABanner from "@/components/QuizCTABanner";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <FeaturedMachines />
      <ROICalculator />
      <HowItWorks />
      <TrustSection />
      <TestimonialsSection />
      <QuizCTABanner />
      <Footer />
    </div>
  );
}
