"use client";
import { useState } from "react";
import PageBanner from "../../components/ui/PageBanner";
import api from "../../lib/apiClient";
import { Loader2, KeyRound, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function AlbumUnlockClient() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checking | found | error
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("checking");
    setError("");
    try {
      const { data } = await api.post("/albums/unlock", { password });
      setAlbum(data);
      setStatus("found");
    } catch (err) {
      setError(err.message || "That password didn't match any album.");
      setStatus("error");
    }
  }

  function openLightbox(i) { setLightboxIndex(i); }
  function closeLightbox() { setLightboxIndex(null); }
  function nextImage(e) { e?.stopPropagation(); setLightboxIndex((i) => (i + 1) % album.media.length); }
  function prevImage(e) { e?.stopPropagation(); setLightboxIndex((i) => (i - 1 + album.media.length) % album.media.length); }

  return (
    <>
      <PageBanner crumb="Open Album" title="Open Album" desc="Enter the password you were given to view the album — no account needed." />
      <section className="py-16 px-6">
        {status !== "found" ? (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-2xl p-10 flex flex-col items-center text-center gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center">
                <KeyRound size={22} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-navy">Enter your album password</h3>
                <p className="text-navy-400 text-sm mt-1">This is the code you received after purchase.</p>
              </div>
              <input
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. X7K2P9QM"
                className="w-full max-w-xs text-center font-mono text-lg tracking-widest uppercase border border-black/15 rounded-lg px-4 py-3.5 bg-paper focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={status === "checking"} className="btn-red w-full justify-center disabled:opacity-60">
                {status === "checking" ? <Loader2 size={16} className="animate-spin" /> : "Open Album"}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-navy to-navy-700 rounded-2xl p-8 md:p-10 text-center text-white mb-10">
              <h2 className="font-display font-black text-2xl md:text-3xl">{album.title}</h2>
              <p className="text-white/60 text-sm mt-2">
                {album.media.length} file{album.media.length !== 1 ? "s" : ""} in this album
              </p>
            </div>

            {album.media.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-navy-400 bg-paper-dim rounded-2xl">
                <ImageIcon size={36} className="mb-3" />
                <p className="text-lg">No photos uploaded to this album yet.</p>
                <p className="text-sm text-navy-300 mt-1">Check back soon — the password still works whenever they're added.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {album.media.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => openLightbox(i)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-paper-dim shadow-sm hover:shadow-card transition"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition duration-300"
                      style={{ backgroundImage: `url('${m.thumbnailUrl || m.url}')` }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {lightboxIndex !== null && album?.media[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-5 right-5 text-white/70 hover:text-white">
              <X size={28} />
            </button>
            {album.media.length > 1 && (
              <button onClick={prevImage} className="absolute left-3 sm:left-8 text-white/70 hover:text-white p-2">
                <ChevronLeft size={32} />
              </button>
            )}
            <img
              src={album.media[lightboxIndex].url}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
            {album.media.length > 1 && (
              <button onClick={nextImage} className="absolute right-3 sm:right-8 text-white/70 hover:text-white p-2">
                <ChevronRight size={32} />
              </button>
            )}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
              {lightboxIndex + 1} / {album.media.length}
            </div>
          </div>
        )}
      </section>
    </>
  );
}