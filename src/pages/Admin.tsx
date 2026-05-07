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
  LogOut, Trash2, Plus, Package, ShoppingBag, MessageSquare, Zap,
  Check, X, LayoutDashboard, Star, TrendingUp, AlertTriangle, Users, DollarSign, Menu,
  Ticket, Mail, Image, Edit2, Eye, EyeOff, Save, Copy, Download,
} from "lucide-react";

type Tab = "overview" | "products" | "orders" | "reviews" | "coupons" | "newsletter";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 w-full max-w-md space-y-6 shadow-2xl">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">VMH Admin</h1>
            <p className="text-sm text-gray-600 mt-2">Dashboard Login</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@vmh.com" className="mt-2 h-11 rounded-lg" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="mt-2 h-11 rounded-lg" />
            </div>
          </div>
          <Button type="submit" className="w-full h-11 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
          <p className="text-xs text-gray-500 text-center">Restricted area. Authorized personnel only.</p>
        </form>
      </div>
    );
  }

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center">Checking access…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  const navItems: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "coupons", label: "Coupons", icon: Ticket },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "newsletter", label: "Newsletter", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-slate-900 text-white flex flex-col transition-transform duration-300 shadow-2xl`}>
        <div className="p-6 border-b border-slate-700">
          <div className="font-display text-2xl font-bold">VMH</div>
          <div className="text-xs text-slate-400 mt-1">Admin Dashboard</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                tab === id ? "bg-blue-600 text-white shadow-lg" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-700">
          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" /> Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900 capitalize">{tab}</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage your store</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">A</div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {tab === "overview" && <OverviewPanel onNav={setTab} />}
          {tab === "orders" && <OrdersPanel />}
          {tab === "products" && <ProductsPanel />}
          {tab === "reviews" && <ReviewsPanel />}
          {tab === "coupons" && <CouponsPanel />}
          {tab === "newsletter" && <NewsletterPanel />}
        </main>
      </div>
    </div>
  );
}

const STATUSES = ["pending", "processing", "awaiting_payment", "shipped", "completed", "cancelled"];

