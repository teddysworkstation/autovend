import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { invalidateProducts } from "@/data/products";
import { LogOut, Trash2, Plus, Package, ShoppingBag, MessageSquare, Edit2, Check, X } from "lucide-react";

type Tab = "products" | "orders" | "reviews";

export default function Admin() {
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("orders");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      checkAdmin(data.session?.user?.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      checkAdmin(s?.user?.id);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkAdmin = async (uid?: string) => {
    if (!uid) { setIsAdmin(false); return; }
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast({ title: "Login failed", description: error.message, variant: "destructive" });
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm space-y-4">
          <h1 className="font-display text-2xl font-bold">Admin Login</h1>
          <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </div>
    );
  }

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center">Checking access…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="font-display text-xl font-bold">VMH Admin</h1>
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}><LogOut className="w-4 h-4 mr-1" /> Sign out</Button>
        </div>
        <div className="container mx-auto flex gap-1 px-4">
          {(["orders","products","reviews"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 capitalize ${tab===t?"border-primary text-primary":"border-transparent text-muted-foreground"}`}>
              {t === "orders" && <ShoppingBag className="w-4 h-4 inline mr-1.5" />}
              {t === "products" && <Package className="w-4 h-4 inline mr-1.5" />}
              {t === "reviews" && <MessageSquare className="w-4 h-4 inline mr-1.5" />}
              {t}
            </button>
          ))}
        </div>
      </header>
      <main className="container mx-auto p-6">
        {tab === "orders" && <OrdersPanel />}
        {tab === "products" && <ProductsPanel />}
        {tab === "reviews" && <ReviewsPanel />}
      </main>
    </div>
  );
}

const STATUSES = ["pending","processing","awaiting_payment","shipped","completed","cancelled"];

function OrdersPanel() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
  };
  useEffect(() => { load(); }, []);
  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status: status as any }).eq("id", id);
    if (error) toast({ title: "Failed", variant: "destructive" }); else { toast({ title: "Status updated" }); load(); }
  };
  const remove = async (id: string) => { if (!confirm("Delete order?")) return; await supabase.from("orders").delete().eq("id", id); load(); };

  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl font-bold">Orders ({orders.length})</h2>
      {orders.map(o => (
        <Card key={o.id} className="p-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-sm font-bold">{o.order_number}</p>
              <p className="text-sm">{o.first_name} {o.last_name} — {o.email} — {o.phone}</p>
              <p className="text-xs text-muted-foreground">{o.company || ""} {o.business_type ? `• ${o.business_type}` : ""}</p>
              <p className="text-xs text-muted-foreground">{o.address}, {o.city}, {o.state} {o.zip}</p>
              <p className="text-xs mt-1">Plan: <b>{o.plan}</b> • Payment: <b>{o.payment_method}</b> • Total: <b className="font-mono">${Number(o.total).toLocaleString()}</b></p>
              <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
              {o.notes && <p className="text-xs mt-1 italic">"{o.notes}"</p>}
            </div>
            <div className="flex items-center gap-2">
              <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="h-9 rounded-md border border-input px-2 text-sm bg-background">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <Button variant="ghost" size="icon" onClick={() => remove(o.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        </Card>
      ))}
      {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
    </div>
  );
}

function ProductsPanel() {
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [showNew, setShowNew] = useState(false);
  const blank = { title: "", slug: "", category: "Combo and Dual Vending Machines", category_slug: "combo", price: 0, sale_price: null as any, image_url: "", excerpt: "", description: "", est_income_min: 400, est_income_max: 1000, stock_count: 5, is_featured: false, hide_reviews: false, hide_viewers: false };
  const [form, setForm] = useState<any>(blank);

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
  };
  useEffect(() => { load(); }, []);

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const save = async () => {
    const payload = { ...form, slug: form.slug || slugify(form.title), features: [], extra_images: [] };
    const { error } = await supabase.from("products").insert(payload);
    if (error) { toast({ title: "Failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Product added" }); setShowNew(false); setForm(blank); invalidateProducts(); load();
  };
  const update = async (id: string, patch: any) => { await supabase.from("products").update(patch).eq("id", id); invalidateProducts(); load(); };
  const remove = async (id: string) => { if (!confirm("Delete product?")) return; await supabase.from("products").delete().eq("id", id); invalidateProducts(); load(); };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Products ({products.length})</h2>
        <Button onClick={() => setShowNew(!showNew)}><Plus className="w-4 h-4 mr-1" /> Add Product</Button>
      </div>
      {showNew && (
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Slug (auto)</Label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder={slugify(form.title)} /></div>
            <div><Label>Price</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} /></div>
            <div><Label>Sale Price (optional)</Label><Input type="number" value={form.sale_price ?? ""} onChange={e => setForm({ ...form, sale_price: e.target.value ? +e.target.value : null })} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Category Slug</Label><Input value={form.category_slug} onChange={e => setForm({ ...form, category_slug: e.target.value })} /></div>
            <div className="col-span-2"><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://…" /></div>
            <div className="col-span-2"><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
            <div className="col-span-2"><Label>Description</Label><Textarea rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          </div>
          <div className="flex gap-2"><Button onClick={save}>Save</Button><Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button></div>
        </Card>
      )}
      <div className="grid gap-2">
        {products.map(p => (
          <Card key={p.id} className="p-3 flex items-center gap-3">
            <img src={p.image_url} alt="" className="w-14 h-14 object-contain bg-secondary rounded" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.category} • ${Number(p.price).toLocaleString()} • Stock: {p.stock_count}</p>
            </div>
            <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={p.is_featured} onChange={e => update(p.id, { is_featured: e.target.checked })} /> Featured</label>
            <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={p.hide_reviews} onChange={e => update(p.id, { hide_reviews: e.target.checked })} /> Hide reviews</label>
            <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={p.hide_viewers} onChange={e => update(p.id, { hide_viewers: e.target.checked })} /> Hide viewers</label>
            <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={p.is_active} onChange={e => update(p.id, { is_active: e.target.checked })} /> Active</label>
            <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReviewsPanel() {
  const [reviews, setReviews] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase.from("product_reviews").select("*").order("created_at", { ascending: false });
    setReviews(data || []);
  };
  useEffect(() => { load(); }, []);
  const setStatus = async (id: string, status: string) => { await supabase.from("product_reviews").update({ status: status as any }).eq("id", id); load(); };
  const remove = async (id: string) => { await supabase.from("product_reviews").delete().eq("id", id); load(); };

  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl font-bold">Reviews ({reviews.length})</h2>
      {reviews.map(r => (
        <Card key={r.id} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm"><b>{r.reviewer_name}</b> • {r.rating}★ • <span className="text-muted-foreground">{r.product_slug}</span> • <span className={`text-xs px-2 py-0.5 rounded-full ${r.status==='approved'?'bg-green-100 text-green-800':r.status==='rejected'?'bg-red-100 text-red-800':'bg-amber-100 text-amber-800'}`}>{r.status}</span></p>
              <p className="font-semibold mt-1">{r.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => setStatus(r.id, "approved")}><Check className="w-4 h-4 text-green-600" /></Button>
              <Button size="icon" variant="ghost" onClick={() => setStatus(r.id, "rejected")}><X className="w-4 h-4 text-red-600" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        </Card>
      ))}
      {reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}
    </div>
  );
}
