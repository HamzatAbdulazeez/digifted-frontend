import PageBanner from "../../components/ui/PageBanner";
import SectionHead from "../../components/ui/SectionHead";
import Link from "next/link";

export const metadata = { title: "Our Services — Digifted Hub" };

const departments = [
  { tag: "STU", title: "Digifted Studios", subtitle: "Audio-Visual & Photography", tagline: "Create. Capture. Inspire.",
    desc: "Our studio spaces are designed for creators, podcasters, photographers, and musicians.",
    closing: "Your creative home — powered by technology and passion.",
    features: [["Studio Rentals", "Flexible hourly or daily bookings, podcast booths, and equipment-only rentals."],
      ["Audio & Video Recording", "Capture podcasts, music sessions, voiceovers, and professional videos with our advanced 4K cameras and sound systems."],
      ["Photoshoots", "From headshots to editorial and product photography — get clean, well-lit, and industry-standard visuals."]] },
  { tag: "LIV", title: "Digifted Live & Events", subtitle: "Live Streaming & Event Coverage", tagline: "Broadcast Your Moment to the World.",
    desc: "We cover your events with clarity and creativity — online and on-site.",
    closing: "From stage to screen — we make your moments unforgettable.",
    features: [["Live Streaming", "Seamless multi-camera livestreams for conferences, concerts, and religious events."],
      ["Event Coverage", "Professional videography, photography, and drone footage that capture every emotion and highlight."],
      ["Documentary Features", "Transform your event into a story worth rewatching."]] },
  { tag: "COR", title: "Digifted Corporate Solutions", subtitle: "Business-Focused Media", tagline: "Your Partner in Professional Communication.",
    desc: "We help businesses build stronger brand identities through media and communication solutions.",
    closing: "Where creativity meets corporate professionalism.",
    features: [["Corporate Spaces", "Book executive meeting or training spaces with full multimedia support."],
      ["Brand & Product Videos", "Create engaging commercials and promotional clips that showcase your brand's story."],
      ["Documentary Ads", "Transform your business journey into visual storytelling that sells."]] },
  { tag: "DIG", title: "Digifted Digital Marketing", subtitle: "Online Growth & Branding", tagline: "Grow Your Brand's Digital Footprint.",
    desc: "Our digital marketing experts help brands stay relevant and visible online.",
    closing: "We don't just post — we position your brand for impact.",
    features: [["Social Media Management", "Strategy, content planning, and daily engagement."],
      ["Paid Ad Campaigns", "Eye-catching social media ads optimized for TikTok, Instagram, and YouTube."],
      ["Analytics & Reporting", "Track performance and make data-driven marketing decisions."]] },
  { tag: "CRE", title: "Digifted Creative Services", subtitle: "Post-Production & Content Creation", tagline: "Where Good Content Becomes Great.",
    desc: "Our creative finishing team polishes your content to perfection.",
    closing: "The final touch that makes your content stand out.",
    features: [["Video & Audio Editing", "Industry-standard post-production with cinematic precision."],
      ["Photo Retouching & Manipulation", "Enhance your visuals for social media or brand use."],
      ["Sound Engineering & Mastering", "Professional-grade mixing and mastering for music, film, and ads."]] },
];

function DeptBlock({ d, reverse, bg }) {
  return (
    <section className={bg}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div className={`relative aspect-[4/3] rounded-lg bg-gradient-to-br from-navy to-navy-700 flex items-center justify-center text-white/50 text-sm text-center p-8 ${reverse ? "md:order-2" : ""}`}>
          <div className="absolute top-4 left-4 w-7 h-7 border-t-[3px] border-l-[3px] border-red-500" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-[3px] border-r-[3px] border-red-500" />
          <span className="absolute top-4 left-16 font-mono text-white text-xs">{d.tag}</span>
          {d.title} photo goes here
        </div>
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-red-500">{d.subtitle}</span>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-navy mt-2 mb-4">{d.tagline}</h3>
          <p className="text-navy-400 mb-7">{d.desc}</p>
          <div className="space-y-4">
            {d.features.map(([title, desc]) => (
              <div key={title} className="flex gap-3.5">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 shrink-0" />
                <div><h4 className="font-semibold text-navy text-[15.5px]">{title}</h4><p className="text-navy-400 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>
          <p className="text-navy font-semibold italic mt-6">{d.closing}</p>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageBanner crumb="Our Services" title={<>Five departments.<br />One creative ecosystem.</>} desc="From studio rentals to full digital campaigns — explore what each Digifted Hub department can do for you." />
      {departments.map((d, i) => <DeptBlock key={d.tag} d={d} reverse={i % 2 === 1} bg={i % 2 === 0 ? "bg-paper" : "bg-paper-dim"} />)}
      <section className="py-24 bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Why Digifted" title="Premium Quality, Every Time" light center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[["Premium Quality", "Industry-standard equipment and expert professionals."], ["Fast Turnaround", "Efficient processes without compromising quality."],
              ["Dedicated Support", "Personalized service from consultation to delivery."], ["Creative Excellence", "Innovative solutions that make you stand out."]].map(([title, desc]) => (
              <div key={title} className="border-t-2 border-red-500 pt-5"><h4 className="font-display font-bold mb-1.5">{title}</h4><p className="text-white/60 text-sm">{desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-red-500 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Not sure which department fits?</h2>
          <p className="text-white/85 mb-8">Tell us what you&apos;re working on and we&apos;ll point you to the right team.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-now" className="btn bg-white text-red-500 hover:shadow-lg">Get a Quote</Link>
            <Link href="/pricing" className="btn-outline-light">See Pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
