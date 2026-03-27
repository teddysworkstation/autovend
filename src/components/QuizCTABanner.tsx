import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuizCTABanner() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-dark pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          Not Sure Which Machine is Right For You?
        </h2>
        <p className="text-white/60 max-w-lg mx-auto mb-6">
          Take our 60-second quiz and get a personalized recommendation + free starter guide.
        </p>
        <Button asChild size="lg" className="h-12 px-8 font-display font-semibold rounded-xl">
          <Link to="/quiz">
            Take the Free Quiz <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
