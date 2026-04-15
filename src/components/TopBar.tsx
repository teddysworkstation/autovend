import { useState } from "react";
import { MapPin, ChevronDown, Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

const locations = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan",
];

export default function TopBar() {
  const [langOpen, setLangOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedLoc, setSelectedLoc] = useState("United States");

  return (
    <div className="bg-[hsl(220,20%,12%)] text-[hsl(220,10%,75%)] text-xs h-9 relative z-[60]">
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-8">
        {/* Left: Deliver to */}
        <div className="relative">
          <button
            onClick={() => { setLocOpen(!locOpen); setLangOpen(false); }}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1"
          >
            <MapPin className="w-3.5 h-3.5 text-white/50" />
            <span className="hidden sm:inline text-[11px] text-white/50">Deliver to</span>
            <span className="font-semibold text-white text-[11px]">{selectedLoc}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {locOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLocOpen(false)} />
              <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 py-1 w-48">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setSelectedLoc(loc); setLocOpen(false); }}
                    className={`block w-full text-left px-3 py-2 text-xs hover:bg-secondary transition-colors ${
                      selectedLoc === loc ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Center: Promo */}
        <div className="hidden md:flex items-center gap-6 text-[11px]">
          <span className="text-white/60">Free Shipping on Orders Over $1,500</span>
          <span className="text-white/30">|</span>
          <span className="text-white/60">30-Day Return Policy</span>
          <span className="text-white/30">|</span>
          <span className="text-white/60">24/7 Customer Support</span>
        </div>

        {/* Right: Language */}
        <div className="relative">
          <button
            onClick={() => { setLangOpen(!langOpen); setLocOpen(false); }}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1"
          >
            <Globe className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[11px]">{selectedLang.flag} {selectedLang.label}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 py-1 w-40">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-2 text-xs hover:bg-secondary transition-colors ${
                      selectedLang.code === lang.code ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
