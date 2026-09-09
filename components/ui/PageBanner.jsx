import Link from "next/link";

export default function PageBanner({ crumb, title, desc }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-700 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-sm text-white/60 mb-4">
          <Link href="/" className="hover:text-white transition">Home</Link> / {crumb}
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl">{title}</h1>
        {desc && <p className="text-white/70 max-w-xl mt-4 text-lg">{desc}</p>}
      </div>
    </section>
  );
}
