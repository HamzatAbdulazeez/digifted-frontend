"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import { saveSession } from "../../../lib/auth";
import PageBanner from "../../../components/ui/PageBanner";
import { ShieldCheck } from "lucide-react";

export default function StaffLoginClient() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const { data } = await api.post("/login", form);
      const staff = data.user?.roles?.some((r) => r.name === "staff");
      if (!staff) {
        setError("This account doesn't have staff access.");
        setStatus("idle");
        return;
      }
      saveSession(data.user, data.token);
      router.push("/staff/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials.");
      setStatus("idle");
    }
  }

  return (
    <>
      <PageBanner crumb="Staff Login" title="Staff Login" desc="For Digifted Hub staff uploading and managing media albums." />
      <section className="py-20">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white border border-black/10 rounded-lg p-8">
            <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center mb-6">
              <ShieldCheck size={20} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Password</label>
                <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={status === "sending"} className="btn-navy w-full justify-center disabled:opacity-60">
                {status === "sending" ? "Signing in…" : "Sign In"}
              </button>
            </form>
            <p className="text-xs text-navy-400 mt-6 text-center">
              First deploy? A default account is seeded by <code className="bg-paper-dim px-1.5 py-0.5 rounded">StaffUserSeeder</code> —
              staff@digiftedhub.com — change its password immediately after first login.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
