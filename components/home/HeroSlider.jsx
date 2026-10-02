"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";


const SLIDES = [
    {
        eyebrow: "STUDIOS • PHOTO • VIDEO • PODCAST",
        title: ["Creative production,", "engineered right."],
        desc: "4K-ready studio spaces for podcasters, photographers and musicians — built for serious output.",
        image: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760531013/DigiftedHub/Rectangle_26_1_medy49.jpg",
        primaryHref: "/studios",
        primaryLabel: "Explore Studios",
    },
    {
        eyebrow: "LIVE • EVENTS • BROADCAST",
        title: ["Your event,", "covered end to end."],
        desc: "Multi-camera livestreaming and full event coverage, on-site and online, for moments that can't be reshot.",
        image: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760530781/DigiftedHub/Rectangle_28_gucl5p.jpg",
        primaryHref: "/live-events",
        primaryLabel: "See Live & Events",
    },
    {
        eyebrow: "CORPORATE • BRAND • STRATEGY",
        title: ["Media that moves", "your business forward."],
        desc: "Executive spaces, brand videos and documentary ads for businesses that want to look as good as they are.",
        image: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760530681/DigiftedHub/Rectangle_27_z7ylgv.jpg",
        primaryHref: "/business-solutions",
        primaryLabel: "Business Solutions",
    },
    {
        eyebrow: "DIGITAL • CREATIVE • POST-PRODUCTION",
        title: ["From raw footage", "to finished story."],
        desc: "Social strategy, paid ads, editing and mastering that turn good content into content people remember.",
        image: "https://res.cloudinary.com/ddj0k8gdw/image/upload/v1760373483/DigiftedHub/Rectangle_14_1_y7vwep.jpg",
        primaryHref: "/services",
        primaryLabel: "Explore Services",
    },
];

const STATS = [
    ["STU", "Studios"],
    ["LIV", "Live & Events"],
    ["COR", "Corporate"],
    ["DIG", "Digital & Creative"],
];

export default function HeroSlider() {
    const [index, setIndex] = useState(0);

    const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
    const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

    useEffect(() => {
        const t = setInterval(next, 6000);
        return () => clearInterval(t);
    }, [next]);

    const slide = SLIDES[index];

    return (
        <div className="relative">
            {/* ---------- SLIDER ---------- */}
            <section className="relative h-[560px] sm:h-[620px] md:h-[680px] overflow-hidden">
                {SLIDES.map((s, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    >
                        <img src={s.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-800/96 via-navy-700/80 to-navy-700/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-800/75 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                ))}

                <div className="relative h-full Resizer mx-auto px-6 md:px-8 flex items-center">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-px bg-red-500" />
                            <span className="font-mono text-xs tracking-widest uppercase text-white/80">{slide.eyebrow}</span>
                        </div>

                        <h1 className="font-display font-black text-white leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
                            {slide.title[0]}
                            <br />
                            {slide.title[1]}
                        </h1>

                        <p className="mt-6 text-white/75 text-lg max-w-md leading-relaxed">{slide.desc}</p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link href={slide.primaryHref} className="btn-red">{slide.primaryLabel}</Link>
                            <Link href="/book-now" className="btn-outline-light">Discuss Your Project</Link>
                        </div>
                    </div>
                </div>

                {/* Arrows */}
                <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={next}
                    aria-label="Next slide"
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2.5">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-red-500" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
                        />
                    ))}
                </div>
            </section>

            {/* ---------- FLOATING STAT BAR ---------- */}
            <div className="relative z-10 -mt-14 md:-mt-16">
                <div className="Resizer mx-auto px-6 md:px-8">
                    <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/10">
                        {STATS.map(([code, label]) => (
                            <div key={code} className="px-6 py-7 text-center">
                                <div className="font-display font-black text-2xl md:text-3xl text-navy">{code}</div>
                                <div className="font-mono text-[11px] tracking-widest uppercase text-navy-400 mt-1.5">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}