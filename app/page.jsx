import Link from "next/link";
import { Play, ArrowRight, ArrowUpRight } from "lucide-react";
import HeroSlider from "../components/home/HeroSlider";

// ---- Just swap these links for your real photos/footage stills ----
const IMAGES = {
  hero: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760531013/DigiftedHub/Rectangle_26_1_medy49.jpg",
  heroSecondary: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760530781/DigiftedHub/Rectangle_28_gucl5p.jpg",
  bento1: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760531013/DigiftedHub/Rectangle_26_1_medy49.jpg",
  bento2: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760530781/DigiftedHub/Rectangle_28_gucl5p.jpg",
  bento3: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760530681/DigiftedHub/Rectangle_27_z7ylgv.jpg",
  bento4: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760373483/DigiftedHub/Rectangle_14_1_y7vwep.jpg",
  bento5: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760531013/DigiftedHub/Rectangle_26_1_medy49.jpg",
};

const departments = [
  { tag: "01", code: "STU", title: "Studios", href: "/studios", desc: "Podcast, photo & video spaces with 4K recording, built for creators." },
  { tag: "02", code: "LIV", title: "Live & Events", href: "/live-events", desc: "Multi-camera livestreaming and full event coverage, on-site and online." },
  { tag: "03", code: "COR", title: "Business Solutions", href: "/business-solutions", desc: "Executive spaces, brand videos and documentary ads for growing businesses." },
  { tag: "04", code: "DIG", title: "Digital Marketing", href: "/services", desc: "Social strategy, paid ads and analytics that grow your digital footprint." },
  { tag: "05", code: "CRE", title: "Creative Services", href: "/services", desc: "Editing, retouching and mastering that turns good content into great." },
];

const stats = [["100+", "Projects shipped"], ["5+", "Years in business"], ["25+", "Creative experts"], ["100%", "Lagos-based crew"]];

