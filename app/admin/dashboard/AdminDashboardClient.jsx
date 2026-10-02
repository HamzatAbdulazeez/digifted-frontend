"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/apiClient";
import {
  Plus, Trash2, LogOut, Loader2, Users, ShoppingBag, TrendingUp,
  ShieldCheck, Mail, X,
} from "lucide-react";

function koboToNaira(kobo) { return (kobo / 100).toLocaleString("en-NG", { style: "currency", currency: "NGN" }); }

function StatCard({ icon: Icon, value, label, accent }) {
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${accent ? "bg-red-500" : "bg-navy"} text-white`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-2xl font-display font-black text-navy">{value}</div>
        <div className="text-navy-400 text-sm">{label}</div>
      </div>
    </div>
  );
}

export default function AdminDashboardClient() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("staff");
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
          <StatCard icon={Users} value={staff.length} label="Staff & Admins" />
          <StatCard icon={ShoppingBag} value={totals.count} label="Paid Orders" />
          <StatCard icon={TrendingUp} value={koboToNaira(totals.revenue)} label="Total Revenue" accent />
        </div>

        <div className="flex gap-1 mb-8 bg-white border border-black/10 rounded-full p-1.5 w-fit shadow-sm">
          <button onClick={() => setTab("staff")} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${tab === "staff" ? "bg-navy text-white" : "text-navy-400 hover:text-navy"}`}>Staff Accounts</button>
          <button onClick={() => setTab("orders")} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${tab === "orders" ? "bg-navy text-white" : "text-navy-400 hover:text-navy"}`}>All Orders</button>
        </div>

        {error && <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-navy" size={28} /></div>
        ) : tab === "staff" ? (
          <div>
            <div className="flex justify-end mb-5">
              <button onClick={() => setShowCreate(!showCreate)} className="btn-red"><Plus size={16} /> New Staff/Admin</button>
            </div>

            {showCreate && (
              <form onSubmit={handleCreate} className="bg-white border border-black/10 rounded-2xl p-8 mb-6 space-y-5 shadow-sm">
                <h2 className="font-display font-bold text-xl text-navy">Create Account</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Full Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Temporary Password *</label>
                    <input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Role</label>
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition">
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={creating} className="btn-red disabled:opacity-60">{creating ? "Creating…" : "Create Account"}</button>
                  <button type="button" onClick={() => setShowCreate(false)} className="btn-outline"><X size={14} /> Cancel</button>
                </div>
              </form>
            )}

            {staff.length === 0 ? (
              <div className="text-center py-20 bg-white border border-black/10 rounded-2xl text-navy-400">No staff accounts yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {staff.map((s) => (
                  <div key={s.id} className="bg-white border border-black/10 rounded-2xl p-6 flex items-start justify-between gap-4 shadow-sm hover:shadow-card transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${s.role === "admin" ? "bg-red-500" : "bg-navy"} text-white`}>
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-navy">{s.name}</span>
                          <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-paper-dim text-navy-400">{s.role}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-navy-400 text-sm mt-1">
                          <Mail size={13} /> {s.email}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(s)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition shrink-0"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-white border border-black/10 rounded-2xl text-navy-400">No orders yet.</div>
            ) : (
              <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm">
                {orders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between px-7 py-5 border-b border-black/5 last:border-0 hover:bg-paper-dim/50 transition">
                    <div>
                      <div className="font-display font-bold text-navy">{o.galleryTitle}</div>
                      <div className="text-navy-400 text-sm mt-0.5">{o.customerName} · {o.customerEmail}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-black text-navy text-lg">{koboToNaira(o.total)}</div>
                      <div className={`text-xs font-mono uppercase tracking-wide mt-0.5 ${
                        o.status === "paid" ? "text-red-500" : o.status === "failed" ? "text-navy-300" : "text-navy-400"
                      }`}>
                        {o.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}