"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/apiClient";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import { Plus, Upload, Trash2, Copy, Check, LogOut, Loader2 } from "lucide-react";

const DEPARTMENTS = ["Studios", "Live & Events", "Business Solutions", "Digital Marketing", "Creative Services"];

function nairaToKobo(naira) { return Math.round(parseFloat(naira || "0") * 100); }
function koboToNaira(kobo) { return (kobo / 100).toLocaleString("en-NG", { style: "currency", currency: "NGN" }); }

export default function StaffDashboardClient() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [checked, setChecked] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", department: DEPARTMENTS[0], description: "", price: "", password: "" });
  const [copiedId, setCopiedId] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [error, setError] = useState("");

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/staff/galleries");
      setAlbums(data.data || []);
    } catch {
      setError("Couldn't load albums.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    api.get("/auth/me").then(({ data }) => {
      if (!data.user || !["staff", "admin"].includes(data.user.role)) {
        router.replace("/staff/login");
        return;
      }
      setMe(data.user);
      setChecked(true);
      loadAlbums();
    });
  }, [router, loadAlbums]);

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      const { data } = await api.post("/staff/galleries", {
        title: form.title, department: form.department, description: form.description,
        price: nairaToKobo(form.price), password: form.password || undefined,
      });
      setAlbums([{ ...data, media_count: 0 }, ...albums]);
      setForm({ title: "", department: DEPARTMENTS[0], description: "", price: "", password: "" });
      setShowCreate(false);
    } catch (err) {
      setError(err.message || "Couldn't create the album.");
    } finally {
      setCreating(false);
    }
  }

  async function handleUpload(gallery, files) {
    setUploadingId(gallery.id);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const uploaded = await uploadToCloudinary(file);
        await api.post(`/staff/galleries/${gallery.id}/media`, uploaded);
      }
      setAlbums((prev) => prev.map((a) => (a.id === gallery.id ? { ...a, media_count: (a.media_count || 0) + files.length } : a)));
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploadingId(null);
    }
  }

  async function handleDelete(gallery) {
    if (!confirm(`Delete "${gallery.title}"? This can't be undone.`)) return;
    await api.delete(`/staff/galleries/${gallery.id}`);
    setAlbums((prev) => prev.filter((a) => a.id !== gallery.id));
  }

  function copyPassword(gallery) {
    navigator.clipboard.writeText(gallery.password || "");
    setCopiedId(gallery.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  async function handleLogout() {
    await api.post("/auth/logout");
    router.replace("/staff/login");
  }

  if (!checked) return null;

  return (
    <section className="min-h-screen bg-paper-dim py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display font-black text-3xl text-navy">Staff Dashboard</h1>
            <p className="text-navy-400 text-sm mt-1">Signed in as {me?.name || me?.email} ({me?.role})</p>
          </div>
          <div className="flex gap-3">
            {me?.role === "admin" && <a href="/admin/dashboard" className="btn-outline">Admin Panel</a>}
            <button onClick={() => setShowCreate(!showCreate)} className="btn-red"><Plus size={16} /> New Album</button>
            <button onClick={handleLogout} className="btn-outline"><LogOut size={16} /> Log Out</button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 rounded px-4 py-3">{error}</p>}

        {showCreate && (
          <form onSubmit={handleCreate} className="bg-white border border-black/10 rounded-lg p-7 mb-10 space-y-5">
            <h2 className="font-display font-bold text-lg text-navy">Create Album</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-semibold text-navy mb-2">Album Title *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Chidi & Ada's Wedding" className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
              <div><label className="block text-sm font-semibold text-navy mb-2">Department</label><select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500">{DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}</select></div>
            </div>
            <div><label className="block text-sm font-semibold text-navy mb-2">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-semibold text-navy mb-2">Price (₦) *</label><input required type="number" min="1" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="15000" className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
              <div><label className="block text-sm font-semibold text-navy mb-2">Password <span className="text-navy-400 font-normal">(blank = auto-generate)</span></label><input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Leave blank to auto-generate" className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
            </div>
            <button type="submit" disabled={creating} className="btn-red disabled:opacity-60">{creating ? "Creating…" : "Create Album"}</button>
          </form>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-navy" size={28} /></div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20 text-navy-400">No albums yet — create one above.</div>
        ) : (
          <div className="space-y-4">
            {albums.map((gallery) => (
              <div key={gallery.id} className="bg-white border border-black/10 rounded-lg p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-navy">{gallery.title}</h3>
                    <p className="text-navy-400 text-sm mt-1">{gallery.department} · {gallery.media_count ?? 0} files · {koboToNaira(gallery.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-paper-dim rounded px-3 py-2 font-mono text-sm text-navy">
                      {gallery.password}
                      <button onClick={() => copyPassword(gallery)} className="text-navy-400 hover:text-red-500">{copiedId === gallery.id ? <Check size={14} /> : <Copy size={14} />}</button>
                    </div>
                    <button onClick={() => handleDelete(gallery)} className="p-2.5 rounded hover:bg-red-50 text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
                <label className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy cursor-pointer hover:text-red-500 transition">
                  {uploadingId === gallery.id ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  {uploadingId === gallery.id ? "Uploading…" : "Upload photos/videos"}
                  <input type="file" multiple accept="image/*,video/*" className="hidden" disabled={uploadingId === gallery.id} onChange={(e) => e.target.files.length && handleUpload(gallery, e.target.files)} />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