const testimonials = [
  { name: "Adeyemi Johnson", role: "Client", text: "Digifted Hub exceeded my expectations. The studio setup is top-notch, and the team is highly professional." },
  { name: "Blessing Okafor", role: "Client", text: "Clean environment, quality equipment, and excellent customer service. Digifted Hub truly understands creatives." },
  { name: "Samuel Adebayo", role: "Client", text: "From recording to final delivery, everything was seamless. The sound quality was amazing." },
  { name: "Khadijat Bello", role: "Client", text: "One of the best creative studios in Lagos. Affordable, well-equipped, and very welcoming." },
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* ---------- MARQUEE STRIP ---------- */}
      <div className="bg-navy-700 py-4 overflow-hidden mt-10 md:mt-14">
        <div className="flex gap-10 whitespace-nowrap animate-[marquee_28s_linear_infinite]">
          {[...Array(2)].map((_, loop) => (
            <div key={loop} className="flex gap-10 shrink-0">
              {["STUDIOS", "LIVE & EVENTS", "BUSINESS SOLUTIONS", "DIGITAL MARKETING", "CREATIVE SERVICES"].map((t) => (
                <span key={t} className="font-display font-black text-3xl md:text-4xl text-white/15 tracking-tight flex items-center gap-10">
                  {t} <span className="text-red-500/70 text-xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

      {/* ---------- DEPARTMENTS — numbered list, not a grid ---------- */}
      <section className="py-24 md:py-32">
        <div className="Resizer mx-auto px-6 md:px-8">
          <div className="max-w-xl mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4">What we do</div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-navy">Five departments, one ecosystem.</h2>
          </div>

          <div className="border-t border-black/10">
            {departments.map((d) => (
              <Link
                key={d.code}
                href={d.href}
                className="group grid md:grid-cols-12 items-center gap-4 py-7 md:py-9 border-b border-black/10 hover:bg-paper-dim/60 transition-colors px-2 md:px-4 -mx-2 md:-mx-4 rounded-xl"
              >
                <span className="md:col-span-1 font-mono text-sm text-red-500">{d.tag}</span>
                <span className="md:col-span-4 font-display font-black text-2xl md:text-4xl text-navy group-hover:text-red-500 transition-colors">
                  {d.title}
                </span>
                <span className="md:col-span-6 text-navy-400 text-sm md:text-base">{d.desc}</span>
                <span className="md:col-span-1 flex md:justify-end">
                  <ArrowUpRight size={22} className="text-navy-300 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="relative bg-navy text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/10 blur-[100px] rounded-full" />

        <div className="relative Resizer mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4 justify-center">
              <span className="rec-dot" />By The Numbers
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl">Five years of showing up.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map(([num, label], i) => (
              <div key={label} className="bg-navy px-6 py-10 text-center hover:bg-navy-600 transition-colors">
                <div className="font-display font-black text-4xl md:text-5xl text-white">
                  {num}
                </div>
                <div className="w-8 h-0.5 bg-red-500 mx-auto my-3" />
                <div className="text-white/60 text-sm font-mono tracking-wide uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ON AIR ---------- */}
      {/* ---------- ON AIR ---------- */}
      <section className="relative bg-navy-700 text-white py-24 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full" />

        <div className="relative Resizer mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4">
                <span className="rec-dot" />On Air
              </div>
              <h2 className="font-display font-black text-3xl md:text-5xl">Watch us in action.</h2>
              <p className="text-white/60 mt-3 text-lg">Behind-the-scenes footage, client shoots and event highlights — straight from our channel.</p>
            </div>
            <a
              href="https://www.youtube.com/@DigiftedStudio"
              target="_blank" rel="noopener noreferrer"
              className="btn-red shrink-0"
            >
              Subscribe on YouTube
            </a>
          </div>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
            {/* Main player */}
            <a
              href="https://www.youtube.com/@DigiftedStudio"
              target="_blank" rel="noopener noreferrer"
              className="group relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-800 border border-white/10"
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0_2px,transparent_2px_16px)]" />
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-red-500 text-white text-xs font-mono font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> FEATURED
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-red-500/30">
                  <Play size={28} className="text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <div className="font-display font-bold text-lg">Inside Digifted Hub — Studio Tour</div>
                <div className="text-white/60 text-sm mt-1">Latest upload</div>
              </div>
            </a>

            {/* Playlist */}
            <div className="flex flex-col gap-3">
              {[
                ["Behind the Scenes at Digifted Hub", "Studio tour"],
                ["Event Coverage Highlights", "Live & Events"],
                ["Podcast Set Walkthrough", "Studios"],
              ].map(([title, tag], i) => (
                <a
                  key={title}
                  href="https://www.youtube.com/@DigiftedStudio"
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition"
                >
                  <div className="relative w-20 h-14 rounded-lg bg-navy shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_10px)]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition">
                      <Play size={14} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{title}</div>
                    <div className="text-white/50 text-xs font-mono uppercase tracking-wide mt-1">{tag}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PORTFOLIO — bento grid ---------- */}
      <section className="py-24 md:py-32">
        <div className="Resizer mx-auto px-6 md:px-8">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4">Portfolio</div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-navy">Recent work</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[520px] md:h-[440px]">
            <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden group">
              <img src={IMAGES.bento1} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-700/50 to-transparent" />
            </div>
            <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden group">
              <img src={IMAGES.bento2} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden group">
              <img src={IMAGES.bento3} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden group">
              <img src={IMAGES.bento4} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-700/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHY US — alternating offset rows ---------- */}
      <section className="py-24 bg-paper-dim">
        <div className="Resizer mx-auto px-6 md:px-8">
          <div className="max-w-xl mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4">Why Digifted</div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-navy">Built for creators who don&apos;t cut corners.</h2>
          </div>
          <div className="space-y-5">
            {[
              ["01", "Top-Tier Production Quality", "Professional 4K cameras, sound systems, and industry-standard equipment."],
              ["02", "Creative Excellence", "A team that polishes every project to a cinematic finish."],
              ["03", "End-to-End Solutions", "From recording to delivery, everything handled under one roof."],
              ["04", "Global Reach", "Content and campaigns built to travel beyond Lagos."],
            ].map(([num, title, desc], i) => (
              <div
                key={num}
                className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-10 bg-white rounded-2xl p-7 md:p-8 ${i % 2 === 1 ? "md:ml-12" : ""}`}
              >
                <span className="font-display font-black text-4xl text-red-500/30 shrink-0">{num}</span>
                <div>
                  <h4 className="font-display font-extrabold text-navy text-xl mb-1">{title}</h4>
                  <p className="text-navy-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS — horizontal scroll ---------- */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="Resizer mx-auto px-6 md:px-8 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4">Testimonials</div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-navy">What our clients say</h2>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 md:px-8 pb-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`shrink-0 w-[85vw] sm:w-[420px] snap-center rounded-2xl p-8 md:p-9 ${i === 0 ? "bg-gradient-to-br from-navy to-navy-700 text-white" : "bg-white border border-black/10 text-navy"
                }`}
            >
              <div className={`font-display text-5xl font-black leading-none mb-4 ${i === 0 ? "text-red-500" : "text-red-500/40"}`}>&ldquo;</div>
              <p className={`text-lg leading-relaxed mb-6 ${i === 0 ? "text-white" : "text-navy-400"}`}>{t.text}</p>
              <div className={`font-semibold text-sm ${i === 0 ? "text-white/70" : "text-navy-300"}`}>{t.name} — {t.role}</div>
            </div>
          ))}
        </div>
      </section>


      {/* ---------- CTA ---------- */}
      <section className="relative bg-red-500 text-white text-center py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1.5px,transparent_1.5px)] bg-[size:28px_28px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-sm" />
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-navy/10 blur-sm" />

        <div className="relative max-w-2xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Let&apos;s Get Started
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-5 leading-loose">
            Ready to bring your vision to life?
          </h2>
          <p className="text-white/85 mb-10 text-lg">
            Book a session, get a quote, or just say hello — we&apos;ll take it from there.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-now" className="btn bg-white text-red-500 hover:shadow-xl hover:-translate-y-0.5 transition">
              Book Now
            </Link>
            <Link href="/contact" className="btn-outline-light hover:-translate-y-0.5 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}