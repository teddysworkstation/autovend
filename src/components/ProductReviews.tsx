import { Star, ThumbsUp, BadgeCheck } from "lucide-react";
import { type Review, getReviewStats } from "@/data/reviews";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} ${i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
  );
}

function ReviewSummary({ reviews }: { reviews: Review[] }) {
  const stats = getReviewStats();
  return (
    <div className="bg-card rounded-2xl border border-border p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display text-4xl font-bold text-foreground">{stats.average}</p>
          <StarRating rating={Math.round(stats.average)} size="md" />
          <p className="text-sm text-muted-foreground mt-1">{stats.total} reviews</p>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {stats.distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-8">{d.stars}★</span>
              <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: `${d.percentage}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-8">{d.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center">
            {review.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{review.name}</p>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] text-primary font-medium">
                  <BadgeCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{review.location} · {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <h4 className="font-semibold text-sm text-foreground mb-2">{review.title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
        </button>
      </div>
    </div>
  );
}

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No reviews yet for this machine.</p>
        <p className="text-xs text-muted-foreground mt-1">Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <div>
      <ReviewSummary reviews={reviews} />
      <div className="space-y-4">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}

export { ReviewSummary, ReviewCard, StarRating };
