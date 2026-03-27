import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <span className="font-display text-xl font-800 tracking-wider uppercase text-gradient-gold">
              AutoVend Solutions
            </span>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Turn machines into money. Premium vending machines for entrepreneurs ready to build passive income.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-700 tracking-widest uppercase text-primary mb-4">Machines</h4>
            <div className="flex flex-col gap-2">
              <Link to="/machines" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Machines</Link>
              <Link to="/machines?cat=combo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Combo Machines</Link>
              <Link to="/machines?cat=snack" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Snack Machines</Link>
              <Link to="/machines?cat=drink" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Drink Machines</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-700 tracking-widest uppercase text-primary mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-700 tracking-widest uppercase text-primary mb-4">Support</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">support@autovendsolutions.com</span>
              <span className="text-sm text-muted-foreground">Mon–Fri 9am–6pm EST</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} AutoVend Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
