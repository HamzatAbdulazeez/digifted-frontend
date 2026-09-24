"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/apiClient";
import { Plus, Trash2, LogOut, Loader2, Users, ShoppingBag, TrendingUp } from "lucide-react";

function koboToNaira(kobo) { return (kobo / 100).toLocaleString("en-NG", { style: "currency", currency: "NGN" }); }

export default function AdminDashboardClient() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("staff"); // staff | orders
  const [staff, setStaff] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totals, setTotals] = useState({ count: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "staff" });
  const [error, setError] = useState("");

  const loadStaff = useCallback(async () => {
    const { data } = await api.get("/admin/staff");
    setStaff(data.data || []);
  }, []);

  const loadOrders = useCallback(async () => {
    const { data } = await api.get("/admin/orders");
    setOrders(data.data || []);
    setTotals(data.totals || { count: 0, revenue: 0 });
  }, []);

  useEffect(() => {
    api.get("/auth/me").then(async ({ data }) => {
      if (!data.user || data.user.role !== "admin") {
        router.replace("/admin/login");
        return;
      }
      setMe(data.user);
      setChecked(true);
      setLoading(true);
      await Promise.all([loadStaff(), loadOrders()]);
      setLoading(false);
    });
  }, [router, loadStaff, loadOrders]);

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      const { data } = await api.post("/admin/staff", form);
      setStaff([data, ...staff]);
      setForm({ name: "", email: "", password: "", role: "staff" });
      setShowCreate(false);
    } catch (err) {
      setError(err.message || "Couldn't create the account.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(member) {
    if (!confirm(`Remove ${member.name}'s account?`)) return;
    await api.delete(`/admin/staff/${member.id}`);
    setStaff((prev) => prev.filter((s) => s.id !== member.id));
  }

  async function handleLogout() {
    await api.post("/auth/logout");
    router.replace("/admin/login");
  }

  if (!checked) return null;

  return (
    <section className="min-h-screen bg-paper-dim py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-black text-3xl text-navy">Admin Dashboard</h1>
            <p className="text-navy-400 text-sm mt-1">Signed in as {me?.name || me?.email}</p>
          </div>
          <div className="flex gap-3">
            <a href="/staff/dashboard" className="btn-outline">Album Manager</a>
            <button onClick={handleLogout} className="btn-outline"><LogOut size={16} /> Log Out</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border border-black/10 rounded-lg p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center"><Users size={18} /></div>
            <div><div className="text-2xl font-display font-black text-navy">{staff.length}</div><div className="text-navy-400 text-sm">Staff &amp; Admins</div></div>
          </div>
          <div className="bg-white border border-black/10 rounded-lg p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center"><ShoppingBag size={18} /></div>
            <div><div className="text-2xl font-display font-black text-navy">{totals.count}</div><div className="text-navy-400 text-sm">Paid Orders</div></div>
          </div>
          <div className="bg-white border border-black/10 rounded-lg p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-red-500 text-white flex items-center justify-center"><TrendingUp size={18} /></div>
            <div><div className="text-2xl font-display font-black text-navy">{koboToNaira(totals.revenue)}</div><div className="text-navy-400 text-sm">Total Revenue</div></div>
          </div>
        </div>

        <div className="flex gap-2 mb-8 bg-white border border-black/10 rounded-full p-1 w-fit">
          <button onClick={() => setTab("staff")} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${tab === "staff" ? "bg-navy text-white" : "text-navy-400"}`}>Staff Accounts</button>
          <button onClick={() => setTab("orders")} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${tab === "orders" ? "bg-navy text-white" : "text-navy-400"}`}>All Orders</button>
        </div>

        {error && <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 rounded px-4 py-3">{error}</p>}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-navy" size={28} /></div>
        ) : tab === "staff" ? (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowCreate(!showCreate)} className="btn-red"><Plus size={16} /> New Staff/Admin</button>
            </div>
            {showCreate && (
              <form onSubmit={handleCreate} className="bg-white border border-black/10 rounded-lg p-7 mb-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold text-navy mb-2">Full Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
                  <div><label className="block text-sm font-semibold text-navy mb-2">Email *</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold text-navy mb-2">Temporary Password *</label><input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
                  <div><label className="block text-sm font-semibold text-navy mb-2">Role</label><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500"><option value="staff">Staff</option><option value="admin">Admin</option></select></div>
                </div>
                <button type="submit" disabled={creating} className="btn-red disabled:opacity-60">{creating ? "Creating…" : "Create Account"}</button>
              </form>
            )}
            <div className="bg-white border border-black/10 rounded-lg overflow-hidden">
              {staff.length === 0 ? <div className="p-10 text-center text-navy-400">No staff accounts yet.</div> : staff.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-6 py-4 border-b border-black/5 last:border-0">
                  <div>
                    <div className="font-semibold text-navy">{s.name} <span className="ml-2 text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-paper-dim text-navy-400">{s.role}</span></div>
                    <div className="text-navy-400 text-sm">{s.email}</div>
                  </div>
                  <button onClick={() => handleDelete(s)} className="p-2 rounded hover:bg-red-50 text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-black/10 rounded-lg overflow-hidden">
            {orders.length === 0 ? <div className="p-10 text-center text-navy-400">No orders yet.</div> : orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-6 py-4 border-b border-black/5 last:border-0">
                <div>
                  <div className="font-semibold text-navy">{o.galleryTitle}</div>
                  <div className="text-navy-400 text-sm">{o.customerName} · {o.customerEmail}</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-navy">{koboToNaira(o.total)}</div>
                  <div className={`text-xs font-mono uppercase ${o.status === "paid" ? "text-red-500" : "text-navy-400"}`}>{o.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
