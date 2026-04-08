import { useState } from "react";
import { X, Zap } from "lucide-react";

export default function UrgencyBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 text-center relative z-50">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <Zap className="w-4 h-4 flex-shrink-0" />
        <span>
          <span className="font-bold">High demand this week</span> — Limited machines available. Secure yours with $500 deposit.
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
