import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import vmhLogo from "@/assets/vmh-logo.png";

const machineLinks = [
  { label: "All Machines", href: "/machines" },
  { label: "Combo Machines", href: "/machines?cat=combo" },
  { label: "Snack Machines", href: "/machines?cat=snack" },
  { label: "Drink Machines", href: "/machines?cat=drink" },
  { label: "Coffee Machines", href: "/machines?cat=coffee" },
  { label: "Specialized", href: "/machines?cat=specialized" },
];

const supportLinks = [
  { label: "Training Videos", href: "/training-videos" },
  { label: "Technical Support", href: "/technical-support" },
  { label: "Parts & Service", href: "/parts-service" },
  { label: "Manuals", href: "/manuals" },
  { label: "Warranty Registration", href: "/warranty-registration" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Affiliates", href: "/affiliates" },
];

const navLinks = [
  { label: "Machines", href: "/machines", dropdown: machineLinks },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Quiz", href: "/quiz" },
  { label: "Support", href: "/technical-support", dropdown: supportLinks },
  { label: "Company", href: "/about", dropdown: companyLinks },
];

function DropdownMenu({ items, onClose }: { items: typeof machineLinks; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
    >
      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-card/95 backdrop-blur-md border-b ${
        scrolled ? "shadow-sm border-border" : "border-border/60"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Vending Machine Hub home">
          <img src={vmhLogo} alt="Vending Machine Hub (VMH) logo" className="h-9 w-auto" width={120} height={40} />
          <span className="sr-only">Vending Machine Hub</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.dropdown ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className={`flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:text-primary ${
                    location.pathname.startsWith(link.href.split("?")[0]) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  to={link.href}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:text-primary block ${
                    location.pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )}
              <AnimatePresence>
                {link.dropdown && openDropdown === link.label && (
                  <DropdownMenu items={link.dropdown} onClose={() => setOpenDropdown(null)} />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Link to="/machines" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/login" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/checkout" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <button
            className="lg:hidden p-2 rounded-lg text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/98 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between text-base font-medium text-foreground py-3 px-3 rounded-lg hover:bg-secondary"
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="pl-6 pb-2 space-y-1">
                              {link.dropdown.map((sub) => (
                                <Link key={sub.href} to={sub.href}
                                  className="block text-sm text-muted-foreground hover:text-primary py-2 px-3 rounded-lg hover:bg-secondary transition-colors">
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-secondary block"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="border-t border-border mt-2 pt-2 flex gap-2">
                <Link to="/login" className="flex-1 text-center text-sm font-medium py-2.5 rounded-lg bg-secondary text-foreground">Sign In</Link>
                <Link to="/signup" className="flex-1 text-center text-sm font-medium py-2.5 rounded-lg bg-primary text-primary-foreground">Sign Up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
