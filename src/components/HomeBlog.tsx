import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getRecentPosts } from "@/data/blog";

export default function HomeBlog() {
  const posts = getRecentPosts(3);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <span className="text-sm font-medium text-accent mb-2 block">Recent Articles</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              From the VMH Vending Journal
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              In-depth guides on starting, running, and scaling a vending machine business — written by operators, not marketers.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-background rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-colors group"
            >
              <Link to={`/blog/${post.slug}`} className="block">
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
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.readingMinutes} min read
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
