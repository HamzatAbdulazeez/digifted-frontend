import PageBanner from "../../components/ui/PageBanner";
import SectionHead from "../../components/ui/SectionHead";
import Link from "next/link";
import { Compass, Clapperboard, TrendingUp, Lightbulb, Building2, FileText } from "lucide-react";

export const metadata = { title: "Business Solutions — Digifted Hub" };

const services = [
  [Compass, "Brand Strategy & Development", "Comprehensive brand positioning, identity design, and messaging strategies that differentiate your business in the marketplace."],
  [Clapperboard, "Corporate Video Production", "Professional video content for internal communications, training, testimonials, and corporate storytelling that engages your audience."],
  [TrendingUp, "Digital Marketing Campaigns", "Data-driven marketing strategies across social media, content marketing, and digital advertising to grow your business."],
  [Lightbulb, "Creative Consulting", "Expert guidance on creative direction, campaign concepts, and innovative solutions to achieve your business objectives."],
  [Building2, "Corporate Events & Webinars", "Full-service production for corporate events, product launches, town halls, and virtual conferences."],
  [FileText, "Content Marketing Solutions", "Strategic content creation including blogs, videos, infographics, and social media content that drives engagement and conversions."],
];
const industries = ["Technology & Startups", "Finance & Banking", "Healthcare & Wellness", "Education & Training", "Retail & E-commerce", "Real Estate & Property"];
const process = [["01", "Discovery", "Understanding your business goals and challenges."], ["02", "Strategy", "Developing customized creative solutions."], ["03", "Execution", "Bringing concepts to life with excellence."], ["04", "Optimization", "Measuring results and refining approach."]];

export default function BusinessSolutionsPage() {
  return (
    <>
      <PageBanner crumb="Business Solutions" title="Digifted Corporate Solutions" desc="Your partner in professional communication — where creativity meets corporate professionalism." />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Our Business Solutions" title="Media that moves your business forward" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(([Icon, title, desc]) => (
              <div key={title} className="bg-white border border-black/10 rounded-lg p-8 hover:shadow-card hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center mb-5"><Icon size={20} /></div>
                <h3 className="font-display font-extrabold text-lg text-navy mb-2">{title}</h3>
                <p className="text-navy-400 text-[15px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-paper-dim">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Industries We Serve" title="Built for businesses like yours" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((name) => <div key={name} className="bg-white border border-black/10 rounded-lg p-6"><h4 className="font-display font-extrabold text-navy text-[16.5px]">{name}</h4></div>)}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Our Process" title="From discovery to results" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-black/10 rounded-lg overflow-hidden">
            {process.map(([num, title, desc], i) => (
              <div key={num} className={`p-7 bg-white ${i < process.length - 1 ? "sm:border-r" : ""} border-b sm:border-b-0 border-black/10`}>
                <span className="font-display font-black text-4xl text-red-500/35">{num}</span>
                <h4 className="font-display font-extrabold text-navy mt-2.5 mb-1.5">{title}</h4>
                <p className="text-navy-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHead eyebrow="Client Success Stories" title="Results-Driven Approach" light />
          <div className="grid sm:grid-cols-3 gap-8 text-center mb-16">
            {[["250%", "Engagement Increase"], ["45+", "Events Produced"], ["180%", "ROI Growth"]].map(([num, label]) => (
              <div key={label}><h3 className="font-display font-black text-4xl md:text-5xl text-red-500">{num}</h3><p className="text-white/60 text-sm mt-1">{label}</p></div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[["Results-Driven Approach", "Every campaign is measured against real business outcomes."], ["Dedicated Account Team", "A single point of contact who knows your brand inside out."], ["Agile & Responsive", "Fast turnarounds that keep pace with your business."]].map(([title, desc]) => (
              <div key={title} className="border-t-2 border-red-500 pt-5"><h4 className="font-display font-bold mb-1.5">{title}</h4><p className="text-white/60 text-sm">{desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-red-500 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Ready to partner with us?</h2>
          <p className="text-white/85 mb-8">Let&apos;s talk about your brand&apos;s next campaign or corporate production.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-red-500 hover:shadow-lg">Contact Us</Link>
            <Link href="/pricing" className="btn-outline-light">See Pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
