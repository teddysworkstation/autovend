import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { invalidateProducts } from "@/data/products";
import {
  LogOut, Trash2, Plus, Package, ShoppingBag, MessageSquare,
  Check, X, LayoutDashboard, Star, TrendingUp, AlertTriangle, Users, DollarSign, Menu,
} from "lucide-react";

type Tab = "overview" | "products" | "orders" | "reviews";

export default function Admin() {
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <form onSubmit={handleLogin} className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm space-y-4 shadow-sm">
          <h1 className="font-display text-2xl font-bold">VMH Admin Login</h1>
          <p className="text-sm text-muted-foreground">Restricted area. Authorized personnel only.</p>
          <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </div>
    );
  }

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center">Checking access…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  const navItems: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-[hsl(var(--foreground))] text-white flex flex-col transition-transform`}>
        <div className="p-6 border-b border-white/10">
          <div className="font-display text-xl font-bold">VMH Admin</div>
          <div className="text-xs text-white/50 mt-1">Vending Machine Hub</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === id ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="w-5 h-5" /> Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-card border-b border-border sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
              <div>
                <h1 className="font-display text-xl font-bold capitalize">{tab}</h1>
                <p className="text-xs text-muted-foreground">Welcome back, Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {tab === "overview" && <OverviewPanel onNav={setTab} />}
          {tab === "orders" && <OrdersPanel />}
          {tab === "products" && <ProductsPanel />}
          {tab === "reviews" && <ReviewsPanel />}
        </main>
      </div>
    </div>
  );
}

const STATUSES = ["pending", "processing", "awaiting_payment", "shipped", "completed", "cancelled"];

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="p-5 flex flex-col items-start gap-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="font-display text-3xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
      </div>
    </Card>
  );
}

