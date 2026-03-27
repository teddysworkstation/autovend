import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function QuizCTABanner() {
  return (
    <section className="py-16 border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide uppercase text-foreground">
          Not Sure Which Machine is Right For You?
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Take our 60-second quiz and get a personalized recommendation + free starter guide.
        </p>
        <Button asChild size="lg" className="mt-6 h-[52px] min-w-[200px] font-display text-sm font-bold tracking-widest uppercase">
          <Link to="/quiz">Take the Free Quiz</Link>
        </Button>
      </div>
    </section>
  );
}
