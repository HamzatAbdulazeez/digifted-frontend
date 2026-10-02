"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageBanner from "../../components/ui/PageBanner";
import api from "../../lib/apiClient";
import { Lock, Unlock, Loader2, ImageIcon, KeyRound, ArrowRight, Sparkles } from "lucide-react";

function koboToNaira(kobo) { return (kobo / 100).toLocaleString("en-NG", { style: "currency", currency: "NGN" }); }

function SkeletonCard() {
  return (
    <div className="bg-white border border-black/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-paper-dim" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-paper-dim rounded w-3/4" />
        <div className="h-3 bg-paper-dim rounded w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-paper-dim rounded w-20" />
          <div className="h-8 bg-paper-dim rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export default function BuyMediaClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/auth/me").then(({ data }) => setUser(data.user)).catch(() => { });
    api.get("/buy-media").then(({ data }) => setAlbums(data.data || [])).catch(() => setError("Couldn't load albums right now.")).finally(() => setLoading(false));
  }, []);

  async function handleBuy(gallery) {
    setBuyingId(gallery.id);
    setError("");
    try {
      const { data } = await api.post("/orders", { gallery_id: gallery.id });
      window.location.href = data.authorization_url;
    } catch (err) {
      if (err.status === 401) { router.push(`/login?next=/buy-media`); return; }
      if (err.status === 409) { router.push(`/buy-media/${gallery.id}`); return; }
      setError(err.message || "Couldn't start checkout.");
      setBuyingId(null);
    }
  }

  const unlockedCount = albums.filter((a) => a.unlocked).length;

  return (
    <>
      <PageBanner
        crumb="Buy Media"
        title="Buy Media"
        desc="Photo and video albums from real Digifted Hub sessions and events — pay once, get the password, open the full album."
      />

      <section className="py-16">
        <div className="Resizer mx-auto px-6 md:px-8">
          {user && (
            <div className="flex items-center gap-4 bg-gradient-to-r from-navy to-navy-700 text-white rounded-2xl px-7 py-5 mb-10">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Sparkles size={18} />
              </div>
              <p className="text-sm">
                Welcome back, <b>{user.name?.split(" ")[0]}</b>.
                {unlockedCount > 0
                  ? ` You have ${unlockedCount} unlocked album${unlockedCount !== 1 ? "s" : ""} below.`
                  : " Browse available albums below — unlocked ones you've paid for will appear with an open-lock icon."}
              </p>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mb-8 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-24 bg-paper-dim rounded-2xl">
              <ImageIcon className="mx-auto text-navy-200 mb-4" size={44} />
              <p className="text-navy-400 text-lg">No albums are listed for sale yet.</p>
              <p className="text-navy-300 text-sm mt-1">Check back soon, or ask us directly about your session.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {albums.map((gallery) => (
                <div
                  key={gallery.id}
                  className="group bg-white border border-black/10 rounded-2xl overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="aspect-[4/3] bg-cover bg-center bg-gradient-to-br from-navy to-navy-700 relative overflow-hidden"
                    style={gallery.coverImage ? { backgroundImage: `url('${gallery.coverImage}')` } : {}}
                  >
                    {!gallery.unlocked && (
                      <>
                        <div className="absolute inset-0 backdrop-blur-md bg-navy/30 group-hover:backdrop-blur-sm transition-all duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm">
                            <Lock size={20} className="text-white" />
                          </div>
                        </div>
                      </>
                    )}
                    {gallery.unlocked && (
                      <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
                        <Unlock size={15} className="text-red-500" />
                      </div>
                    )}
                    {gallery.department && (
                      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider uppercase bg-white/90 text-navy px-2.5 py-1 rounded-full">
                        {gallery.department}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-extrabold text-lg text-navy mb-1 leading-snug">{gallery.title}</h3>
                    <p className="text-navy-400 text-sm mb-5">{gallery.media_count ?? 0} file{gallery.media_count !== 1 ? "s" : ""}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-red-500 text-xl">{koboToNaira(gallery.price)}</span>
                      {gallery.unlocked ? (
                        <a href={`/buy-media/${gallery.id}`} className="btn-navy !py-2.5 !text-[11px] gap-1.5">
                          Open <ArrowRight size={13} />
                        </a>
                      ) : (
                        <button onClick={() => handleBuy(gallery)} disabled={buyingId === gallery.id} className="btn-red !py-2.5 !text-[11px] disabled:opacity-60">
                          {buyingId === gallery.id ? "Redirecting…" : "Unlock Album"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 flex items-center gap-4 bg-paper-dim rounded-2xl p-7 max-w-2xl mx-auto">
            <div className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center shrink-0">
              <KeyRound size={18} />
            </div>
            <p className="text-navy-400 text-sm">
              Already have a password from someone who bought an album?{" "}
              <a href="/album" className="text-red-500 font-semibold underline">Open it here</a> 
            </p>
          </div>
        </div>
      </section>
    </>
  );
}