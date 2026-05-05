import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage } from "@/data/productImages";

export interface Product {
  id?: string;
  title: string;
  slug: string;
  price: number;
  salePrice: number | null;
  category: string;
  categorySlug: string;
  images: string[];
  description: string;
  excerpt: string;
  estimatedMonthlyIncomeMin: number;
  estimatedMonthlyIncomeMax: number;
  roiMonths: number;
  deposit: number;
  features: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  hideReviews?: boolean;
  hideViewers?: boolean;
}

export const categories = [
  { slug: "combo", name: "Combo Machines", icon: "layers" },
  { slug: "drink", name: "Drink Machines", icon: "cup-soda" },
  { slug: "snack", name: "Snack Machines", icon: "cookie" },
  { slug: "specialized", name: "Specialized Machines", icon: "settings" },
  { slug: "used", name: "Used Machines", icon: "recycle" },
  { slug: "smart-store", name: "Smart Stores", icon: "store" },
  { slug: "smart-cooler", name: "Smart Coolers", icon: "snowflake" },
  { slug: "kiosk", name: "Self-Checkout Kiosks", icon: "monitor" },
  { slug: "ai-vending", name: "AI Vending Machines", icon: "sparkles" },
];

export const categoryDescriptions: Record<string, { title: string; description: string; keywords: string }> = {
  combo: { title: "Combo Vending Machines for Sale", description: "Browse premium combo vending machines for sale at Vending Machine Hub.", keywords: "combo vending machine for sale" },
  drink: { title: "Drink & Soda Vending Machines for Sale", description: "Explore the best drink vending machines for sale.", keywords: "drink vending machine for sale" },
  snack: { title: "Snack Vending Machines for Sale", description: "Shop high-capacity snack vending machines for sale.", keywords: "snack vending machine for sale" },
  specialized: { title: "Specialized Vending Machines for Sale", description: "Discover specialized vending machines for sale.", keywords: "specialized vending machine for sale" },
  used: { title: "Used Vending Machines for Sale", description: "Save thousands on certified-refurbished used vending machines.", keywords: "used vending machine for sale" },
  "smart-store": { title: "Smart Stores for Sale", description: "AI-powered smart stores for sale.", keywords: "smart vending machine for sale" },
  "smart-cooler": { title: "Smart Coolers for Sale", description: "Compact AI smart coolers for sale.", keywords: "smart cooler for sale" },
  kiosk: { title: "Self-Checkout Kiosks for Sale", description: "Self-checkout kiosks for micro markets.", keywords: "self-checkout kiosk for sale" },
  "ai-vending": { title: "AI Vending Machines for Sale", description: "The HAHA series of computer-vision smart coolers.", keywords: "ai vending machine for sale" },
};

function rowToProduct(r: any): Product {
  const extra = Array.isArray(r.extra_images) ? r.extra_images : [];
  const images = [r.image_url, ...extra].filter(Boolean).map(resolveImage);
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    price: Number(r.price),
    salePrice: r.sale_price != null ? Number(r.sale_price) : null,
    category: r.category,
    categorySlug: r.category_slug,
    images,
    description: r.description || "",
    excerpt: r.excerpt || "",
    estimatedMonthlyIncomeMin: r.est_income_min ?? 400,
    estimatedMonthlyIncomeMax: r.est_income_max ?? 1000,
    roiMonths: r.roi_months ?? 6,
    deposit: 0,
    features: Array.isArray(r.features) ? r.features : [],
    inStock: r.in_stock,
    stockCount: r.stock_count,
    isFeatured: r.is_featured,
    hideReviews: r.hide_reviews,
    hideViewers: r.hide_viewers,
  };
}

// In-memory cache populated lazily — keeps existing sync API working.
let cache: Product[] = [];
let cacheLoaded = false;
const listeners = new Set<() => void>();

export async function loadProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  cache = (data || []).map(rowToProduct);
  cacheLoaded = true;
  listeners.forEach((l) => l());
  return cache;
}

// Synchronous accessor — returns whatever is cached. Components should use the hook below.
export const products = new Proxy([] as Product[], {
  get(_t, prop) {
    return (cache as any)[prop];
  },
}) as unknown as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return cache.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return cache;
  return cache.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return cache.filter((p) => p.isFeatured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);
}

// React hook to ensure products are loaded
export function useProducts() {
  const [items, setItems] = useState<Product[]>(cache);
  const [loading, setLoading] = useState(!cacheLoaded);

  useEffect(() => {
    let mounted = true;
    const update = () => mounted && setItems([...cache]);
    listeners.add(update);
    if (!cacheLoaded) {
      loadProducts().then(() => mounted && (setItems([...cache]), setLoading(false))).catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => { mounted = false; listeners.delete(update); };
  }, []);

  return { products: items, loading, reload: loadProducts };
}

export function invalidateProducts() {
  cacheLoaded = false;
  return loadProducts();
}
