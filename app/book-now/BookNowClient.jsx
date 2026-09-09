"use client";
import { useState } from "react";
import PageBanner from "../../components/ui/PageBanner";
import { CheckCircle2 } from "lucide-react";
import api from "../../lib/api";

const DEPARTMENTS = ["Studios", "Live & Events", "Business Solutions", "Digital Marketing", "Creative Services"];

export default function BookNowClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: DEPARTMENTS[0], preferred_date: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/bookings", form);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageBanner
        crumb="Book Now"
        title="Book Now"
        desc="Tell us what you need — a member of our team will confirm availability and follow up directly."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[0.9fr_1.4fr] gap-14">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4">
              <span className="rec-dot" />Quick Booking
            </div>
            <h2 className="font-display font-black text-2xl text-navy mb-4">Prefer to talk it through?</h2>
            <p className="text-navy-400 mb-6">Call us directly and we&apos;ll walk you through availability and pricing.</p>
            <a href="tel:+2349052464819" className="btn-navy">Call +234 905 246 4819</a>
          </div>

          <div className="bg-white border border-black/10 rounded-lg p-8 md:p-10">
            <h3 className="font-display font-bold text-navy text-xl mb-6">Request a Booking</h3>
            {status === "sent" ? (
              <div className="text-center py-10">
                <CheckCircle2 size={40} className="text-red-500 mx-auto mb-4" />
                <p className="text-navy font-semibold">Request received — we&apos;ll confirm your booking shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Full Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Email Address *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Department</label>
                    <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500">
                      {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Preferred Date</label>
                    <input type="date" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                      className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Details</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" />
                </div>
                {status === "error" && <p className="text-red-500 text-sm">Couldn&apos;t reach the server — check NEXT_PUBLIC_API_URL, or call us directly.</p>}
                <button type="submit" disabled={status === "sending"} className="btn-navy disabled:opacity-60">
                  {status === "sending" ? "Submitting…" : "Submit Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
