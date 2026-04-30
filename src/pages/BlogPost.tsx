import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getPostBySlug, getRelatedPosts } from "@/data/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || "");

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post.slug, 3);
  const url = `https://autovend.lovable.app/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
    publisher: {
      "@type": "Organization",
      name: "Vending Machine Hub",
      logo: { "@type": "ImageObject", url: "https://autovend.lovable.app/favicon.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://autovend.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://autovend.lovable.app/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} — VMH`}
        description={post.excerpt}
        keywords={post.keywords.join(", ")}
        canonical={url}
        ogImage={post.cover}
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      <TopBar />
      <Navbar />
      <main>
        <article className="py-10 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </nav>

            <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readingMinutes} min read</span>
              <span>By <strong className="text-foreground">{post.author}</strong> · {post.authorRole}</span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[16/9] mt-8 rounded-2xl overflow-hidden border border-border bg-secondary"
            >
              <img src={post.cover} alt={post.title} width={1280} height={720} className="w-full h-full object-cover" />
            </motion.div>

            <div
              className="prose prose-neutral max-w-none mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-foreground/85 [&_p]:mb-5 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2 [&_li]:text-foreground/85 [&_li]:leading-relaxed [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            <div className="mt-12 p-6 bg-card border border-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold text-foreground">Ready to start your vending business?</p>
                <p className="text-sm text-muted-foreground">Browse in-stock machines or take our 2-minute recommendation quiz.</p>
              </div>
              <div className="flex gap-3">
                <Link to="/machines" className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary text-primary-foreground px-4 py-2.5 rounded-xl">Browse machines</Link>
                <Link to="/quiz" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border border-border px-4 py-2.5 rounded-xl">Take the quiz</Link>
              </div>
            </div>

            <div className="mt-10">
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4" /> Back to all articles
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="py-16 bg-card border-t border-border">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Related articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="bg-background rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-colors group"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-secondary">
                      <img src={p.cover} alt={p.title} width={1280} height={720} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                      <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">Read <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
