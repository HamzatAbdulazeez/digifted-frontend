"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/apiClient";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import {
  Plus, Upload, Trash2, Copy, Check, LogOut, Loader2, Pencil, X,
  ImageOff, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
} from "lucide-react";

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

  const [expandedId, setExpandedId] = useState(null);
  const [mediaByGallery, setMediaByGallery] = useState({});
  const [mediaLoadingId, setMediaLoadingId] = useState(null);
  const [deletingMediaId, setDeletingMediaId] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { galleryId, index }

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [savingEdit, setSavingEdit] = useState(false);

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
      const uploaded = [];
      for (const file of Array.from(files)) {
        const result = await uploadToCloudinary(file);
        const { data: mediaRow } = await api.post(`/staff/galleries/${gallery.id}/media`, result);
        uploaded.push(mediaRow);
      }
      setAlbums((prev) => prev.map((a) => (a.id === gallery.id ? { ...a, media_count: (a.media_count || 0) + files.length } : a)));
      setMediaByGallery((prev) =>
        prev[gallery.id] ? { ...prev, [gallery.id]: [...uploaded, ...prev[gallery.id]] } : prev
      );
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploadingId(null);
    }
  }

  async function toggleMedia(gallery) {
    if (expandedId === gallery.id) { setExpandedId(null); return; }
    setExpandedId(gallery.id);
    if (!mediaByGallery[gallery.id]) {
      setMediaLoadingId(gallery.id);
      try {
        const { data } = await api.get(`/staff/galleries/${gallery.id}/media`);
        setMediaByGallery((prev) => ({ ...prev, [gallery.id]: data.data || [] }));
      } catch {
        setError("Couldn't load photos for this album.");
      } finally {
        setMediaLoadingId(null);
      }
    }
  }

  async function handleDeleteMedia(galleryId, mediaId) {
    setDeletingMediaId(mediaId);
    try {
      await api.delete(`/staff/galleries/${galleryId}/media/${mediaId}`);
      setMediaByGallery((prev) => ({ ...prev, [galleryId]: prev[galleryId].filter((m) => m.id !== mediaId) }));
      setAlbums((prev) => prev.map((a) => (a.id === galleryId ? { ...a, media_count: Math.max(0, (a.media_count || 1) - 1) } : a)));
      setLightbox(null);
    } catch (err) {
      setError(err.message || "Couldn't remove that photo.");
    } finally {
      setDeletingMediaId(null);
    }
  }

  function startEdit(gallery) {
    setEditingId(gallery.id);
    setEditForm({
      title: gallery.title,
      department: gallery.department || DEPARTMENTS[0],
      description: gallery.description || "",
      price: (gallery.price / 100).toString(),
    });
  }

  async function handleSaveEdit(gallery) {
    setSavingEdit(true);
    setError("");
    try {
      const { data } = await api.patch(`/staff/galleries/${gallery.id}`, {
        title: editForm.title, department: editForm.department,
        description: editForm.description, price: nairaToKobo(editForm.price),
      });
      setAlbums((prev) => prev.map((a) => (a.id === gallery.id ? { ...a, ...data } : a)));
      setEditingId(null);
    } catch (err) {
      setError(err.message || "Couldn't save changes.");
    } finally {
      setSavingEdit(false);
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

  function openLightbox(galleryId, index) { setLightbox({ galleryId, index }); }
  function closeLightbox() { setLightbox(null); }
  function nextImage(e) {
    e?.stopPropagation();
    const list = mediaByGallery[lightbox.galleryId];
    setLightbox((l) => ({ ...l, index: (l.index + 1) % list.length }));
  }
  function prevImage(e) {
    e?.stopPropagation();
    const list = mediaByGallery[lightbox.galleryId];
    setLightbox((l) => ({ ...l, index: (l.index - 1 + list.length) % list.length }));
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

        {error && <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

        {showCreate && (
          <form onSubmit={handleCreate} className="bg-white border border-black/10 rounded-2xl p-8 mb-10 space-y-5 shadow-sm">
            <h2 className="font-display font-bold text-xl text-navy">Create Album</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Album Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Chidi & Ada's Wedding"
                  className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Department</label>
                <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition">
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Price (₦) *</label>
                <input required type="number" min="1" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="15000"
                  className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Password <span className="text-navy-400 font-normal">(blank = auto-generate)</span></label>
                <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Leave blank to auto-generate"
                  className="w-full border border-black/15 rounded-lg px-4 py-3 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition font-mono" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={creating} className="btn-red disabled:opacity-60">{creating ? "Creating…" : "Create Album"}</button>
              <button type="button" onClick={() => setShowCreate(false)} className="btn-outline">Cancel</button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-navy" size={28} /></div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20 bg-white border border-black/10 rounded-2xl text-navy-400">No albums yet — create one above.</div>
        ) : (
          <div className="space-y-5">
            {albums.map((gallery) => (
              <div key={gallery.id} className="bg-white border border-black/10 rounded-2xl p-7 shadow-sm hover:shadow-card transition-shadow">
                {editingId === gallery.id ? (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">Title</label>
                        <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full border border-black/15 rounded-lg px-3 py-2.5 bg-paper text-sm focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">Department</label>
                        <select value={editForm.department} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                          className="w-full border border-black/15 rounded-lg px-3 py-2.5 bg-paper text-sm focus:outline-none focus:border-red-500">
                          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1.5">Description</label>
                      <textarea rows={2} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full border border-black/15 rounded-lg px-3 py-2.5 bg-paper text-sm focus:outline-none focus:border-red-500" />
                    </div>
                    <div className="max-w-[200px]">
                      <label className="block text-xs font-semibold text-navy mb-1.5">Price (₦)</label>
                      <input type="number" min="1" step="0.01" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full border border-black/15 rounded-lg px-3 py-2.5 bg-paper text-sm focus:outline-none focus:border-red-500" />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={() => handleSaveEdit(gallery)} disabled={savingEdit} className="btn-red !text-[11px] !py-2.5 disabled:opacity-60">{savingEdit ? "Saving…" : "Save Changes"}</button>
                      <button onClick={() => setEditingId(null)} className="btn-outline !text-[11px] !py-2.5"><X size={14} /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-navy">{gallery.title}</h3>
                        {gallery.description && <p className="text-navy-400 text-sm mt-1 max-w-md">{gallery.description}</p>}
                        <div className="flex items-center gap-2 mt-2 text-sm text-navy-400">
                          {gallery.department && (
                            <span className="font-mono text-[10px] tracking-wider uppercase bg-paper-dim text-navy px-2.5 py-1 rounded-full">{gallery.department}</span>
                          )}
                          <span>{gallery.media_count ?? 0} files</span>
                          <span>·</span>
                          <span className="font-semibold text-navy">{koboToNaira(gallery.price)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-paper-dim rounded-lg px-3 py-2.5 font-mono text-sm text-navy">
                          {gallery.password}
                          <button onClick={() => copyPassword(gallery)} className="text-navy-400 hover:text-red-500 transition">{copiedId === gallery.id ? <Check size={14} /> : <Copy size={14} />}</button>
                        </div>
                        <button onClick={() => startEdit(gallery)} className="p-2.5 rounded-lg hover:bg-paper-dim text-navy-400 hover:text-navy transition"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(gallery)} className="p-2.5 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={16} /></button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-5">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-navy cursor-pointer hover:text-red-500 transition">
                        {uploadingId === gallery.id ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {uploadingId === gallery.id ? "Uploading…" : "Upload photos/videos"}
                        <input type="file" multiple accept="image/*,video/*" className="hidden" disabled={uploadingId === gallery.id} onChange={(e) => e.target.files.length && handleUpload(gallery, e.target.files)} />
                      </label>
                      <button onClick={() => toggleMedia(gallery)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-400 hover:text-navy transition">
                        {expandedId === gallery.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {expandedId === gallery.id ? "Hide photos" : "View photos"}
                      </button>
                    </div>

                    {expandedId === gallery.id && (
                      <div className="mt-5 pt-5 border-t border-black/10">
                        {mediaLoadingId === gallery.id ? (
                          <div className="flex justify-center py-8"><Loader2 className="animate-spin text-navy" size={22} /></div>
                        ) : (mediaByGallery[gallery.id] || []).length === 0 ? (
                          <div className="flex flex-col items-center py-10 text-navy-400 text-sm bg-paper-dim rounded-xl">
                            <ImageOff size={24} className="mb-2" />No photos uploaded yet.
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {mediaByGallery[gallery.id].map((m, i) => (
                              <div key={m.id} className="relative group aspect-square rounded-lg overflow-hidden bg-paper-dim">
                                <button
                                  onClick={() => openLightbox(gallery.id, i)}
                                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition duration-300"
                                  style={{ backgroundImage: `url('${m.thumbnailUrl || m.url}')` }}
                                />
                                <button
                                  onClick={() => handleDeleteMedia(gallery.id, m.id)}
                                  disabled={deletingMediaId === m.id}
                                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition disabled:opacity-100"
                                >
                                  {deletingMediaId === m.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && mediaByGallery[lightbox.galleryId]?.[lightbox.index] && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-white/70 hover:text-white"><X size={28} /></button>
          {mediaByGallery[lightbox.galleryId].length > 1 && (
            <button onClick={prevImage} className="absolute left-3 sm:left-8 text-white/70 hover:text-white p-2"><ChevronLeft size={32} /></button>
          )}
          <img
            src={mediaByGallery[lightbox.galleryId][lightbox.index].url}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
          {mediaByGallery[lightbox.galleryId].length > 1 && (
            <button onClick={nextImage} className="absolute right-3 sm:right-8 text-white/70 hover:text-white p-2"><ChevronRight size={32} /></button>
          )}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
            {lightbox.index + 1} / {mediaByGallery[lightbox.galleryId].length}
          </div>
        </div>
      )}
    </section>
  );
}