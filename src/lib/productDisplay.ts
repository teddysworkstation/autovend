// Deterministic helpers for product display flags.
// Urgency badge ("Only X left") shows on ~50% of products, weighted toward hot categories.
const HOT_CATEGORIES = new Set(["combo", "snack", "drink", "ai-vending"]);

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function shouldShowUrgency(slug: string, categorySlug: string, stockCount: number): boolean {
  if (stockCount > 5) return false;
  const h = hash(slug);
  // hot categories ~70% chance, others ~30%
  const threshold = HOT_CATEGORIES.has(categorySlug) ? 70 : 30;
  return (h % 100) < threshold;
}
