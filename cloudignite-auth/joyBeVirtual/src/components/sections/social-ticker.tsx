export function SocialTicker() {
  const logos = [
    "TECHNOVA", "QUICKPAY", "LUMINA", "VORTEX", "NEXUS", "ZENITH", "AURORA", "PULSE"
  ];

  return (
    <div className="py-12 border-y border-white/[0.05] overflow-hidden whitespace-nowrap bg-black/20">
      <div className="flex items-center gap-16 animate-scroll">
        {[...logos, ...logos].map((logo, i) => (
          <span 
            key={i} 
            className="text-white/20 font-headline font-black text-3xl tracking-widest hover:text-white/40 transition-colors cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}