import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Play, Wrench, LifeBuoy, FileText, ShieldCheck, Users, ExternalLink, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type ResourceConfig = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  hero: { eyebrow: string; heading: string; sub: string; icon: any };
  sections: { title: string; body: string; bullets?: string[] }[];
  externalLinks?: { label: string; url: string; description: string }[];
  cta?: { heading: string; sub: string; button: string; href: string };
  showForm?: "support" | "warranty" | "affiliate" | "parts" | null;
};

const configs: Record<string, ResourceConfig> = {
  "training-videos": {
    slug: "training-videos",
    title: "Training Videos",
    metaTitle: "Vending Machine Training Videos | Setup, Stocking & Maintenance — VMH",
    metaDesc: "Free vending machine training videos covering setup, stocking, payment configuration, route management and maintenance for every VMH machine.",
    hero: { eyebrow: "Learning Center", heading: "Vending Machine Training Videos", sub: "Step-by-step video guides covering everything from initial setup to advanced route management.", icon: Play },
    sections: [
      { title: "Getting Started Series (Beginner)", body: "Brand new to the vending business? Start here. Our 12-part beginner series walks you through unboxing, plugging in, programming, and stocking your first vending machine.", bullets: ["Unboxing & Site Survey", "Power & Network Setup", "First-Time Programming", "Loading Snacks Correctly", "Loading Cold Drinks", "Setting Prices", "Pairing Cashless Reader", "Test Vending & QC"] },
      { title: "Operations & Stocking", body: "Learn the operating fundamentals that separate profitable operators from the rest — par levels, planogram strategy, route timing, and waste reduction.", bullets: ["Par-Level Stocking", "Planogram Best Practices", "Route Timing & Frequency", "Cash Pickup & Reconciliation"] },
      { title: "Maintenance & Troubleshooting", body: "Our technicians walk you through common service calls so you can resolve 80% of issues without dispatching a tech. Includes refrigeration, coin mech, bill validator, and door-lock walkthroughs.", bullets: ["Coin Mech Cleaning", "Bill Validator Service", "Refrigeration Diagnostics", "Door & Lock Repair"] },
      { title: "Cashless & Telemetry", body: "Configure Greenlite, Nayax, and USA Technologies card readers, and pair your machine to the VMH telemetry dashboard for real-time inventory and sales tracking." },
    ],
    externalLinks: [
      { label: "Vending.com Training Videos", url: "https://www.vending.com/training-videos/", description: "Industry training library" },
      { label: "NAMA Knowledge Source", url: "https://namanow.org/nama-knowledge-source/", description: "Industry association training" },
      { label: "Vending Times Operator Resources", url: "https://www.vendingtimes.com/", description: "Trade publication resources" },
    ],
  },
  "technical-support": {
    slug: "technical-support",
    title: "Technical Support",
    metaTitle: "Vending Machine Technical Support | 24/7 Help Desk — VMH",
    metaDesc: "Get fast, expert vending machine technical support from VMH. Phone, email, and live chat support for setup, repair, and parts replacement.",
    hero: { eyebrow: "Help Center", heading: "Vending Machine Technical Support", sub: "Lifetime technical support — included with every VMH vending machine purchase.", icon: LifeBuoy },
    sections: [
      { title: "Hours & Channels", body: "Our certified technicians and support team are available 24/7 to diagnose, troubleshoot, and dispatch parts.", bullets: ["+1 (902) 516-8578", "Email: support@vmh.com", "WhatsApp Live Chat: 24/7", "Emergency Support: 24/7 for all customers"] },
      { title: "What We Cover", body: "Lifetime support is included on every VMH machine — there is no per-call fee, ever.", bullets: ["Programming assistance", "Cashless device pairing", "Refrigeration diagnostics", "Bill validator & coin mech", "Telemetry & remote monitoring", "Firmware updates"] },
      { title: "Before You Call", body: "Have your serial number, machine model, and a clear description of the issue ready. If possible, take a photo or short video — it helps our team resolve issues 60% faster." },
    ],
    externalLinks: [
      { label: "Vending.com Technical Support", url: "https://www.vending.com/contact-us/technical-support/", description: "Industry support reference" },
      { label: "VendingWorld Manuals", url: "https://vendingworld.com/information/manuals/", description: "Searchable manual archive" },
    ],
    showForm: "support",
  },
  "affiliates": {
    slug: "affiliates",
    title: "Affiliate Program",
    metaTitle: "Vending Machine Affiliate Program | Earn 10% Commission — VMH",
    metaDesc: "Join the Vending Machine Hub affiliate program. Earn up to 10% commission on every vending machine sale. Free to join, real-time tracking dashboard.",
    hero: { eyebrow: "Partner With Us", heading: "VMH Affiliate Program", sub: "Earn industry-leading commissions promoting the highest-rated vending machines online.", icon: Users },
    sections: [
      { title: "Why Partner With VMH", body: "VMH offers one of the highest-paying affiliate programs in the vending industry, with 90-day cookie windows and dedicated affiliate managers.", bullets: ["10% commission on every sale", "Average order value: $3,200", "90-day cookie window", "Monthly payouts via PayPal, ACH or wire", "Banners, links, and email swipe files included", "Dedicated affiliate account manager"] },
      { title: "Who Can Join", body: "We welcome content creators, business coaches, vending YouTubers, side-hustle bloggers, and B2B influencers. We do not accept coupon, deal, or cashback sites." },
      { title: "How to Apply", body: "Submit the form below. Most applications are reviewed within 48 hours. Once approved, you'll receive your affiliate link and access to the VMH partner portal." },
    ],
    externalLinks: [
      { label: "Vending.com Affiliates", url: "https://www.vending.com/affiliates/", description: "Compare industry programs" },
      { label: "Entrepreneur — Affiliate Marketing Guide", url: "https://www.entrepreneur.com/starting-a-business", description: "Affiliate strategy resources" },
    ],
    showForm: "affiliate",
  },
  "parts-service": {
    slug: "parts-service",
    title: "Parts & Service",
    metaTitle: "Vending Machine Parts & Service | OEM Replacement Parts — VMH",
    metaDesc: "Order genuine OEM vending machine parts from VMH. Coin mechs, bill validators, refrigeration parts, motors, glass, and more. Same-day shipping.",
    hero: { eyebrow: "Genuine OEM Parts", heading: "Vending Machine Parts & Service", sub: "Same-day shipping on every part in our catalog. Backed by our 1-year parts warranty.", icon: Wrench },
    sections: [
      { title: "In-Stock Parts Categories", body: "We stock thousands of genuine OEM parts for AMS, Crane, Dixie-Narco, Royal Vendors, Seaga, USI, and Wittern Group machines.", bullets: ["Bill Validators (MEI, Coinco, ICT)", "Coin Mechanisms", "Cashless Card Readers", "Vend Motors & Spirals", "Refrigeration: Compressors, Evaporators, Fans", "Control Boards & Selection Keypads", "LED Lighting Kits", "Glass, Locks, Hinges & Doors"] },
      { title: "Service Plans", body: "Need on-site service? VMH operates a national network of certified technicians for in-person diagnostics, refurbishment, and preventive maintenance.", bullets: ["Standard Service Call (90-day labor warranty)", "Annual Preventive Maintenance Plan", "Emergency Same-Day Dispatch (select metros)", "Refurbishment & Restoration"] },
      { title: "Place a Parts Order", body: "Use the form below or call our parts hotline at 1-800-555-VEND ext. 2. Provide your machine model and serial number for the fastest fulfillment." },
    ],
    externalLinks: [
      { label: "Vending.com Parts & Service", url: "https://www.vending.com/parts-service/", description: "Industry parts reference" },
      { label: "VendingWorld Manuals", url: "https://vendingworld.com/information/manuals/", description: "Look up parts by model" },
    ],
    showForm: "parts",
  },
  "warranty-registration": {
    slug: "warranty-registration",
    title: "Warranty Registration",
    metaTitle: "Vending Machine Warranty Registration | Activate Your Coverage — VMH",
    metaDesc: "Register your VMH vending machine warranty in 2 minutes. Activate your 1-year limited parts warranty and lifetime tech support.",
    hero: { eyebrow: "Activate Coverage", heading: "Warranty Registration", sub: "Register your machine to activate your 1-year limited parts warranty and lifetime technical support.", icon: ShieldCheck },
    sections: [
      { title: "What's Covered", body: "Every new VMH vending machine includes a 1-year limited parts warranty plus lifetime free technical support.", bullets: ["Compressor & refrigeration system", "Bill validator & coin mech", "Control boards & keypads", "Vend motors & spirals", "LED lighting", "Lifetime toll-free tech support"] },
      { title: "How to Register", body: "Complete the form below within 30 days of delivery. You'll receive a registration confirmation email with your warranty certificate (PDF) attached." },
      { title: "Extended Warranty", body: "Need longer coverage? Optional 2-year and 3-year extended warranty plans are available for purchase. Contact our team for pricing." },
    ],
    externalLinks: [
      { label: "Vending.com Warranty Registration", url: "https://www.vending.com/contact-us/warranty-registration/", description: "Industry reference" },
      { label: "Better Business Bureau", url: "https://www.bbb.org/", description: "Verify our standing" },
    ],
    showForm: "warranty",
  },
  "manuals": {
    slug: "manuals",
    title: "Manuals",
    metaTitle: "Vending Machine Manuals | Service & Operating PDFs — VMH",
    metaDesc: "Download free vending machine manuals — service guides, operating manuals, parts lists, and wiring diagrams for every major vending machine brand.",
    hero: { eyebrow: "Document Library", heading: "Vending Machine Manuals", sub: "Service guides, operator handbooks, parts lists, and wiring diagrams — all free to download.", icon: FileText },
    sections: [
      { title: "Operating Manuals", body: "Complete operating manuals for every VMH machine — programming, pricing, stocking, and daily operation procedures.", bullets: ["MarketOne 3W / 5W / 6W Series", "Express Combo Series", "ePay Combo Series", "Pokemon Trading Card Vending Machine", "Coffee & Hot Beverage Series", "Frozen Food Series"] },
      { title: "Service & Repair Manuals", body: "Detailed service manuals with exploded diagrams, parts lists, troubleshooting trees, and recommended preventive maintenance schedules." },
      { title: "Wiring & Schematic Diagrams", body: "Full electrical schematics for refrigeration, control board, validator, and lighting circuits. Required for any field-level electrical service work." },
      { title: "Compliance Documentation", body: "ADA compliance certificates, FDA Calorie Disclosure documentation, NAMA certifications, and UL safety listings for each model." },
    ],
    externalLinks: [
      { label: "VendingWorld Manuals Library", url: "https://vendingworld.com/information/manuals/", description: "Comprehensive industry archive" },
      { label: "Vending.com Training Videos", url: "https://www.vending.com/training-videos/", description: "Pair manuals with video walkthroughs" },
      { label: "NAMA Industry Standards", url: "https://www.namanow.org/", description: "Vending compliance standards" },
    ],
    cta: { heading: "Need a manual we don't list?", sub: "Email support@vmh.com with your model number and we'll send the PDF within 1 business day.", button: "Contact Support", href: "/technical-support" },
  },
};

