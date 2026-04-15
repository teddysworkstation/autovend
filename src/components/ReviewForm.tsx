import { useState } from "react";
import { Star, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  productTitle: string;
  onSubmit: (review: { name: string; rating: number; title: string; comment: string; location: string }) => void;
  onClose: () => void;
}

export default function ReviewForm({ productTitle, onSubmit, onClose }: ReviewFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rating || !title || !comment) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    onSubmit({ name, rating, title, comment, location: location || "United States" });
    toast({ title: "Review submitted!", description: "Thank you for your feedback." });
    onClose();
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-bold text-foreground">Write a Review</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Reviewing: <span className="font-semibold text-foreground">{productTitle}</span></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Rating *</label>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i + 1)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    (hoverRating || rating) > i
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Your Name *</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="John D." className="h-10" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
            <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="New York, NY" className="h-10" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Review Title *</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Great machine for passive income!" className="h-10" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Your Review *</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your experience with this vending machine..."
            rows={4}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="h-10 px-6 font-display font-semibold rounded-xl">
            <Send className="w-4 h-4 mr-2" /> Submit Review
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="h-10 px-6 rounded-xl">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
