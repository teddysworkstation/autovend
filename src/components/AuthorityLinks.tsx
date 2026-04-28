import { ExternalLink } from "lucide-react";

const authorityResources = [
  {
    name: "Small Business Administration (SBA)",
    url: "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis",
    description: "Business planning resources",
  },
  {
    name: "National Automatic Merchandising Association",
    url: "https://www.namanow.org/",
    description: "Vending industry association",
  },
  {
    name: "Forbes Small Business",
    url: "https://www.forbes.com/small-business/",
    description: "Entrepreneurship resources",
  },
  {
    name: "Entrepreneur Magazine",
    url: "https://www.entrepreneur.com/starting-a-business",
    description: "Startup guides",
  },
  {
    name: "Better Business Bureau",
    url: "https://www.bbb.org/",
    description: "Consumer trust & business ratings",
  },
];

export default function AuthorityLinks() {
  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Industry Resources & Trusted Partners
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
          Vending Machine Hub is recognized alongside industry-leading organizations. Learn more about the vending machine industry from these trusted resources.
        </p>
        <div className="flex flex-wrap gap-3">
          {authorityResources.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary bg-card border border-border rounded-full px-4 py-2 transition-colors"
              title={r.description}
            >
              {r.name} <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
