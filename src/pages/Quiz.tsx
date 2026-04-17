import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    title: "What is your total budget?",
    options: ["Under $1,500", "$1,500 – $2,500", "$2,500 – $4,000", "$4,000+"],
  },
  {
    title: "What is your monthly income goal?",
    options: ["$300 – $600", "$600 – $1,200", "$1,200 – $2,000", "$2,000+"],
  },
  {
    title: "Do you have a location in mind?",
    options: ["Yes, secured", "Yes, in progress", "No, need help", "Not sure yet"],
  },
  {
    title: "What type of location?",
    options: ["Office Building", "School / University", "Gym / Fitness Center", "Apartment Complex"],
  },
  {
    title: "How much time can you invest?",
    options: ["Fully passive (minimal)", "A few hours/week", "Part-time (10–20 hrs/week)", "Full-time commitment"],
  },
];

function getRecommendation(answers: number[]) {
  const budget = answers[0];
  let filtered = [...products].filter(p => p.inStock);
  if (budget === 0) filtered = filtered.filter(p => (p.salePrice || p.price) < 1500);
  else if (budget === 1) filtered = filtered.filter(p => (p.salePrice || p.price) >= 1500 && (p.salePrice || p.price) <= 2500);
  else if (budget === 2) filtered = filtered.filter(p => (p.salePrice || p.price) > 2500 && (p.salePrice || p.price) <= 4000);
  else filtered = filtered.filter(p => (p.salePrice || p.price) > 4000);

  if (filtered.length === 0) filtered = products.filter(p => p.inStock).slice(0, 3);
  filtered.sort((a, b) => b.estimatedMonthlyIncomeMax - a.estimatedMonthlyIncomeMax);
  return filtered.slice(0, 3);
}

export default function Quiz() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [completed, setCompleted] = useState(false);

  const totalSteps = questions.length + 1; // +1 for email
  const isEmailStep = step === questions.length;
  const progress = ((step + 1) / (totalSteps + 1)) * 100;

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = optionIndex;
    setAnswers(newAnswers);
    setTimeout(() => setStep(step + 1), 300);
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    toast({ title: "Thank you!", description: "Check your email for the free starter guide." });
    setCompleted(true);
  };

  const recommendations = completed ? getRecommendation(answers) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                {!isEmailStep ? (
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {questions[step].title}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">Select the option that best describes your situation.</p>
                    <div className="space-y-3">
                      {questions[step].options.map((option, i) => (
                        <button key={i} onClick={() => selectAnswer(i)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all text-sm font-medium ${
                            answers[step] === i
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-card border-border text-foreground hover:border-primary/40"
                          }`}>
                          <span className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                              {String.fromCharCode(65 + i)}
                            </span>
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                    {step > 0 && (
                      <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Your Results Are Ready!
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">
                      Enter your email to see your personalized machine recommendation and receive a free starter guide.
                    </p>
                    <form onSubmit={submitEmail} className="max-w-sm mx-auto space-y-4">
                      <Input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com" required className="h-12 text-center" />
                      <Button type="submit" size="lg" className="w-full h-12 font-display font-semibold rounded-xl">
                        See My Recommendation <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                    <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your Top Recommendations</h1>
                <p className="text-sm text-muted-foreground mb-10">Based on your answers, here are the best machines for you.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendations.map((p, i) => (
                    <Link key={p.slug} to={`/machines/${p.slug}`}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all">
                      {i === 0 && <div className="bg-primary text-primary-foreground text-xs font-bold py-1.5 text-center">TOP PICK</div>}
                      <div className="p-4">
                        <div className="aspect-square bg-secondary rounded-xl overflow-hidden mb-3">
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-contain p-3" />
                        </div>
                        <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2">{p.title}</h3>
                        <p className="font-mono text-lg font-bold text-primary mt-2">{formatPrice(p.salePrice || p.price)}</p>
                        <p className="text-xs text-muted-foreground mt-1">Est. {formatPrice(p.estimatedMonthlyIncomeMin)}–{formatPrice(p.estimatedMonthlyIncomeMax)}/mo</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link to="/machines" className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-8 hover:text-accent transition-colors">
                  View All Machines <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
