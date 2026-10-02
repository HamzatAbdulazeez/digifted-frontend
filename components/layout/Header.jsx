"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Facebook, Instagram, Youtube, User, LogOut } from "lucide-react";
import api from "../../lib/apiClient";

const SERVICES_MENU = [
  { label: "All Services", href: "/services", desc: "The full department overview" },
  { label: "Studios", href: "/studios", desc: "Podcast, photo & video spaces" },
  { label: "Live & Events", href: "/live-events", desc: "Streaming & event coverage" },
  { label: "Business Solutions", href: "/business-solutions", desc: "Corporate media & branding" },
];

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", dropdown: SERVICES_MENU },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href) => pathname === href;

  useEffect(() => {
    api.get("/auth/me").then(({ data }) => setUser(data.user)).catch(() => { });
  }, [pathname]);

  const dashboardHref = user?.role === "admin" ? "/admin/dashboard" : user?.role === "staff" ? "/staff/dashboard" : null;

  async function handleLogout() {
    await api.post("/auth/logout");
    setUser(null);
    setAccountOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <div className="hidden md:block bg-navy-700 text-white/70 text-sm py-2">
        <div className="Resizer mx-auto px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="flex items-center"><span className="rec-dot mr-2" />LAGOS, NIGERIA</span>
            <span>51 Babaponmile St, Onipetesi Estate, Mangoro, Ikeja</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+2349052464819" className="hover:text-white transition">+234 905 246 4819</a>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/digiftedhub/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Facebook size={15} /></a>
              <a href="https://www.instagram.com/digiftedhub/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Instagram size={15} /></a>
              <a href="https://www.youtube.com/@DigiftedStudio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Youtube size={15} /></a>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-black/10">
        <nav className="Resizer mx-auto px-6 md:px-8 h-20 flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <img src="https://res.cloudinary.com/dz29guo7f/image/upload/v1790857330/logo-removebg-preview_n9hipi.png" alt="Digifted Hub" className="h-8 md:h-9 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) =>
              item.dropdown ? (
                <div key={item.href} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <button className={`flex items-center gap-1 px-4 py-2 rounded-md text-[15px]  transition ${isActive(item.href) || servicesOpen ? "text-red-500" : "text-navy hover:text-red-500"}`}>
                    {item.label}
                    <ChevronDown size={15} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`absolute left-0 top-full pt-2 w-72 transition-all ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
                    <div className="bg-white border border-black/10 rounded-lg shadow-card overflow-hidden">
                      {item.dropdown.map((d) => (
                        <Link key={d.href} href={d.href} className="flex flex-col gap-0.5 px-5 py-3 hover:bg-paper transition border-b border-black/5 last:border-0">
                          <span className="text-[14.5px]  text-navy">{d.label}</span>
                          <span className="text-[12.5px] text-navy-400">{d.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={`px-4 py-2 rounded-md text-[15px]  transition ${isActive(item.href) ? "text-red-500" : "text-navy hover:text-red-500"}`}>
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {user && (
              <div className="relative hidden md:block" onMouseEnter={() => setAccountOpen(true)} onMouseLeave={() => setAccountOpen(false)}>
                <button className="flex items-center gap-1.5 text-sm  text-navy hover:text-red-500 transition px-3 py-2">
                  <User size={15} />
                  {user.name?.split(" ")[0] || "Account"}
                  <ChevronDown size={13} className={`transition-transform ${accountOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute right-0 top-full pt-2 w-56 transition-all ${accountOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
                  <div className="bg-white border border-black/10 rounded-lg shadow-card overflow-hidden py-1">
                    {dashboardHref && (
                      <Link href={dashboardHref} className="block px-4 py-2.5 text-sm font-medium text-navy hover:bg-paper transition">Dashboard</Link>
                    )}
                    <Link href="/buy-media" className="block px-4 py-2.5 text-sm font-medium text-navy hover:bg-paper transition">My Albums</Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-paper transition text-left">
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Link href="/book-now" className="hidden md:inline-flex btn-navy">Book Now</Link>
            <Link href="/buy-media" className="hidden md:inline-flex btn-red">Buy Media</Link>
            <button className="lg:hidden p-2 rounded-md hover:bg-black/5" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden border-t border-black/10 bg-white px-6 py-6 space-y-1">
            {NAV.map((item) => (
              <div key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className={`block py-2.5 text-[15px]  ${isActive(item.href) ? "text-red-500" : "text-navy"}`}>
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 border-l-2 border-paper-dim ml-1 mb-2 space-y-1">
                    {item.dropdown.map((d) => (
                      <Link key={d.href} href={d.href} onClick={() => setOpen(false)} className="block py-1.5 text-[14px] text-navy-400">{d.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {user && (
              <>
                {dashboardHref && <Link href={dashboardHref} onClick={() => setOpen(false)} className="block py-2.5 text-[15px]  text-navy">Dashboard</Link>}
                <button onClick={handleLogout} className="block py-2.5 text-[15px]  text-red-500 text-left w-full">Log Out</button>
              </>
            )}
            <div className="flex gap-3 pt-4">
              <Link href="/book-now" onClick={() => setOpen(false)} className="btn-navy flex-1 justify-center">Book Now</Link>
              <Link href="/buy-media" onClick={() => setOpen(false)} className="btn-red flex-1 justify-center">Buy Media</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}