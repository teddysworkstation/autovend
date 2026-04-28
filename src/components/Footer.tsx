import { Link } from "react-router-dom";
import AuthorityLinks from "@/components/AuthorityLinks";
import vmhLogo from "@/assets/vmh-logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <AuthorityLinks />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src={vmhLogo} alt="Vending Machine Hub (VMH)" className="h-10 w-auto" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Vending Machine Hub (VMH) — premium vending machines for sale. Start your vending machine business with free shipping, financing, and lifetime support. Trusted by 1,000+ entrepreneurs nationwide.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="https://www.bbb.org/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground border border-border rounded px-2 py-1 hover:text-primary transition-colors">BBB Accredited</a>
                <a href="https://www.namanow.org/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground border border-border rounded px-2 py-1 hover:text-primary transition-colors">NAMA Member</a>
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
                <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
                <Link to="/quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find Your Machine</Link>
                <a href="https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">SBA Business Resources ↗</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Support & Service</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/training-videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Training Videos</Link>
                <Link to="/technical-support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technical Support</Link>
                <Link to="/parts-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Parts & Service</Link>
                <Link to="/manuals" className="text-sm text-muted-foreground hover:text-primary transition-colors">Manuals</Link>
                <Link to="/warranty-registration" className="text-sm text-muted-foreground hover:text-primary transition-colors">Warranty Registration</Link>
                <Link to="/affiliates" className="text-sm text-muted-foreground hover:text-primary transition-colors">Affiliate Program</Link>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
                <Link to="/legal/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/legal/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/legal/warranty" className="text-sm text-muted-foreground hover:text-primary transition-colors">Warranty</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Vending Machine Hub (VMH). All rights reserved. Vending machines for sale with free nationwide shipping.</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary">Facebook</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary">Instagram</a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
