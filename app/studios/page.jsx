import PageBanner from "../../components/ui/PageBanner";
import SectionHead from "../../components/ui/SectionHead";
import Link from "next/link";
import { Film, Camera, Palette, Mic2, Sparkles, Radio } from "lucide-react";

export const metadata = { title: "Studios — Digifted Hub" };

const services = [
  [Film, "Video Production", "Professional video production services from concept to final delivery, including commercials, documentaries, and corporate videos with cinematic quality."],
  [Camera, "Photography", "Creative photography services for products, events, portraits, and commercial campaigns that capture your brand essence with stunning clarity."],
  [Palette, "Graphic Design", "Stunning visual designs for branding, marketing materials, social media content, and print collateral that make your brand stand out."],
  [Mic2, "Audio Production", "Professional audio recording, mixing, and mastering for podcasts, music, voiceovers, and sound design with crystal-clear quality."],
  [Sparkles, "Animation", "2D and 3D animation services including motion graphics, explainer videos, and character animation that bring your stories to life."],
  [Radio, "Live Streaming", "High-quality live streaming solutions for events, webinars, conferences, and broadcasts with professional multi-camera setups."],
];

const highlights = [
  "4K and 8K video recording capabilities",
  "Professional lighting and grip equipment",
  "Multi-camera live streaming setup",
  "Sound-treated recording rooms",
  "Comfortable client lounge and viewing area",
  "Creative props and backdrops library",
];

const features = [
  ["Professional Equipment", "Latest cameras, lighting systems, and recording gear for premium production quality."],
  ["Versatile Spaces", "Multiple studio rooms designed for different types of shoots and recordings."],
  ["Expert Team", "Talented professionals with years of experience in multimedia production."],
  ["Post-Production Suite", "Advanced editing bays with industry-standard software and hardware."],
  ["Green Screen Studio", "Chroma key capabilities for unlimited creative possibilities."],
  ["Sound Stage", "Acoustically treated spaces for pristine audio recording and production."],
];

export default function StudiosPage() {
  return (
    <>
      <PageBanner
        crumb="Studios"
        title="Digifted Studios"
        desc="Podcast booths, music production, and photoshoot spaces built for creators — equipped with the latest technology."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Our Studio Services" title="Everything under one roof" />
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
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-14 items-center">
          <div className="md:order-2 relative aspect-[4/3] rounded-lg bg-gradient-to-br from-navy to-navy-700 flex items-center justify-center text-white/50 text-sm text-center p-8">
            <div className="absolute top-4 left-4 w-7 h-7 border-t-[3px] border-l-[3px] border-red-500" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-[3px] border-r-[3px] border-red-500" />
            Studio interior photo goes here
          </div>
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-red-500">Studio Highlights</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-navy mt-2 mb-6">Built for serious production</h3>
            <div className="space-y-3.5">
              {highlights.map((h) => (
                <div key={h} className="flex gap-3.5 items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 shrink-0" />
                  <p className="text-navy-400 m-0">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Studio Features & Facilities" title="Why Choose Our Studio?" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(([title, desc]) => (
              <div key={title} className="bg-white border border-black/10 rounded-lg p-8 hover:shadow-card hover:-translate-y-1 transition">
                <h3 className="font-display font-extrabold text-lg text-navy mb-2">{title}</h3>
                <p className="text-navy-400 text-[15px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Why Book With Us" title="Creative Freedom, Latest Technology, Professional Support" light />
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              ["Creative Freedom", "Space and equipment shaped around your vision, not the other way around."],
              ["Latest Technology", "4K/8K cameras and industry-standard gear, always kept current."],
              ["Professional Support", "A crew on hand whenever you need an extra pair of expert hands."],
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
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Ready to book a studio session?</h2>
          <p className="text-white/85 mb-8">Check rental pricing or get a custom quote for your project.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/pricing" className="btn bg-white text-red-500 hover:shadow-lg">See Pricing</Link>
            <Link href="/book-now" className="btn-outline-light">Book Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
