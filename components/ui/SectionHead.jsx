export default function SectionHead({ eyebrow, title, desc, center, light }) {
  return (
    <div className={`max-w-xl mb-12 ${center ? "mx-auto text-center" : ""}`}>
      <div className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-4 text-red-500 ${center ? "justify-center" : ""}`}>
        <span className="rec-dot" />{eyebrow}
      </div>
      <h2 className={`font-display font-black text-3xl md:text-4xl ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {desc && <p className={`mt-3 ${light ? "text-white/60" : "text-navy-400"}`}>{desc}</p>}
    </div>
  );
}
