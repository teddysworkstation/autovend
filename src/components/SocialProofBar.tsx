const logos = ["Entrepreneur", "Forbes", "Business Insider", "Inc.", "Shopify Partner"];

export default function SocialProofBar() {
  return (
    <section className="border-b border-border bg-surface py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
          <span className="text-xs font-display font-bold tracking-[3px] uppercase text-primary">
            Featured In
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {logos.map((name) => (
              <span
                key={name}
                className="text-sm font-display font-700 tracking-wider uppercase text-muted-foreground/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
