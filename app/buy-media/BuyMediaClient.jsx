"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageBanner from "../../components/ui/PageBanner";
import api from "../../lib/apiClient";
import { Lock, Unlock, Loader2, ImageIcon } from "lucide-react";

function koboToNaira(kobo) { return (kobo / 100).toLocaleString("en-NG", { style: "currency", currency: "NGN" }); }

export default function BuyMediaClient() {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/buy-media").then(({ data }) => setAlbums(data.data || [])).catch(() => setError("Couldn't load albums right now.")).finally(() => setLoading(false));
  }, []);

  async function handleBuy(gallery) {
    setBuyingId(gallery.id);
    setError("");
    try {
      const { data } = await api.post("/orders", { gallery_id: gallery.id });
      window.location.href = data.authorization_url;
    } catch (err) {
      if (err.status === 401) {
        router.push(`/login?next=/buy-media`);
        return;
      }
      if (err.status === 409) {
        router.push(`/buy-media/${gallery.id}`);
        return;
      }
      setError(err.message || "Couldn't start checkout.");
      setBuyingId(null);
    }
  }

  return (
    <>
      <PageBanner crumb="Buy Media" title="Buy Media" desc="Photo and video albums from real Digifted Hub sessions and events — pay once, get the password, open the full album." />
      <section className="py-20">
        <div className="Resizer mx-auto px-6 md:px-8">
          {error && <p className="text-red-500 text-sm mb-8 bg-red-50 border border-red-200 rounded px-4 py-3">{error}</p>}
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-navy" size={28} /></div>
          ) : albums.length === 0 ? (
            <div className="text-center py-20"><ImageIcon className="mx-auto text-navy-200 mb-4" size={40} /><p className="text-navy-400">No albums are listed for sale yet — check back soon.</p></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {albums.map((gallery) => (
                <div key={gallery.id} className="bg-white border border-black/10 rounded-lg overflow-hidden hover:shadow-card transition">
                  <div className="aspect-[4/3] bg-cover bg-center bg-navy relative" style={gallery.coverImage ? { backgroundImage: `url('${gallery.coverImage}')` } : {}}>
                    {!gallery.unlocked && <div className="absolute inset-0 backdrop-blur-sm bg-navy/20" />}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">{gallery.unlocked ? <Unlock size={14} className="text-red-500" /> : <Lock size={14} className="text-navy" />}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-extrabold text-lg text-navy mb-1">{gallery.title}</h3>
                    <p className="text-navy-400 text-sm mb-4">{gallery.department} · {gallery.media_count ?? 0} files</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-red-500 text-xl">{koboToNaira(gallery.price)}</span>
                      {gallery.unlocked ? (
                        <a href={`/buy-media/${gallery.id}`} className="btn-navy !py-2.5 !text-[11px]">Open Album</a>
                      ) : (
                        <button onClick={() => handleBuy(gallery)} disabled={buyingId === gallery.id} className="btn-red !py-2.5 !text-[11px] disabled:opacity-60">{buyingId === gallery.id ? "Redirecting…" : "Unlock Album"}</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-14 bg-paper-dim rounded-lg p-8 text-center max-w-2xl mx-auto">
            <p className="text-navy-400 text-sm">Already have a password from someone who bought an album? <a href="/album" className="text-red-500 font-semibold">Open it here</a> — no account needed.</p>
          </div>
        </div>
      </section>
    </>
  );
}
