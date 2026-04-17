import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast({ title: "Error", description: "Passwords don't match.", variant: "destructive" });
      return;
    }
    toast({ title: "Account Created!", description: "Welcome to AutoVend Solutions." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pb-20 pt-10 flex items-center justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-4">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-display font-bold">AV</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">Create Account</h1>
              <p className="text-sm text-muted-foreground mt-1">Join 1,000+ entrepreneurs on AutoVend</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="pl-10" placeholder="John Doe" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="pl-10" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type={showPw ? "text" : "password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="pl-10 pr-10" placeholder="Min 8 characters" required />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} className="pl-10" placeholder="••••••••" required />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full h-12 font-display font-semibold rounded-xl">
                Create Account
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-4">
              By creating an account, you agree to our{" "}
              <Link to="/legal/terms-of-service" className="text-primary hover:underline">Terms</Link> and{" "}
              <Link to="/legal/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
