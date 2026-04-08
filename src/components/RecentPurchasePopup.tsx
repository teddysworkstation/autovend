import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, MapPin } from "lucide-react";

const recentPurchases = [
  { name: "Marcus T.", city: "Atlanta", state: "GA", item: "Express Combo Vending Machine", timeAgo: "2 minutes ago" },
  { name: "Sarah K.", city: "Dallas", state: "TX", item: "MarketOne 5W Snack and Cold Drink", timeAgo: "5 minutes ago" },
  { name: "James R.", city: "Phoenix", state: "AZ", item: "ePay Combo Vending Machine", timeAgo: "8 minutes ago" },
  { name: "Lisa M.", city: "Chicago", state: "IL", item: "MarketOne 3W Cold Food & Drink", timeAgo: "12 minutes ago" },
  { name: "David H.", city: "Miami", state: "FL", item: "Large Capacity Snack Machine", timeAgo: "15 minutes ago" },
  { name: "Amanda C.", city: "Seattle", state: "WA", item: "MarketOne Coffee & Tea Machine", timeAgo: "18 minutes ago" },
  { name: "Robert P.", city: "Denver", state: "CO", item: "Express Combo Vending Machine", timeAgo: "22 minutes ago" },
  { name: "Kevin W.", city: "Los Angeles", state: "CA", item: "MarketOne 5W Outdoor Combo", timeAgo: "28 minutes ago" },
  { name: "Jennifer L.", city: "Portland", state: "OR", item: "Express Fitness Combo", timeAgo: "33 minutes ago" },
  { name: "Chris B.", city: "Nashville", state: "TN", item: "32 Selection Snack Machine", timeAgo: "41 minutes ago" },
  { name: "Tanya R.", city: "San Diego", state: "CA", item: "Frozen Food Vending Machine", timeAgo: "47 minutes ago" },
  { name: "Miguel S.", city: "Austin", state: "TX", item: "ePay Combo Vending Machine", timeAgo: "52 minutes ago" },
];

export default function RecentPurchasePopup() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const showNext = useCallback(() => {
    if (dismissed) return;
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentPurchases.length);
      }, 500);
    }, 6000);
  }, [dismissed]);

  useEffect(() => {
    const initial = setTimeout(showNext, 8000);
    return () => clearTimeout(initial);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(showNext, 18000 + Math.random() * 8000);
    return () => clearInterval(interval);
  }, [currentIndex, dismissed, showNext]);

  const purchase = recentPurchases[currentIndex];

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-4 z-50 max-w-sm"
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-primary/10 p-4 pr-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl" />
            <button
              onClick={() => { setDismissed(true); setVisible(false); }}
              className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-3 pl-2">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">
                  {purchase.name} just placed a deposit
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {purchase.item}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">
                    {purchase.city}, {purchase.state} · {purchase.timeAgo}
                  </span>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
