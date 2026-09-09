"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import PageBanner from "../../../components/ui/PageBanner";
import api from "../../../lib/api";
import { getToken } from "../../../lib/auth";
import { Copy, Check, Loader2, CheckCircle2, XCircle } from "lucide-react";

function CallbackBody() {
  const params = useSearchParams();
  const { id } = useParams();
  const reference = params.get("reference") || params.get("trxref");

  const [state, setState] = useState("verifying"); // verifying | paid | failed | needs-login
  const [gallery, setGallery] = useState(null);
  const [media, setMedia] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      setState("needs-login");
      return;
    }
    if (!reference) {
      setState("failed");
      return;
    }
    api.post("/orders/verify", { reference })
      .then(async ({ data }) => {
        setGallery(data.gallery);
        setState("paid");
        // Immediately open the album using the password we just got back —
        // no need to make the customer type it in themselves.
        try {
          const unlock = await api.post(`/albums/${id}/unlock`, { password: data.gallery.password });
          setMedia(unlock.data.media || []);
        } catch {
          // Non-fatal — they still have the password shown below.
        }
      })
      .catch(() => setState("failed"));
  }, [reference, id]);

  function copyPassword() {
    navigator.clipboard.writeText(gallery?.password || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (state === "needs-login") {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <p className="text-navy-400 mb-6">You&apos;ll need to be logged in to verify this payment.</p>
        <Link href={`/login?next=/buy-media/${id}`} className="btn-red">Log In</Link>
      </div>
    );
  }

  if (state === "verifying") {
    return (
      <div className="flex flex-col items-center py-16 gap-4">
        <Loader2 className="animate-spin text-navy" size={32} />
        <p className="text-navy-400">Confirming your payment with Paystack…</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <XCircle className="mx-auto text-red-500 mb-4" size={40} />
        <p className="text-navy font-semibold mb-2">We couldn&apos;t confirm this payment.</p>
        <p className="text-navy-400 text-sm mb-6">If you were charged, contact us with your reference and we&apos;ll sort it out.</p>
        <Link href="/contact" className="btn-outline">Contact Support</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <CheckCircle2 className="mx-auto text-red-500 mb-4" size={40} />
        <h2 className="font-display font-black text-2xl text-navy mb-2">Payment confirmed</h2>
        <p className="text-navy-400">
          <b className="text-navy">{gallery?.title}</b> is unlocked. Keep this password — it also works to open the album on its own, anytime, or if you share it.
        </p>
        <div className="inline-flex items-center gap-3 bg-white border border-black/10 rounded-lg px-5 py-3 mt-5 font-mono text-lg text-navy">
          {gallery?.password}
          <button onClick={copyPassword} className="text-navy-400 hover:text-red-500">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {media.map((m) => (
            <div key={m.id} className="aspect-square rounded-lg bg-cover bg-center bg-paper-dim" style={{ backgroundImage: `url('${m.thumbnail_url || m.url}')` }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BuyMediaCallbackClient() {
  return (
    <>
      <PageBanner crumb="Buy Media" title="Your Album" />
      <section className="py-20 px-6">
        <Suspense fallback={<div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy" size={28} /></div>}>
          <CallbackBody />
        </Suspense>
      </section>
    </>
  );
}