function StatCard({ icon: Icon, label, value, color, trend }: any) {
  return (
    <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <div className={`${color} text-white rounded-lg p-3 flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-bold text-slate-900">{value}</p>
          {trend && <p className="text-xs text-green-600 mt-1">↑ {trend}</p>}
        </div>
      </div>
    </Card>
  );
}

function OverviewPanel({ onNav }: { onNav: (t: Tab) => void }) {
  const [stats, setStats] = useState({ products: 0, orders: 0, pendingReviews: 0, lowStock: 0, revenue: 0, customers: 0, activeCoupons: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [{ data: products }, { data: orders }, { data: reviews }, { data: coupons }] = await Promise.all([
        supabase.from("products").select("id, stock_count"),
        supabase.from("orders").select("id, order_number, status, total, first_name, last_name, created_at, email").order("created_at", { ascending: false }),
        supabase.from("product_reviews").select("id, status"),
        supabase.from("coupons").select("id, is_active"),
      ]);
      const lowStock = (products || []).filter(p => (p.stock_count ?? 0) <= 2).length;
      const pendingReviews = (reviews || []).filter(r => r.status === "pending").length;
      const revenue = (orders || []).reduce((s, o: any) => s + Number(o.total || 0), 0);
      const customers = new Set((orders || []).map((o: any) => o.email)).size;
      const activeCoupons = (coupons || []).filter(c => c.is_active).length;
      setStats({
        products: products?.length || 0,
        orders: orders?.length || 0,
        pendingReviews,
        lowStock,
        revenue,
        customers,
        activeCoupons,
      });
      setRecentOrders((orders || []).slice(0, 8));
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Products" value={stats.products} color="bg-blue-500" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.orders} color="bg-green-500" />
        <StatCard icon={Users} label="Customers" value={stats.customers} color="bg-purple-500" />
        <StatCard icon={DollarSign} label="Revenue" value={`$${(stats.revenue / 1000).toFixed(1)}K`} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Pending Reviews</p>
              <p className="font-display text-3xl font-bold text-slate-900 mt-2">{stats.pendingReviews}</p>
            </div>
            <Star className="w-12 h-12 text-amber-100" />
          </div>
          <button onClick={() => onNav("reviews")} className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-4">
            Review now →
          </button>
        </Card>

        <Card className="p-6 border-0 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Low Stock Items</p>
              <p className="font-display text-3xl font-bold text-slate-900 mt-2">{stats.lowStock}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-100" />
          </div>
          <button onClick={() => onNav("products")} className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-4">
            Manage stock →
          </button>
        </Card>

        <Card className="p-6 border-0 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Active Coupons</p>
              <p className="font-display text-3xl font-bold text-slate-900 mt-2">{stats.activeCoupons}</p>
            </div>
            <Ticket className="w-12 h-12 text-green-100" />
          </div>
          <button onClick={() => onNav("coupons")} className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-4">
            Create coupon →
          </button>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">Recent Orders</h2>
            <Button variant="ghost" size="sm" onClick={() => onNav("orders")}>View all</Button>
          </div>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-slate-600 p-6 text-center">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase">Total</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm font-semibold text-slate-900">{o.order_number}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{o.first_name} {o.last_name}</td>
                    <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                    <td className="px-6 py-4 text-right font-mono font-semibold text-slate-900">${Number(o.total).toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-sm text-slate-600">{new Date(o.created_at).toLocaleDateString()}</td>
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
  const map: Record<string, { bg: string; text: string }> = {
    pending: { bg: "bg-amber-50", text: "text-amber-700" },
    processing: { bg: "bg-blue-50", text: "text-blue-700" },
    awaiting_payment: { bg: "bg-orange-50", text: "text-orange-700" },
    shipped: { bg: "bg-indigo-50", text: "text-indigo-700" },
    completed: { bg: "bg-green-50", text: "text-green-700" },
    cancelled: { bg: "bg-red-50", text: "text-red-700" },
  };
  const style = map[status] || { bg: "bg-gray-50", text: "text-gray-700" };
  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>{status.replace("_", " ")}</span>;
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
      <Card className="p-4 border-0 shadow-sm flex flex-wrap gap-2">
        {["all", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === s ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            {s.replace("_", " ")} {s !== "all" && `(${orders.filter(o => o.status === s).length})`}
          </button>
        ))}
      </Card>
      {filtered.map(o => (
        <Card key={o.id} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <p className="font-mono font-bold text-slate-900">{o.order_number}</p>
                <StatusBadge status={o.status} />
                <span className="text-xs text-slate-500">{new Date(o.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">{o.first_name} {o.last_name}</p>
              <p className="text-sm text-slate-600 mt-1">{o.email} • {o.phone}</p>
              <p className="text-xs text-slate-500 mt-1">{o.address}, {o.city}, {o.state} {o.zip}</p>
              <p className="text-sm text-slate-700 mt-2 font-mono"><span className="font-bold">Total: ${Number(o.total).toLocaleString()}</span></p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="h-10 rounded-lg border border-slate-300 px-3 text-sm bg-white">
                {STATUSES.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
              <Button variant="ghost" size="icon" onClick={() => remove(o.id)} className="text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {filtered.length === 0 && <Card className="p-12 text-center text-slate-600 border-0 shadow-sm">No orders.</Card>}
    </div>
  );
}

function ProductsPanel() {
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const blank = { title: "", slug: "", category: "Combo", category_slug: "combo", price: 0, sale_price: null, image_url: "", excerpt: "", description: "", stock_count: 10, is_featured: false, is_active: true };
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
    toast({ title: "✓ Product added successfully" }); setShowNew(false); setForm(blank); invalidateProducts(); load();
  };
  
  const update = async (id: string, patch: any) => { 
    await supabase.from("products").update(patch).eq("id", id); 
    invalidateProducts(); 
    load(); 
  };
  
  const remove = async (id: string) => { if (!confirm("Delete product?")) return; await supabase.from("products").delete().eq("id", id); invalidateProducts(); load(); };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p => !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <Input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs h-11 rounded-lg" />
        </div>
        <Button onClick={() => setShowNew(!showNew)} className="bg-blue-600 hover:bg-blue-700 rounded-lg h-11">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {showNew && (
        <Card className="p-6 border-0 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-900">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="text-sm font-medium">Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="h-10 mt-2 rounded-lg" /></div>
            <div><Label className="text-sm font-medium">Price *</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} className="h-10 mt-2 rounded-lg" /></div>
            <div><Label className="text-sm font-medium">Sale Price</Label><Input type="number" value={form.sale_price ?? ""} onChange={e => setForm({ ...form, sale_price: e.target.value ? +e.target.value : null })} className="h-10 mt-2 rounded-lg" /></div>
            <div><Label className="text-sm font-medium">Stock</Label><Input type="number" value={form.stock_count} onChange={e => setForm({ ...form, stock_count: +e.target.value })} className="h-10 mt-2 rounded-lg" /></div>
            <div><Label className="text-sm font-medium">Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="h-10 mt-2 rounded-lg" /></div>
            <div><Label className="text-sm font-medium">Image URL</Label><Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://…" className="h-10 mt-2 rounded-lg" /></div>
            <div className="md:col-span-2"><Label className="text-sm font-medium">Excerpt</Label><Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="mt-2 rounded-lg" /></div>
            <div className="md:col-span-2"><Label className="text-sm font-medium">Description</Label><Textarea rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-2 rounded-lg" /></div>
          </div>
          <div className="flex gap-2 pt-2"><Button onClick={save} className="bg-blue-600 hover:bg-blue-700 rounded-lg">Save Product</Button><Button variant="ghost" onClick={() => setShowNew(false)} className="rounded-lg">Cancel</Button></div>
        </Card>
      )}

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.image_url && <img src={p.image_url} alt="" className="w-10 h-10 object-cover bg-slate-100 rounded" />}
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{p.title}</p>
                        <p className="text-xs text-slate-500">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">${Number(p.price).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.stock_count > 5 ? "bg-green-50 text-green-700" : p.stock_count > 0 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}>
                      {p.stock_count}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => update(p.id, { is_active: !p.is_active })} className="text-sm font-medium">
                      {p.is_active ? <span className="flex items-center gap-1 text-green-600"><Eye className="w-4 h-4" /> Active</span> : <span className="flex items-center gap-1 text-slate-400"><EyeOff className="w-4 h-4" /> Inactive</span>}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => remove(p.id)} className="text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

function CouponsPanel() {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ code: "", discount_type: "percentage", discount_value: 10, is_active: true, description: "" });

  const load = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    setCoupons(data || []);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.code || form.discount_value <= 0) {
      toast({ title: "Invalid coupon", description: "Code and discount value are required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("coupons").insert({
      code: form.code.toUpperCase(),
      discount_type: form.discount_type,
      discount_value: form.discount_value,
      is_active: form.is_active,
      description: form.description,
    });
    if (error) { toast({ title: "Failed", variant: "destructive" }); return; }
    toast({ title: "✓ Coupon created" });
    setShowNew(false);
    setForm({ code: "", discount_type: "percentage", discount_value: 10, is_active: true, description: "" });
    load();
  };

  const toggle = async (id: string, is_active: boolean) => {
    await supabase.from("coupons").update({ is_active: !is_active }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete coupon?")) return;
    await supabase.from("coupons").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display font-bold text-slate-900">Manage Coupons</h2>
        <Button onClick={() => setShowNew(!showNew)} className="bg-blue-600 hover:bg-blue-700 rounded-lg h-11">
          <Plus className="w-4 h-4 mr-2" /> New Coupon
        </Button>
      </div>

      {showNew && (
        <Card className="p-6 border-0 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="text-sm font-medium">Coupon Code *</Label><Input value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="SUMMER20" className="h-10 mt-2 rounded-lg" /></div>
            <div><Label className="text-sm font-medium">Discount Type</Label>
              <select value={form.discount_type} onChange={e => setForm({ ...form, discount_type: e.target.value })} className="h-10 mt-2 rounded-lg border border-slate-300 px-3 w-full bg-white">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed ($)</option>
              </select>
            </div>
            <div><Label className="text-sm font-medium">Discount Value *</Label><Input type="number" value={form.discount_value} onChange={e => setForm({ ...form, discount_value: +e.target.value })} className="h-10 mt-2 rounded-lg" /></div>
            <div><Label className="text-sm font-medium">Description</Label><Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Summer sale..." className="h-10 mt-2 rounded-lg" /></div>
          </div>
          <div className="flex gap-2 pt-2"><Button onClick={save} className="bg-blue-600 hover:bg-blue-700 rounded-lg">Create Coupon</Button><Button variant="ghost" onClick={() => setShowNew(false)} className="rounded-lg">Cancel</Button></div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(c => (
          <Card key={c.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-mono font-bold text-lg text-slate-900">{c.code}</p>
                <p className="text-xs text-slate-500 mt-1">{c.description}</p>
              </div>
              <button onClick={() => toggle(c.id, c.is_active)} className={`px-2 py-1 rounded text-xs font-semibold ${c.is_active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                {c.is_active ? "Active" : "Inactive"}
              </button>
            </div>
            <p className="font-bold text-slate-900 mb-3">{c.discount_value}{c.discount_type === "percentage" ? "%" : "$"} off</p>
            <Button variant="ghost" size="sm" onClick={() => remove(c.id)} className="text-red-600 hover:bg-red-50 w-full">
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReviewsPanel() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  
  const load = async () => {
    const { data } = await supabase.from("product_reviews").select("*").order("created_at", { ascending: false });
    setReviews(data || []);
  };
  
  useEffect(() => { load(); }, []);
  
  const setStatus = async (id: string, status: string) => { 
    await supabase.from("product_reviews").update({ status: status as any }).eq("id", id); 
    load(); 
  };
  
  const remove = async (id: string) => { 
    if (!confirm("Delete review?")) return;
    await supabase.from("product_reviews").delete().eq("id", id); 
    load(); 
  };
  
  const filtered = filter === "all" ? reviews : reviews.filter(r => r.status === filter);

  return (
    <div className="space-y-4">
      <Card className="p-4 border-0 shadow-sm flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === s ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)} {s !== "all" && `(${reviews.filter(r => r.status === s).length})`}
          </button>
        ))}
      </Card>

      {filtered.map(r => (
        <Card key={r.id} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <p className="font-semibold text-slate-900">{r.reviewer_name}</p>
                <span className="text-amber-500">{"★".repeat(r.rating)}</span>
                <span className="text-xs text-slate-500">on {r.product_slug}</span>
              </div>
              <p className="font-semibold text-slate-900 mt-2">{r.title}</p>
              <p className="text-slate-600 mt-1 text-sm">{r.comment}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => setStatus(r.id, "approved")} title="Approve" className="text-green-600 hover:bg-green-50">
                <Check className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setStatus(r.id, "rejected")} title="Reject" className="text-red-600 hover:bg-red-50">
                <X className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => remove(r.id)} className="text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {filtered.length === 0 && <Card className="p-12 text-center text-slate-600 border-0 shadow-sm">No reviews to display.</Card>}
    </div>
  );
}

function NewsletterPanel() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, unsubscribed: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
      const subs = data || [];
      setSubscribers(subs);
      setStats({
        total: subs.length,
        active: subs.filter(s => s.is_subscribed).length,
        unsubscribed: subs.filter(s => !s.is_subscribed).length,
      });
    })();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Mail} label="Total Subscribers" value={stats.total} color="bg-blue-500" />
        <StatCard icon={Check} label="Active" value={stats.active} color="bg-green-500" />
        <StatCard icon={X} label="Unsubscribed" value={stats.unsubscribed} color="bg-red-500" />
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-display text-lg font-bold text-slate-900">Subscribers</h2>
        </div>
        {subscribers.length === 0 ? (
          <p className="p-6 text-center text-slate-600">No subscribers yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(s => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-900">{s.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.is_subscribed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {s.is_subscribed ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600">{new Date(s.created_at).toLocaleDateString()}</td>
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
