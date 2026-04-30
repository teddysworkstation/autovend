import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blog";

export default function Blog() {
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Vending Machine Hub Journal",
    url: "https://autovend.lovable.app/blog",
    description: "Operator-written guides on vending machines, the vending machine business, ROI, and specialty machines.",
    blogPost: sorted.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `https://autovend.lovable.app/blog/${p.slug}`,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Vending Machine Blog | Guides, ROI & Buyer Advice — VMH"
        description="Operator-written guides on vending machines, vending machine business setup, ROI, and the best vending machines for sale in 2026."
        keywords="vending machine blog, vending machine business guide, how to start vending machine business, pokemon vending machine"
        canonical="https://autovend.lovable.app/blog"
        structuredData={structuredData}
      />
      <TopBar />
      <Navbar />
      <main>
        <section className="py-12 md:py-16 border-b border-border bg-card">
          <div className="container mx-auto px-4">
            <span className="text-sm font-medium text-accent mb-2 block">VMH Journal</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground max-w-3xl">
              Vending Machine Guides, ROI Breakdowns &amp; Buyer Advice
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base md:text-lg">
              Honest, operator-written articles. No fluff, no get-rich-quick. Just what works — and what doesn&apos;t — when you start, run, or scale a vending machine business.
            </p>
          </div>
        </section>

        {featured && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <Link to={`/blog/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 group">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-border">
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block self-start text-[10px] uppercase tracking-wider font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-4">
                    Featured · {featured.category}
                  </span>
                  <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground mt-4 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featured.readingMinutes} min read
                    </span>
                    <span>By {featured.author}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-primary">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        <section className="py-12 md:py-16 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-colors group"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-[16/9] overflow-hidden bg-secondary">
                      <img
                        src={post.cover}
                        alt={post.title}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-display text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span>·</span>
                        <span>{post.readingMinutes} min</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
