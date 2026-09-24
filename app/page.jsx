import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

const departments = [
  { tag: "STU", title: "Studios", href: "/studios", desc: "Podcast, photo & video spaces with 4K recording, built for creators." },
  { tag: "LIV", title: "Live & Events", href: "/live-events", desc: "Multi-camera livestreaming and full event coverage, on-site and online." },
  { tag: "COR", title: "Business Solutions", href: "/business-solutions", desc: "Executive spaces, brand videos and documentary ads for growing businesses." },
  { tag: "DIG", title: "Digital Marketing", href: "/services", desc: "Social strategy, paid ads and analytics that grow your digital footprint." },
  { tag: "CRE", title: "Creative Services", href: "/services", desc: "Editing, retouching and mastering that turns good content into great." },
];

const testimonials = [
  { name: "Adeyemi Johnson", text: "Digifted Hub exceeded my expectations. The studio setup is top-notch, and the team is highly professional." },
  { name: "Blessing Okafor", text: "Clean environment, quality equipment, and excellent customer service. Digifted Hub truly understands creatives." },
  { name: "Samuel Adebayo", text: "From recording to final delivery, everything was seamless. The sound quality was amazing." },
  { name: "Khadijat Bello", text: "One of the best creative studios in Lagos. Affordable, well-equipped, and very welcoming." },
];

const portfolioImages = [
  "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760531013/DigiftedHub/Rectangle_26_1_medy49.jpg",
  "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760530781/DigiftedHub/Rectangle_28_gucl5p.jpg",
  "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760530681/DigiftedHub/Rectangle_27_z7ylgv.jpg",
  "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760373483/DigiftedHub/Rectangle_14_1_y7vwep.jpg",
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,22,42,0.06),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-navy mb-6">
              <span className="rec-dot" />Lagos Creative Production House
            </div>
            <h1 className="font-display font-black text-navy text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
              Your vision,<br /><span className="text-red-500">amplified.</span>
            </h1>
            <p className="mt-6 text-lg text-navy-400 max-w-md">
              Studios, live events, corporate media and digital strategy — one creative ecosystem, five departments, no vision too big to capture.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/services" className="btn-red">Explore Services</Link>
              <Link href="/book-now" className="btn-outline">Get a Quote</Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-navy to-navy-700 shadow-2xl">
            <div className="absolute top-4 left-4 w-8 h-8 border-t-[3px] border-l-[3px] border-red-500" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-[3px] border-r-[3px] border-red-500" />
            <div className="absolute top-4 left-16 flex items-center gap-1.5 text-white text-xs font-mono"><span className="rec-dot" />REC</div>
            <div className="absolute inset-0 flex items-center justify-center p-10 text-center text-white/50 text-sm bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_14px)]">
              <div>
                <span className="block font-display font-black text-base text-white/85 mb-2 tracking-wide">STUDIO FEED — 04</span>
                Hero photo or reel goes here<br />(cinematic studio / live-event montage)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim border-y border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5">
          {departments.map((d, i) => (
            <Link key={d.tag} href={d.href} className={`group p-8 border-black/10 hover:bg-white transition ${i < departments.length - 1 ? "md:border-r" : ""} border-b md:border-b-0`}>
              <span className="font-mono text-xs text-red-500 border-b-2 border-red-500 pb-1 inline-block mb-4">{d.tag}</span>
              <h3 className="font-display font-extrabold text-lg text-navy mb-2">{d.title}</h3>
              <p className="text-sm text-navy-400">{d.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-red-500 transition">Learn more <ArrowRight size={14} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4"><span className="rec-dot" />On Air</div>
            <h2 className="font-display font-black text-3xl md:text-4xl">Watch us in action</h2>
            <p className="text-white/60 mt-3">Behind-the-scenes footage, client shoots and event highlights — straight from our channel.</p>
          </div>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-7">
            <a href="https://www.youtube.com/@DigiftedStudio" target="_blank" rel="noopener noreferrer" className="relative aspect-video rounded-lg bg-navy overflow-hidden flex items-center justify-center group">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center group-hover:scale-110 transition">
                <Play size={22} className="text-white fill-white ml-0.5" />
              </div>
            </a>
            <div>
              <div className="space-y-3">
                {["Behind the Scenes at Digifted Hub", "Event Coverage Highlights", "Podcast Set Walkthrough"].map((t) => (
                  <div key={t} className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
                    <div className="w-16 h-10 rounded bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_10px)] shrink-0" />
                    <span className="text-sm font-semibold">{t}</span>
                  </div>
                ))}
              </div>
              <a href="https://www.youtube.com/@DigiftedStudio" target="_blank" rel="noopener noreferrer" className="btn-red mt-5">Subscribe on YouTube</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4"><span className="rec-dot" />Our Core Values</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-navy">Built for creators who don&apos;t cut corners</h2>
            <p className="text-navy-400 mt-3">We merge creativity with technology to help individuals and brands communicate their stories powerfully.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["Top-Tier Production Quality", "Professional 4K cameras, sound systems, and industry-standard equipment."],
              ["Creative Excellence", "A team that polishes every project to a cinematic finish."],
              ["End-to-End Solutions", "From recording to delivery, everything handled under one roof."],
              ["Global Reach", "Content and campaigns built to travel beyond Lagos."],
            ].map(([title, desc]) => (
              <div key={title} className="border-t-2 border-navy pt-5">
                <h4 className="font-display font-extrabold text-navy text-lg mb-2">{title}</h4>
                <p className="text-navy-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4"><span className="rec-dot" />Portfolio</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-navy">Recent work</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {portfolioImages.map((src) => <div key={src} className="aspect-square rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />)}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-xl mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-red-500 mb-4"><span className="rec-dot" />Testimonials</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-navy">What our clients say</h2>
          </div>
          <div className="bg-navy rounded-lg p-10 md:p-14 text-white mb-8">
            <div className="font-display text-7xl font-black text-red-500 leading-none mb-2">&ldquo;</div>
            <p className="text-xl md:text-2xl font-medium max-w-2xl">{testimonials[0].text}</p>
            <div className="mt-6 text-white/60"><b className="text-white">{testimonials[0].name}</b> — Digifted Hub Client</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(1).map((t) => (
              <div key={t.name} className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-card transition">
                <p className="text-navy-400 text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="font-semibold text-navy text-sm">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-500 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Ready to bring your vision to life?</h2>
          <p className="text-white/85 mb-8">Book a session, get a quote, or just say hello — we&apos;ll take it from there.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-now" className="btn bg-white text-red-500 hover:shadow-lg">Book Now</Link>
            <Link href="/contact" className="btn-outline-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
