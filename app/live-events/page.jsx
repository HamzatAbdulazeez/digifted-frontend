import PageBanner from "../../components/ui/PageBanner";
import SectionHead from "../../components/ui/SectionHead";
import Link from "next/link";
import { Radio, Video, Volume2, Shuffle, Mic2, Award } from "lucide-react";

export const metadata = { title: "Live & Events — Digifted Hub" };

const services = [
  [Radio, "Live Streaming", "Professional multi-camera live streaming for conferences, webinars, product launches, and corporate events with real-time engagement."],
  [Video, "Event Coverage", "Complete event documentation with photography and videography services that capture every important moment beautifully."],
  [Volume2, "Audio & Stage Management", "Professional sound engineering, stage setup, and technical management for flawless event execution."],
  [Shuffle, "Hybrid Events", "Seamlessly blend in-person and virtual experiences with our hybrid event solutions for maximum reach and engagement."],
  [Mic2, "Concerts & Performances", "Full production services for concerts, shows, and live performances with professional lighting and sound design."],
  [Award, "Awards & Ceremonies", "Elegant production for award ceremonies, galas, and corporate celebrations that create memorable experiences."],
];

const events = [
  ["Corporate Events", "Conferences, seminars, AGMs, and corporate gatherings."],
  ["Product Launches", "Impactful unveilings that generate buzz and excitement."],
  ["Concerts & Shows", "Musical performances and entertainment events."],
  ["Weddings & Celebrations", "Personal milestones captured with elegance and style."],
  ["Sports Events", "Live coverage and broadcasting of sporting competitions."],
  ["Virtual Events", "Engaging online experiences and webinars."],
];

export default function LiveEventsPage() {
  return (
    <>
      <PageBanner
        crumb="Live & Events"
        title="Digifted Live & Events"
        desc="Multi-camera livestreaming and full event coverage, on-site and online — from stage to screen."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Our Event Services" title="Coverage that captures every moment" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(([Icon, title, desc]) => (
              <div key={title} className="bg-white border border-black/10 rounded-lg p-8 hover:shadow-card hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-extrabold text-lg text-navy mb-2">{title}</h3>
                <p className="text-navy-400 text-[15px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-paper-dim">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Events We Cover" title="Every kind of moment, covered" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map(([title, desc]) => (
              <div key={title} className="bg-white border border-black/10 rounded-lg p-6">
                <h4 className="font-display font-extrabold text-navy text-[16.5px] mb-1.5">{title}</h4>
                <p className="text-navy-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Why Digifted Hub" title="Why Choose Digifted Hub for Your Events?" light />
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              ["Technical Excellence", "Broadcast-grade equipment and a crew that knows how to run it under pressure."],
              ["Expert Team", "Producers and technicians who've covered everything from AGMs to concerts."],
              ["Proven Track Record", "A track record of flawless execution across dozens of live events."],
            ].map(([title, desc]) => (
              <div key={title} className="border-t-2 border-red-500 pt-5">
                <h4 className="font-display font-bold mb-1.5">{title}</h4>
                <p className="text-white/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-500 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Planning an event?</h2>
          <p className="text-white/85 mb-8">Let&apos;s talk coverage, streaming, and production — well ahead of your date.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-now" className="btn bg-white text-red-500 hover:shadow-lg">Get a Quote</Link>
            <Link href="/contact" className="btn-outline-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
