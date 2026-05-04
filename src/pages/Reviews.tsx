import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PenLine, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReviewCard, ReviewSummary } from "@/components/ProductReviews";
import ReviewForm from "@/components/ReviewForm";
import { getAllReviews, type Review } from "@/data/reviews";

const PAGE_SIZE = 20;

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");
  const [filterStar, setFilterStar] = useState<number | "all">("all");
  const [page, setPage] = useState(1);

  const all = useMemo<Review[]>(() => [...userReviews, ...getAllReviews()], [userReviews]);

  const filtered = useMemo(() => {
    return all.filter((r) => {
      const matchesStar = filterStar === "all" || r.rating === filterStar;
      const matchesSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase()) ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase());
      return matchesStar && matchesSearch;
    });
  }, [all, search, filterStar]);

  const visible = filtered.slice(0, page * PAGE_SIZE);

  const handleSubmit = (review: { name: string; rating: number; title: string; comment: string; location: string }) => {
    setUserReviews((prev) => [
      {
        id: `user-${Date.now()}`,
        name: review.name,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        location: review.location,
        date: new Date().toISOString().split("T")[0],
        verified: false,
        helpful: 0,
      },
      ...prev,
    ]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Customer Reviews | Vending Machine Hub (VMH)"
        description={`Read ${all.length}+ verified customer reviews of vending machines from Vending Machine Hub. Real operators share their results, ROI, and experiences.`}
        keywords="vending machine reviews, vending machine hub reviews, vmh reviews"
        canonical="https://autovend.lovable.app/reviews"
      />
      <TopBar />
      <Navbar />
      <main className="pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <span className="text-sm font-medium text-primary mb-2 block">Customer Reviews</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {all.length}+ Verified Customer Reviews
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Real operators sharing real results. From first-time buyers to multi-machine route operators.
            </p>
            <Button
              onClick={() => setShowForm((s) => !s)}
              size="lg"
              className="mt-6 h-12 font-display font-semibold rounded-xl"
            >
              <PenLine className="w-4 h-4 mr-2" />
              {showForm ? "Close Review Form" : "Write a Review"}
            </Button>
          </motion.div>

          {showForm && (
            <ReviewForm
              productTitle="Vending Machine Hub"
              onSubmit={handleSubmit}
              onClose={() => setShowForm(false)}
            />
          )}

          <ReviewSummary reviews={all} />

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search reviews..."
                className="pl-9 h-11"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {(["all", 5, 4, 3, 2, 1] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setFilterStar(s);
                    setPage(1);
                  }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    filterStar === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "all" ? "All" : `${s}★`}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-4">
            Showing {visible.length} of {filtered.length} reviews
          </p>

          <div className="space-y-4">
            {visible.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>

          {visible.length < filtered.length && (
            <div className="text-center mt-8">
              <Button onClick={() => setPage((p) => p + 1)} variant="outline" size="lg" className="rounded-xl">
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