function ContactForm({ kind }: { kind: NonNullable<ResourceConfig["showForm"]> }) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const labels: Record<string, { heading: string; submit: string }> = {
    support: { heading: "Open a Support Ticket", submit: "Submit Ticket" },
    warranty: { heading: "Register Your Warranty", submit: "Register Warranty" },
    affiliate: { heading: "Apply to the Affiliate Program", submit: "Submit Application" },
    parts: { heading: "Request a Parts Quote", submit: "Request Quote" },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Submitted!", description: "Our team will follow up within 1 business day." });
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
        <h3 className="font-display text-lg font-bold text-foreground">Thanks — we got it.</h3>
        <p className="text-sm text-muted-foreground mt-1">A team member will contact you within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-foreground">{labels[kind].heading}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Full Name *" required />
        <Input type="email" placeholder="Email *" required />
        <Input placeholder="Phone" />
        <Input placeholder={kind === "warranty" || kind === "parts" ? "Machine Model / Serial #" : "Company / Website"} />
      </div>
      <Textarea placeholder={kind === "support" ? "Describe the issue you're experiencing…" : kind === "affiliate" ? "Tell us about your audience and how you'll promote VMH…" : kind === "parts" ? "List the parts you need (include part numbers if known)…" : "Notes (optional)"} rows={5} />
      <Button type="submit" size="lg" className="w-full h-12 font-display font-semibold rounded-xl">{labels[kind].submit}</Button>
    </form>
  );
}

