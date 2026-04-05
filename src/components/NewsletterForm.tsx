import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    toast({ title: "Subscribed!", description: "You'll receive our latest tips and deals." });
    setEmail("");
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
      <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Stay in the Loop</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
        Get exclusive deals, vending tips, and industry insights delivered to your inbox. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" required className="h-12 flex-1" />
        <Button type="submit" size="lg" className="h-12 px-8 font-display font-semibold rounded-xl whitespace-nowrap">
          Subscribe <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  );
}
