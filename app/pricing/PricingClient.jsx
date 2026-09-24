"use client";
import { useState } from "react";
import PageBanner from "../../components/ui/PageBanner";
import SectionHead from "../../components/ui/SectionHead";
import Link from "next/link";
import { Camera, Video, Mic, Radio, Users } from "lucide-react";

const CATEGORIES = [
  { id: "photography", name: "Photography", icon: Camera }, { id: "videography", name: "Videography", icon: Video },
  { id: "podcast", name: "Podcast", icon: Mic }, { id: "streaming", name: "Live Streaming", icon: Radio }, { id: "spaces", name: "Spaces", icon: Users },
];
const PRICES = {
  photography: [
    { name: "Birthday/Portrait/Branding", details: "Professional in-studio birthday, corporate headshots, team photos, and personal branding. (4 edited images)", regular: "₦55,000", discounted: "₦50,000", unit: "per session", featured: true },
    { name: "Event Photography", details: "Corporate events, launches, weddings, and seminars. Basic editing & high-res digital delivery.", regular: "₦60,000", discounted: "₦50,000", unit: "per hour" },
    { name: "Product Photography", details: "Crisp images for e-commerce and marketing (max 5 products per hour). Clean 4 edited images.", regular: "₦50,000", discounted: "₦45,000", unit: "per session" },
    { name: "Newborn Photography", details: "Clean 4 edited images for a newborn.", regular: "₦65,000", discounted: "₦50,000", unit: "per session" },
  ],
  videography: [
    { name: "Event Videography", details: "Single-camera coverage. Includes basic color grading & a highlight reel.", regular: "₦60,000", discounted: "₦50,000", unit: "per hour", featured: true },
    { name: "Corporate Videography", details: "Promotional videos, interviews, and testimonials. Includes 2 edited videos.", regular: "₦50,000", discounted: "₦45,000", unit: "per hour" },
    { name: "Social Media Clips", details: "Short-form, dynamic video content optimized for platforms like Instagram & TikTok. (3 videos max)", regular: "₦40,000", discounted: "₦30,000", unit: "per session" },
  ],
  podcast: [
    { name: "Self-Service Studio", details: "You operate the mic, mixer, and recording software with basic assistance.", regular: "₦30,000", discounted: "₦20,000", unit: "per session" },
    { name: "Full-Service Studio", details: "A dedicated camera/audio engineer for visual recording and mixing.", regular: "₦65,000", discounted: "₦50,000", unit: "per session", featured: true },
  ],
  streaming: [{ name: "Event Livestream", details: "1x 4K camera, audio mixing, and streaming to 1 platform (YouTube, Facebook, Zoom, etc).", regular: "₦85,000", discounted: null, unit: "per day", featured: true }],
  spaces: [{ name: "Office/Training Room Rental", details: "Seats up to 10 people. Smart TV & whiteboard included.", regular: "₦40,000", discounted: null, unit: "per day", featured: true }],
};

function PriceCard({ p }) {
  return (
    <div className={`relative bg-white border rounded-lg p-7 ${p.featured ? "border-red-500" : "border-black/10"}`}>
      {p.featured && <span className="absolute -top-3 right-5 bg-red-500 text-white font-mono text-[11px] px-3 py-1 rounded-full tracking-wide">Popular</span>}
      <h4 className="font-display font-extrabold text-navy text-lg mb-2">{p.name}</h4>
      <p className="text-navy-400 text-[14.5px] mb-5">{p.details}</p>
      <div className="flex items-baseline gap-3 flex-wrap">
        {p.discounted && <span className="text-navy-400 line-through text-sm">{p.regular}</span>}
        <span className="font-display font-black text-2xl text-red-500">{p.discounted || p.regular}</span>
        <span className="text-navy-400 text-xs">{p.unit}</span>
      </div>
    </div>
  );
}

export default function PricingClient() {
  const [active, setActive] = useState("photography");
  return (
    <>
      <PageBanner crumb="Rental Pricing" title="Transparent, per-session pricing" desc="No hidden fees. Discounted rates shown for bulk bookings and returning clients." />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <button key={c.id} onClick={() => setActive(c.id)} className={`flex items-center gap-2 font-mono text-xs tracking-wide uppercase px-5 py-3 rounded-full border transition ${active === c.id ? "bg-navy text-white border-navy" : "border-black/15 text-navy-400 hover:border-navy"}`}>
                  <Icon size={15} /> {c.name}
                </button>
              );
            })}
          </div>
          <div className="grid sm:grid-cols-2 gap-6">{PRICES[active].map((p) => <PriceCard key={p.name} p={p} />)}</div>
        </div>
      </section>
      <section className="py-24 bg-paper-dim">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Important Pricing Information" title="What to know before you book" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[["Discounted Rates", "Available for bulk bookings and returning clients."], ["Session Duration", "Sessions are typically 2-4 hours depending on service."], ["Delivery Time", "Edited content delivered within 5-7 business days."], ["Booking Deposit", "50% deposit required to secure your booking."]].map(([title, desc]) => (
              <div key={title} className="bg-white rounded-lg p-6"><h4 className="font-display font-bold text-navy mb-1.5">{title}</h4><p className="text-navy-400 text-sm">{desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid sm:grid-cols-3 gap-8">
          {[["No Hidden Fees", "What you see is what you pay."], ["Premium Quality", "Professional results every time."], ["Flexible Packages", "Customizable to your needs."]].map(([title, desc]) => (
            <div key={title} className="border-t-2 border-navy pt-5"><h4 className="font-display font-extrabold text-navy text-lg mb-2">{title}</h4><p className="text-navy-400 text-sm">{desc}</p></div>
          ))}
        </div>
      </section>
      <section className="bg-red-500 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Ready to book?</h2>
          <p className="text-white/85 mb-8">Call us directly or send a booking request — Book Now: +234 905 246 4819</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+2349052464819" className="btn bg-white text-red-500 hover:shadow-lg">Call to Book</a>
            <Link href="/book-now" className="btn-outline-light">Book Online</Link>
          </div>
        </div>
      </section>
    </>
  );
}
