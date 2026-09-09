import PageBanner from "../../components/ui/PageBanner";
import SectionHead from "../../components/ui/SectionHead";
import Link from "next/link";

export const metadata = { title: "About Us — Digifted Hub" };

const values = [
  ["Excellence", "Delivering outstanding quality in every project."],
  ["Collaboration", "Working together to achieve extraordinary results."],
  ["Innovation", "Pushing creative boundaries with cutting-edge solutions."],
  ["Integrity", "Building trust through honest and transparent practices."],
];

const timeline = [
  ["Year One", "Started our journey with a vision to transform creative production in Nigeria."],
  ["Growth", "Opened our state-of-the-art recording and production facility."],
  ["Expansion", "Launched comprehensive digital marketing and live streaming services."],
  ["Today", "Became a leading creative hub serving 100+ clients across Africa."],
];

const stats = [
  ["100+", "Projects Completed"],
  ["100+", "Happy Clients"],
  ["25+", "Creative Experts"],
  ["5+", "Years of Experience"],
];

const achievements = [
  ["Award-Winning Productions", "Recognized for excellence in multimedia content creation."],
  ["Industry Partnerships", "Trusted partner for major brands and corporations."],
  ["Community Impact", "Trained and mentored 200+ emerging creatives."],
  ["Global Reach", "Projects delivered across Africa and beyond."],
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        crumb="About Us"
        title={<>We don&apos;t just create content —<br />we craft experiences.</>}
        desc="That connect, engage, and inspire. Get to know the team and story behind Digifted Hub."
      />

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-navy to-navy-700 flex items-center justify-center text-white/50 text-sm text-center p-8">
            <div className="absolute top-4 left-4 w-7 h-7 border-t-[3px] border-l-[3px] border-red-500" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-[3px] border-r-[3px] border-red-500" />
            Mission &amp; Vision photo goes here
          </div>
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-red-500">Our Mission</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-navy mt-2 mb-4">
              Empowering stories through world-class production.
            </h3>
            <p className="text-navy-400 mb-8">
              We exist to give creators, businesses, and brands in Lagos and beyond the studios, crews, and creative direction to tell their stories at the highest level — without leaving the city.
            </p>
            <span className="font-mono text-xs tracking-widest uppercase text-red-500">Our Vision</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-navy mt-2 mb-4">
              Africa&apos;s most trusted creative ecosystem.
            </h3>
            <p className="text-navy-400">
              One roof, five departments — studios, live events, corporate media, digital marketing and post-production — so no vision is ever too big to capture.
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-24 bg-paper-dim">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Our Core Values" title="What Sets Us Apart" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(([title, desc]) => (
              <div key={title} className="border-t-2 border-navy pt-5">
                <h4 className="font-display font-extrabold text-navy text-lg mb-2">{title}</h4>
                <p className="text-navy-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Our Journey" title="How we got here" />
          <div className="relative pl-8 border-l-2 border-paper-dim max-w-2xl">
            {timeline.map(([year, text], i) => (
              <div key={year} className={`relative ${i < timeline.length - 1 ? "pb-10" : ""}`}>
                <div className="absolute -left-[38px] top-1 w-3.5 h-3.5 rounded-full bg-red-500 border-4 border-paper" />
                <span className="block font-mono text-xs text-red-500 mb-1.5">{year}</span>
                <p className="text-navy-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements + stats */}
      <section className="py-24 bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Our Achievements" title="Why Clients Choose Us" light />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
            {stats.map(([num, label]) => (
              <div key={label}>
                <h3 className="font-display font-black text-4xl md:text-5xl text-red-500">{num}</h3>
                <p className="text-white/60 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map(([title, desc]) => (
              <div key={title} className="border-t-2 border-red-500 pt-4">
                <h4 className="font-display font-bold mb-1.5">{title}</h4>
                <p className="text-white/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-500 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Want to work with our team?</h2>
          <p className="text-white/85 mb-8">Get in touch and let&apos;s talk about your next project.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-red-500 hover:shadow-lg">Contact Us</Link>
            <Link href="/services" className="btn-outline-light">View Our Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
