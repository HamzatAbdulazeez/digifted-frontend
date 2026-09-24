"use client";
import { useState } from "react";
import PageBanner from "../../components/ui/PageBanner";
import api from "../../lib/apiClient";
import { Loader2, KeyRound } from "lucide-react";

export default function AlbumUnlockClient() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState("");

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

  return (
    <>
      <PageBanner crumb="Open Album" title="Open Album" desc="Enter the password you were given to view the album — no account needed." />
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {status !== "found" && (
            <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-lg p-8 flex flex-col items-center text-center gap-5">
              <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center"><KeyRound size={20} /></div>
              <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter album password" className="w-full max-w-xs text-center font-mono text-lg border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={status === "checking"} className="btn-red disabled:opacity-60">{status === "checking" ? <Loader2 size={16} className="animate-spin" /> : "Open Album"}</button>
            </form>
          )}
          {status === "found" && album && (
            <div>
              <h2 className="font-display font-black text-2xl text-navy mb-6 text-center">{album.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {album.media.map((m) => <div key={m.id} className="aspect-square rounded-lg bg-cover bg-center bg-paper-dim" style={{ backgroundImage: `url('${m.thumbnailUrl || m.url}')` }} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
