"use client";

import { Sparkles, Clock, CheckCircle2 } from "lucide-react";

export function ContactHero() {
  const stats = [
    { label: "Businesses Served", value: "10,000+" },
    { label: "Cities Covered", value: "50+" },
    { label: "Success Rate", value: "99.8%" },
  ];

  return (
    <section className="relative pt-32 pb-48 overflow-hidden bg-grid border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-3 h-3" /> Expert Consultation
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-white tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Talk to Our Business <br />
          <span className="text-primary">Address Experts</span>
        </h1>
        
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Get guidance on choosing the right virtual office location, documentation requirements, and GST registration support.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-emerald-500 font-medium">
            <Clock className="w-5 h-5" />
            <span>Average response time under 30 minutes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-12 border-t border-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
