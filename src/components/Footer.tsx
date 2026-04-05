import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">AV</span>
              </div>
              <span className="font-display text-lg font-bold text-foreground">AutoVend</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Turn machines into money. Premium vending machines for entrepreneurs.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Machines</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/machines" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Machines</Link>
              <Link to="/machines?cat=combo" className="text-sm text-muted-foreground hover:text-primary transition-colors">Combo Machines</Link>
              <Link to="/machines?cat=snack" className="text-sm text-muted-foreground hover:text-primary transition-colors">Snack Machines</Link>
              <Link to="/machines?cat=drink" className="text-sm text-muted-foreground hover:text-primary transition-colors">Drink Machines</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal & Support</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/legal/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/legal/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/legal/refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link>
              <Link to="/legal/shipping-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link>
              <Link to="/legal/warranty" className="text-sm text-muted-foreground hover:text-primary transition-colors">Warranty</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AutoVend Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
