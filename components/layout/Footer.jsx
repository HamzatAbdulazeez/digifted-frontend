import Link from "next/link";
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-white/65 text-[15.5px]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/10">
          <div>
            <img src="/logo.png" alt="Digifted Hub" className="h-7 mb-4 brightness-0 invert" />
            <p className="max-w-xs leading-relaxed">
              Lagos&apos; creative production powerhouse — studios, live events, corporate media, digital strategy and post-production under one roof.
            </p>
          </div>
          <div>
            <h5 className="font-mono text-xs tracking-widest text-white/40 uppercase mb-4">Services</h5>
            <div className="flex flex-col gap-2.5">
              <Link href="/studios" className="hover:text-white transition">Studios</Link>
              <Link href="/live-events" className="hover:text-white transition">Live &amp; Events</Link>
              <Link href="/business-solutions" className="hover:text-white transition">Business Solutions</Link>
              <Link href="/services" className="hover:text-white transition">Digital Marketing</Link>
              <Link href="/services" className="hover:text-white transition">Creative Services</Link>
            </div>
          </div>
          <div>
            <h5 className="font-mono text-xs tracking-widest text-white/40 uppercase mb-4">Company</h5>
            <div className="flex flex-col gap-2.5">
              <Link href="/about" className="hover:text-white transition">About Us</Link>
              <Link href="/pricing" className="hover:text-white transition">Rental Pricing</Link>
              <Link href="/buy-media" className="hover:text-white transition">Buy Media</Link>
              <Link href="/book-now" className="hover:text-white transition">Book Now</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
              <Link href="/staff/login" className="hover:text-white transition text-white/40 text-sm">Staff Login</Link>
            </div>
          </div>
          <div>
            <h5 className="font-mono text-xs tracking-widest text-white/40 uppercase mb-4">Contact</h5>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+2349052464819" className="hover:text-white transition">+234 905 246 4819</a>
              <a href="mailto:info@digiftedhub.com" className="hover:text-white transition">info@digiftedhub.com</a>
              <span>51, Babaponmile street, Onipetes estate, Mangoro Ikeja, Lagos State.</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <span>&copy; {new Date().getFullYear()} Digifted Creations Hub Ltd. All rights reserved.</span>
          <div className="flex gap-4">
            {[
              [Instagram, "https://www.instagram.com/digiftedhub/"],
              [Youtube, "https://www.youtube.com/@DigiftedStudio"],
              [Twitter, "https://x.com/DigiftedHub"],
              [Facebook, "https://www.facebook.com/digiftedhub/"],
            ].map(([Icon, href], i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