export default function ResourcePage({ slug }: { slug: keyof typeof configs }) {
  const cfg = configs[slug];
  if (!cfg) return null;
  const Icon = cfg.hero.icon;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://autovend.lovable.app/" },
      { "@type": "ListItem", position: 2, name: cfg.title, item: `https://autovend.lovable.app/${cfg.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={cfg.metaTitle}
        description={cfg.metaDesc}
        keywords={`${cfg.title.toLowerCase()}, vending machine, vending machine for sale, vending machine hub, vmh, ${cfg.slug.replace(/-/g, " ")}`}
        canonical={`https://autovend.lovable.app/${cfg.slug}`}
        structuredData={breadcrumbSchema}
      />
      <TopBar />
      <Navbar />

      <section className="bg-hero-dark text-white py-16">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">{cfg.title}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-medium mb-4">
              <Icon className="w-3.5 h-3.5" /> {cfg.hero.eyebrow}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">{cfg.hero.heading}</h1>
            <p className="text-base md:text-lg text-white/80 mt-4">{cfg.hero.sub}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {cfg.sections.map((s) => (
                <div key={s.title}>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-3">{s.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  {s.bullets && (
                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {cfg.externalLinks && (
                <div className="border-t border-border pt-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">Industry References</h2>
                  <div className="flex flex-wrap gap-3">
                    {cfg.externalLinks.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary bg-card border border-border rounded-full px-4 py-2 transition-colors" title={l.description}>
                        {l.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {cfg.cta && (
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
                  <h3 className="font-display text-lg font-bold text-foreground">{cfg.cta.heading}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">{cfg.cta.sub}</p>
                  <Button asChild size="lg" className="h-11 font-display font-semibold rounded-xl">
                    <Link to={cfg.cta.href}>{cfg.cta.button}</Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              {cfg.showForm ? <ContactForm kind={cfg.showForm} /> : (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Need help right now?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Our certified vending technicians are standing by.</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Toll-Free:</strong> 1-800-555-VEND</p>
                    <p><strong>Email:</strong> support@vmh.com</p>
                    <p><strong>Hours:</strong> Mon–Fri 8AM–8PM EST</p>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4 rounded-xl">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
