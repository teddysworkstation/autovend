import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

export default function ViewerCount({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Generate a deterministic but realistic-looking viewer count based on slug
    const hash = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const base = (hash % 18) + 3;
    setCount(base);

    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(2, Math.min(35, prev + delta));
      });
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(interval);
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
      <Eye className="w-3 h-3" />
      <span className="font-medium">{count}</span> viewing
    </span>
  );
}
