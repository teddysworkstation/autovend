import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageCircle, Send, BadgeCheck } from "lucide-react";
import { getAllReviews, type Review } from "@/data/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.helpful);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border p-5"
    >
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
            <p className="text-xs text-muted-foreground">{review.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
          ))}
        </div>
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
          <MessageCircle className="w-3.5 h-3.5" /> Reply ({comments.length})
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
    </motion.div>
  );
}

export default function HomeReviews() {
  const reviews = getAllReviews().slice(0, 6);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">Customer Reviews</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Real reviews from verified buyers. Like and reply to share your experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
