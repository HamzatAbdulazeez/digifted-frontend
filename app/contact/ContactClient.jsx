"use client";
import { useState } from "react";
import PageBanner from "../../components/ui/PageBanner";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import api from "../../lib/apiClient";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/bookings", { ...form, department: "General Enquiry" });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageBanner crumb="Contact Us" title="Get In Touch" desc="Fill out the form and our team will get back to you within 24 hours. We're excited to discuss your project!" />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[0.9fr_1.4fr] gap-14">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4"><span className="rec-dot" />Contact Info</div>
            <h2 className="font-display font-black text-2xl text-navy mb-7">Visit Our Studio</h2>
            {[
              [Phone, "Phone", <a key="p" href="tel:+2349052464819" className="hover:text-red-500">+234 905 246 4819</a>],
              [Mail, "Email", <a key="e" href="mailto:info@digiftedhub.com" className="hover:text-red-500">info@digiftedhub.com</a>],
              [MapPin, "Location", "51, Babaponmile street Onipetes estate Mangoro Ikeja, Lagos State"],
              [Clock, "Working Hours", "Mon - Sat: 9:00 AM - 6:00 PM"],
            ].map(([Icon, title, value], i) => (
              <div key={i} className="flex gap-4 items-start mb-6">
                <div className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center shrink-0"><Icon size={18} /></div>
                <div><h4 className="font-display font-bold text-navy text-[15.5px] mb-0.5">{title}</h4><p className="text-navy-400 text-[15px] m-0">{value}</p></div>
              </div>
            ))}
            <div className="mt-8 pt-6 border-t border-black/10 space-y-3">
              {["Quick response time", "Free consultation and quote", "Professional and friendly team"].map((t) => (
                <div key={t} className="flex items-center gap-2.5 text-navy-400 text-sm"><CheckCircle2 size={16} className="text-red-500 shrink-0" /> {t}</div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-black/10 rounded-lg p-8 md:p-10">
            <h3 className="font-display font-bold text-navy text-xl mb-6">Send Us a Message</h3>
            {status === "sent" ? (
              <div className="text-center py-10"><CheckCircle2 size={40} className="text-red-500 mx-auto mb-4" /><p className="text-navy font-semibold">Message sent — we&apos;ll be in touch within 24 hours.</p></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold text-navy mb-2">Full Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
                  <div><label className="block text-sm font-semibold text-navy mb-2">Email Address *</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-navy mb-2">Phone Number</label><input type="tel" placeholder="+234 XXX XXX XXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
                <div><label className="block text-sm font-semibold text-navy mb-2">Message *</label><textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-black/15 rounded px-4 py-3 bg-paper focus:outline-none focus:border-red-500" /></div>
                {status === "error" && <p className="text-red-500 text-sm">Something went wrong — please try again or call us directly at +234 905 246 4819.</p>}
                <button type="submit" disabled={status === "sending"} className="btn-red disabled:opacity-60">{status === "sending" ? "Sending…" : "Send Message"}</button>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4"><span className="rec-dot" />Find Us</div>
          <h2 className="font-display font-black text-3xl text-navy mb-3">Come see the studio</h2>
          <p className="text-navy-400 max-w-lg mb-8">Our studio is located in the heart of Ikeja, Lagos. Visit us at Onipetesi Estate to discuss your project and see our facilities firsthand.</p>
          <div className="aspect-[21/8] rounded-lg bg-gradient-to-br from-navy to-navy-700 flex items-center justify-center text-white/60 text-sm text-center p-6">Map embed goes here — 51, Babaponmile Street, Onipetesi Estate, Mangoro, Ikeja, Lagos State</div>
        </div>
      </section>
    </>
  );
}