function OverviewPanel({ onNav }: { onNav: (t: Tab) => void }) {
  const [stats, setStats] = useState({ products: 0, orders: 0, pendingReviews: 0, lowStock: 0, revenue: 0, customers: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [{ data: products }, { data: orders }, { data: reviews }] = await Promise.all([
        supabase.from("products").select("id, stock_count"),
        supabase.from("orders").select("id, order_number, status, total, first_name, last_name, created_at, email").order("created_at", { ascending: false }),
        supabase.from("product_reviews").select("id, status"),
      ]);
      const lowStock = (products || []).filter(p => (p.stock_count ?? 0) <= 2).length;
      const pendingReviews = (reviews || []).filter(r => r.status === "pending").length;
      const revenue = (orders || []).reduce((s, o: any) => s + Number(o.total || 0), 0);
      const customers = new Set((orders || []).map((o: any) => o.email)).size;
      setStats({
        products: products?.length || 0,
        orders: orders?.length || 0,
        pendingReviews,
        lowStock,
        revenue,
        customers,
      });
      setRecentOrders((orders || []).slice(0, 6));
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard icon={Package} label="Total Products" value={stats.products} color="bg-blue-500" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.orders} color="bg-green-500" />
        <StatCard icon={Star} label="Pending Reviews" value={stats.pendingReviews} color="bg-amber-500" />
        <StatCard icon={AlertTriangle} label="Low Stock Items" value={stats.lowStock} color="bg-red-500" />
        <StatCard icon={Users} label="Customers" value={stats.customers} color="bg-purple-500" />
        <StatCard icon={DollarSign} label="Revenue" value={`$${stats.revenue.toLocaleString()}`} color="bg-indigo-500" />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Recent Orders</h2>
          <Button variant="ghost" size="sm" onClick={() => onNav("orders")}>View all</Button>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 font-medium">Order ID</th>
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium text-right">Total</th>
                  <th className="py-2 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} className="border-b border-border/50">
                    <td className="py-3 font-mono text-xs">{o.order_number}</td>
                    <td className="py-3">{o.first_name} {o.last_name}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                    <td className="py-3 text-right font-mono">${Number(o.total).toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    processing: "bg-blue-100 text-blue-800",
    awaiting_payment: "bg-orange-100 text-orange-800",
    shipped: "bg-indigo-100 text-indigo-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${map[status] || "bg-gray-100 text-gray-700"}`}>{status}</span>;
}

function OrdersPanel() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
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
  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-4">
      <Card className="p-3 flex flex-wrap gap-2">
        {["all", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}>
            {s.replace("_", " ")} {s !== "all" && `(${orders.filter(o => o.status === s).length})`}
          </button>
        ))}
      </Card>
      {filtered.map(o => (
        <Card key={o.id} className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="font-mono text-sm font-bold">{o.order_number}</p>
                <StatusBadge status={o.status} />
                <span className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm mt-2">{o.first_name} {o.last_name} — {o.email} — {o.phone}</p>
              <p className="text-xs text-muted-foreground">{o.company || ""} {o.business_type ? `• ${o.business_type}` : ""}</p>
              <p className="text-xs text-muted-foreground">{o.address}, {o.city}, {o.state} {o.zip}</p>
              <p className="text-xs mt-2">Plan: <b>{o.plan}</b> • Payment: <b className="capitalize">{o.payment_method}</b> • Total: <b className="font-mono text-primary">${Number(o.total).toLocaleString()}</b></p>
              {o.notes && <p className="text-xs mt-2 italic text-muted-foreground">"{o.notes}"</p>}
            </div>
            <div className="flex items-center gap-2">
              <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="h-9 rounded-md border border-input px-2 text-sm bg-background">
                {STATUSES.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
              <Button variant="ghost" size="icon" onClick={() => remove(o.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        </Card>
      ))}
      {filtered.length === 0 && <Card className="p-8 text-center text-muted-foreground">No orders.</Card>}
    </div>
  );
}

function ProductsPanel() {
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
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

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p => !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        <Button onClick={() => setShowNew(!showNew)}><Plus className="w-4 h-4 mr-1" /> Add Product</Button>
      </div>
      {showNew && (
        <Card className="p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Slug (auto)</Label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder={slugify(form.title)} /></div>
            <div><Label>Price</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} /></div>
            <div><Label>Sale Price (optional)</Label><Input type="number" value={form.sale_price ?? ""} onChange={e => setForm({ ...form, sale_price: e.target.value ? +e.target.value : null })} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Category Slug</Label><Input value={form.category_slug} onChange={e => setForm({ ...form, category_slug: e.target.value })} /></div>
            <div className="md:col-span-2"><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://…" /></div>
            <div className="md:col-span-2"><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
            <div className="md:col-span-2"><Label>Description</Label><Textarea rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          </div>
          <div className="flex gap-2"><Button onClick={save}>Save</Button><Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button></div>
        </Card>
      )}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Flags</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} alt="" className="w-12 h-12 object-contain bg-secondary rounded" />
                      <div className="min-w-0">
                        <p className="font-semibold truncate max-w-xs">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono">${Number(p.price).toLocaleString()}</td>
                  <td className="px-4 py-3">{p.stock_count}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1 text-xs">
                      <label className="flex items-center gap-1"><input type="checkbox" checked={p.is_featured} onChange={e => update(p.id, { is_featured: e.target.checked })} /> Featured</label>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={p.is_active} onChange={e => update(p.id, { is_active: e.target.checked })} /> Active</label>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={p.hide_reviews} onChange={e => update(p.id, { hide_reviews: e.target.checked })} /> Hide reviews</label>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={p.hide_viewers} onChange={e => update(p.id, { hide_viewers: e.target.checked })} /> Hide viewers</label>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ReviewsPanel() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const load = async () => {
    const { data } = await supabase.from("product_reviews").select("*").order("created_at", { ascending: false });
    setReviews(data || []);
  };
  useEffect(() => { load(); }, []);
  const setStatus = async (id: string, status: string) => { await supabase.from("product_reviews").update({ status: status as any }).eq("id", id); load(); };
  const remove = async (id: string) => { await supabase.from("product_reviews").delete().eq("id", id); load(); };
  const filtered = filter === "all" ? reviews : reviews.filter(r => r.status === filter);

  return (
    <div className="space-y-4">
      <Card className="p-3 flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"}`}>
            {s} {s !== "all" && `(${reviews.filter(r => r.status === s).length})`}
          </button>
        ))}
      </Card>
      {filtered.map(r => (
        <Card key={r.id} className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <b>{r.reviewer_name}</b>
                <span className="text-amber-500">{"★".repeat(r.rating)}</span>
                <span className="text-muted-foreground text-xs">on {r.product_slug}</span>
                <StatusBadge status={r.status} />
              </div>
              <p className="font-semibold mt-2">{r.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => setStatus(r.id, "approved")} title="Approve"><Check className="w-4 h-4 text-green-600" /></Button>
              <Button size="icon" variant="ghost" onClick={() => setStatus(r.id, "rejected")} title="Reject"><X className="w-4 h-4 text-red-600" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        </Card>
      ))}
      {filtered.length === 0 && <Card className="p-8 text-center text-muted-foreground">No reviews.</Card>}
    </div>
  );
}
