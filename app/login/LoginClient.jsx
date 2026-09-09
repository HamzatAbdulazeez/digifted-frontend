"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";
import { saveSession } from "../../lib/auth";
import PageBanner from "../../components/ui/PageBanner";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/buy-media";

  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", password_confirmation: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const path = mode === "login" ? "/login" : "/register";
      const payload = mode === "login"
        ? { email: form.email, password: form.password }
        : form;
      const { data } = await api.post(path, payload);
      saveSession(data.user, data.token);
      router.push(next);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong — check your details and try again.");
      setStatus("idle");
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white border border-black/10 rounded-lg p-8">
          <div className="flex gap-2 mb-8 bg-paper-dim rounded-full p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${mode === "login" ? "bg-navy text-white" : "text-navy-400"}`}
            >
              Log In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${mode === "register" ? "bg-navy text-white" : "text-navy-400"}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
            </div>
            {mode === "register" && (
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Phone Number</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Password</label>
              <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
            </div>
            {mode === "register" && (
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Confirm Password</label>
                <input required type="password" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                  className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={status === "sending"} className="btn-red w-full justify-center disabled:opacity-60">
              {status === "sending" ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-navy-400 mt-6">
          Looking to manage albums instead? <Link href="/staff/login" className="text-red-500 font-semibold">Staff login →</Link>
        </p>
      </div>
    </section>
  );
}

export default function LoginClient() {
  return (
    <>
      <PageBanner crumb="Login" title="Your Account" desc="Log in or create an account to buy and unlock media albums." />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </>
  );
}
