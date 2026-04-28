import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Users, Truck, Award, Target, Heart } from "lucide-react";
import heroSlide2 from "@/assets/hero-slide-2.jpg";

const values = [
  { icon: Shield, title: "Trust & Transparency", desc: "Quality assurance on every machine. No hidden fees. Refundable deposits. What you see is what you get." },
  { icon: Users, title: "Community First", desc: "1,000+ entrepreneurs in our network. We grow together and support each other." },
  { icon: Truck, title: "Reliable Delivery", desc: "Nationwide shipping with tracking. White-glove delivery options available." },
  { icon: Award, title: "Quality Machines", desc: "We partner only with verified, commercial-grade machine manufacturers." },
  { icon: Target, title: "Beginner Friendly", desc: "No experience required. We guide you from purchase to your first dollar earned." },
  { icon: Heart, title: "Lifetime Support", desc: "Toll-free technical support for the lifetime of your machine. We're always here." },
];

const stats = [
  { value: "1,000+", label: "Entrepreneurs Served" },
  { value: "$2.4M+", label: "Revenue Generated" },
  { value: "35+", label: "Machine Models" },
  { value: "50", label: "States Covered" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pb-20 pt-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-sm font-medium text-primary mb-2 block">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Empowering Entrepreneurs<br />Through Vending
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Vending Machine Hub was founded with one mission: make passive income accessible to everyone through the vending machine business model.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={heroSlide2} alt="VMH team" className="rounded-2xl w-full object-cover h-[400px]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We started as vending machine operators ourselves. We know the challenges, the questions, and the skepticism that comes with starting a vending business. That's why we built VMH differently.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our flexible payment model — pay in full or just $150 a month — was born from our own frustration with the high upfront cost of starting a vending business. We wanted to create a buying experience where the barrier to entry isn't your bank balance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we've helped over 1,000 entrepreneurs start and grow their vending businesses. From first-time buyers to operators with 10+ machines, we serve everyone with the same commitment to quality and transparency.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">Our Values</h2>
            <p className="text-muted-foreground mt-2">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <v.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
