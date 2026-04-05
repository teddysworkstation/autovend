import { useState } from "react";
import { Star, ThumbsUp, BadgeCheck, MessageCircle, Send } from "lucide-react";
import { type Review, getReviewStats } from "@/data/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

function ReviewCard({ review }: { review: Review }) {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.helpful);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    setComments([...comments, {
      id: `c-${Date.now()}`,
      name: commentName.trim(),
      text: commentText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }]);
    setCommentName("");
    setCommentText("");
    toast({ title: "Comment added!" });
  };

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
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
        <button onClick={handleLike}
          className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
            liked ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
          }`}>
          <ThumbsUp className={`w-3.5 h-3.5 ${liked ? "fill-primary" : ""}`} /> Helpful ({likeCount})
        </button>
        <button onClick={() => setShowComments(!showComments)}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="w-3.5 h-3.5" /> Comments ({comments.length})
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-3 border-t border-border space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-secondary/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.date}</span>
              </div>
              <p className="text-xs text-muted-foreground">{c.text}</p>
            </div>
          ))}
          <form onSubmit={handleComment} className="space-y-2">
            <Input value={commentName} onChange={e => setCommentName(e.target.value)}
              placeholder="Your name" className="h-9 text-xs" />
            <div className="flex gap-2">
              <Input value={commentText} onChange={e => setCommentText(e.target.value)}
                placeholder="Write a comment..." className="h-9 text-xs flex-1" />
              <Button type="submit" size="sm" className="h-9 px-3">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </form>
        </div>
      )}
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
