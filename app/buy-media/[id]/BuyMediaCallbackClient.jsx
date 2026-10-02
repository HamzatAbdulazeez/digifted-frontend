"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import PageBanner from "../../../components/ui/PageBanner";
import api from "../../../lib/apiClient";
import { Copy, Check, Loader2, CheckCircle2, XCircle, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

function CallbackBody() {
  const params = useSearchParams();
  const { id } = useParams();
  const reference = params.get("reference") || params.get("trxref");

  const [state, setState] = useState("verifying");
  const [gallery, setGallery] = useState(null);
  const [media, setMedia] = useState([]);
  const [copied, setCopied] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (reference) {
      // Fresh return from Paystack — verify this specific transaction.
      api.post("/orders/verify", { reference })
        .then(async ({ data }) => {
          setGallery(data.gallery);
          setState("paid");
          try {
            const unlock = await api.post(`/albums/${id}/unlock`, { password: data.gallery.password });
            setMedia(unlock.data.media || []);
          } catch {}
        })
        .catch((err) => {
          if (err.status === 401) { setState("needs-login"); return; }
          setState("failed");
        });
    } else {
      // No reference — this is the "Open Album" link for an album
      // already paid for previously. Just check access directly.
      api.get(`/buy-media/${id}/access`)
        .then(({ data }) => {
          setGallery(data.gallery);
          setMedia(data.media || []);
          setState("paid");
        })
        .catch((err) => {
          if (err.status === 401) { setState("needs-login"); return; }
          setState("failed");
        });
    }
  }, [reference, id]);

  function copyPassword() {
    navigator.clipboard.writeText(gallery?.password || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function openLightbox(i) { setLightboxIndex(i); }
  function closeLightbox() { setLightboxIndex(null); }
  function nextImage(e) { e?.stopPropagation(); setLightboxIndex((i) => (i + 1) % media.length); }
  function prevImage(e) { e?.stopPropagation(); setLightboxIndex((i) => (i - 1 + media.length) % media.length); }

  if (state === "needs-login") {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <p className="text-navy-400 mb-6">You&apos;ll need to be logged in to view this album.</p>
        <Link href={`/login?next=/buy-media/${id}`} className="btn-red">Log In</Link>
      </div>
    );
  }

  if (state === "verifying") {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <Loader2 className="animate-spin text-navy" size={32} />
        <p className="text-navy-400">Loading your album…</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <XCircle className="mx-auto text-red-500 mb-4" size={44} />
        <p className="text-navy font-semibold text-lg mb-2">We couldn&apos;t open this album.</p>
        <p className="text-navy-400 text-sm mb-6">
          If you believe you&apos;ve already paid for this, contact us and we&apos;ll sort it out.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/buy-media" className="btn-outline">Back to Buy Media</Link>
          <Link href="/contact" className="btn-red">Contact Support</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="Resizer mx-auto">
      <div className="bg-gradient-to-br from-navy to-navy-700 rounded-2xl p-10 md:p-12 text-center text-white mb-12 shadow-card">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="text-red-500" size={32} />
        </div>
        <h2 className="font-display font-black text-3xl mb-2">{gallery?.title}</h2>
        <p className="text-white/70 max-w-lg mx-auto mb-6">
          This album is unlocked. Keep this password — it also works to open the album on its own, anytime, or if you
          share it with someone else.
        </p>
        <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 rounded-lg px-5 py-3 font-mono text-lg tracking-wider">
          {gallery?.password}
          <button onClick={copyPassword} className="text-white/60 hover:text-white transition">
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      {media.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-bold text-xl text-navy">Your Album</h3>
            <span className="text-navy-400 text-sm font-mono">{media.length} file{media.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {media.map((m, i) => (
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
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 text-navy-400 bg-paper-dim rounded-md">
          <ImageIcon size={32} className="mb-3" />
          <p>No photos have been uploaded to this album yet — check back soon.</p>
        </div>
      )}

      {lightboxIndex !== null && media[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-white/70 hover:text-white"><X size={28} /></button>
          {media.length > 1 && (
            <button onClick={prevImage} className="absolute left-3 sm:left-8 text-white/70 hover:text-white p-2"><ChevronLeft size={32} /></button>
          )}
          <img src={media[lightboxIndex].url} alt="" onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full rounded-lg object-contain" />
          {media.length > 1 && (
            <button onClick={nextImage} className="absolute right-3 sm:right-8 text-white/70 hover:text-white p-2"><ChevronRight size={32} /></button>
          )}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
            {lightboxIndex + 1} / {media.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BuyMediaCallbackClient() {
  return (
    <>
      <PageBanner crumb="Buy Media" title="Your Album" />
      <section className="py-16 px-6">
        <Suspense fallback={<div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy" size={28} /></div>}>
          <CallbackBody />
        </Suspense>
      </section>
    </>
  );
}