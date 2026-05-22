"use client";

import { MapPin } from "lucide-react";

export function InteractiveMap() {
  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              PAN India Network
            </div>
            <h2 className="text-4xl font-headline font-bold text-white leading-tight">
              A Presence That <br />
              <span className="text-white/40 text-3xl font-medium">Spans the Subcontinent.</span>
            </h2>
            <p className="text-white/60 leading-relaxed max-w-lg">
              Our network covers every major commercial hub in India. From the financial heart of Mumbai to the silicon valley of Bangalore, we've got you covered with verified, high-compliance addresses.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/10 group cursor-pointer hover:border-primary transition-all">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">North India Hubs</div>
                  <p className="text-xs text-white/40">Delhi, Gurgaon, Noida, Chandigarh</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/10 group cursor-pointer hover:border-primary transition-all">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">West India Hubs</div>
                  <p className="text-xs text-white/40">Mumbai, Pune, Ahmedabad, Goa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative min-h-[500px] w-full flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[500px]">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                <svg viewBox="0 0 100 100" className="w-full h-full text-white/10 fill-current">
                   <path d="M50 5 L60 20 L85 20 L90 45 L75 60 L80 90 L50 80 L20 90 L25 60 L10 45 L15 20 L40 20 Z" />
                </svg>
              </div>
              
              <div className="absolute top-[20%] left-[45%] group cursor-pointer">
                <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-primary rounded-full relative shadow-lg" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all glass px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap border border-white/10 text-white">
                  New Delhi (Elite)
                </div>
              </div>

              <div className="absolute top-[60%] left-[25%] group cursor-pointer">
                <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-primary rounded-full relative shadow-lg" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all glass px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap border border-white/10 text-white">
                  Mumbai (Premium)
                </div>
              </div>

              <div className="absolute top-[75%] left-[55%] group cursor-pointer">
                <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-primary rounded-full relative shadow-lg" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all glass px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap border border-white/10 text-white">
                  Bangalore (Tech Hub)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
