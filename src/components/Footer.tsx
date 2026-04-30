import { Link } from "react-router-dom";
import AuthorityLinks from "@/components/AuthorityLinks";
import vmhLogo from "@/assets/vmh-logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <AuthorityLinks />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src={vmhLogo} alt="Vending Machine Hub (VMH)" className="h-10 w-auto" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Vending Machine Hub (VMH) — premium vending machines for sale. Start your vending machine business with free shipping, flexible payment plans, and lifetime support. Trusted by 1,000+ entrepreneurs nationwide.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="https://www.bbb.org/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground border border-border rounded px-2 py-1 hover:text-primary transition-colors">BBB Accredited</a>
                <a href="https://www.namanow.org/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground border border-border rounded px-2 py-1 hover:text-accent transition-colors">NAMA Member</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Vending Machines for Sale</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/machines" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Vending Machines</Link>
                <Link to="/machines?cat=combo" className="text-sm text-muted-foreground hover:text-primary transition-colors">Combo Vending Machines</Link>
                <Link to="/machines?cat=snack" className="text-sm text-muted-foreground hover:text-primary transition-colors">Snack Vending Machines</Link>
                <Link to="/machines?cat=drink" className="text-sm text-muted-foreground hover:text-primary transition-colors">Drink Vending Machines</Link>
                <Link to="/machines?cat=specialized" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pokemon Vending Machines</Link>
                <Link to="/machines?cat=coffee" className="text-sm text-muted-foreground hover:text-primary transition-colors">Coffee Vending Machines</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
                <Link to="/quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find Your Machine</Link>
                <a href="https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">SBA Business Resources ↗</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Support &amp; Service</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/training-videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Training Videos</Link>
                <Link to="/technical-support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technical Support</Link>
                <Link to="/parts-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Parts &amp; Service</Link>
                <Link to="/manuals" className="text-sm text-muted-foreground hover:text-primary transition-colors">Manuals</Link>
                <Link to="/affiliates" className="text-sm text-muted-foreground hover:text-primary transition-colors">Affiliate Program</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-accent mb-4">Legal</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/legal/privacy-policy" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</Link>
                <Link to="/legal/terms-of-service" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms of Use</Link>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-accent transition-colors">FAQ&apos;s</Link>
                <Link to="/legal/warranty" className="text-sm text-muted-foreground hover:text-accent transition-colors">Warranty</Link>
                <Link to="/warranty-registration" className="text-sm text-muted-foreground hover:text-accent transition-colors">Warranty Registration</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
